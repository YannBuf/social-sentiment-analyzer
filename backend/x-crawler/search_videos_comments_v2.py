import asyncio
import csv
import re
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode

def get_sortable_likes(likes: str) -> float:
    likes = likes.replace(",", "").strip()
    multiplier = 1
    if likes.endswith("K"):
        multiplier = 1_000
        likes = likes[:-1]
    elif likes.endswith("M"):
        multiplier = 1_000_000
        likes = likes[:-1]
    try:
        return float(likes) * multiplier
    except:
        return 0

def extract_video_id(url):
    match = re.search(r"v=([a-zA-Z0-9_-]{11})", url)
    return match.group(1) if match else None

def extract_comments_from_html(html):
    soup = BeautifulSoup(html, "html.parser")

    comment_threads = soup.select("ytd-comment-thread-renderer")
    if not comment_threads:
        print("⚠️ 没找到评论区内容标签，可能加载失败")
        return []

    comments_data = []

    for comment in comment_threads:
        try:
            text_el = comment.select_one("#content-text")
            author_el = comment.select_one("#author-text")
            likes_el = comment.select_one("#vote-count-middle")

            if not text_el or not author_el:
                continue

            text = text_el.get_text(strip=True)
            author = author_el.get_text(strip=True)
            likes = likes_el.get_text(strip=True) if likes_el else "0"

            comments_data.append({
                'text': text.replace('\n', ' ').replace('"', '""').replace("'", "''"),
                'author': author.replace('"', '""').replace("'", "''"),
                'likes': likes
            })
        except Exception as e:
            print(f"⚠️ 跳过一条评论: {e}")
            continue
    return comments_data

def save_comments_to_csv(comments, filename):
    comments.sort(key=lambda x: get_sortable_likes(x['likes']), reverse=True)
    with open(filename, "w", newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["Text", "Author", "Likes"])
        for comment in comments:
            writer.writerow([comment['text'], comment['author'], comment['likes']])
    print(f"✅ 保存评论到 CSV：{filename}")

async def fetch_video_comments(crawler, url, run_conf_each_video, idx):
    print(f"\n🌐 抓取视频 #{idx}: {url}")
    result = await crawler.arun(url, config=run_conf_each_video)
    if result.success and result.html:
        print(f"✅ 成功抓取: {url}")
        if "Comments are turned off" in result.cleaned_html:
            print(f"⚠️ 评论已关闭，跳过: {url}")
            return
        comments = extract_comments_from_html(result.html)
        if not comments:
            print(f"⚠️ 没有提取到任何评论，跳过保存: {url}")
            with open(f"debug_{idx}.html", "w", encoding="utf-8") as f:
                f.write(result.html)
            return
        print(f"✅ 提取评论数量: {len(comments)}")
        filename = f"video_{idx}_comments.csv"
        save_comments_to_csv(comments, filename)
    else:
        print(f"❌ 抓取失败: {url} -> {result.error_message}")

async def main():
    browser_conf = BrowserConfig(
        browser_type="chromium",
        headless=False,
        user_agent_mode="random",
        light_mode=True,
        text_mode=True
    )

    js_commands = [
        """
        const scrollToComments = async () => {
            window.scrollTo(0, 0);
            await new Promise(r => setTimeout(r, 1000));
            let scrollAttempts = 0;
            while (scrollAttempts < 20) {
                window.scrollBy(0, 500);
                await new Promise(r => setTimeout(r, 500));
                const comments = document.querySelector('ytd-comments#comments');
                if (comments && comments.getBoundingClientRect().top < window.innerHeight) {
                    break;
                }
                scrollAttempts++;
            }
        };
        await scrollToComments();
        """,
        """
        const scrollComments = async () => {
            const scrollable = document.querySelector('#sections');
            if (!scrollable) return;
            for (let i = 0; i < 8; i++) {
                scrollable.scrollBy(0, 3000);
                await new Promise(r => setTimeout(r, 1500));
            }
        };
        await scrollComments();
        await new Promise(r => setTimeout(r, 2000));
        """
    ]

    run_conf_search = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        magic=True,
        js_code=js_commands,
    )

    run_conf_each_video = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        magic=True,
        js_code=js_commands,
        wait_for='css:ytd-comments#comments',
        wait_until='networkidle',
        scan_full_page=True,
    )

    async with AsyncWebCrawler(config=browser_conf) as crawler:
        # 搜索页面获取视频链接
        result = await crawler.arun(
            url="https://www.youtube.com/results?search_query=city skyline",
            config=run_conf_search
        )

        video_ids_seen = set()
        video_urls = []

        for item in result.links["internal"]:
            href = item.get("href")
            if not href:
                continue
            video_id = extract_video_id(href)
            if video_id and video_id not in video_ids_seen:
                video_ids_seen.add(video_id)
                full_url = f"https://www.youtube.com/watch?v={video_id}"
                video_urls.append(full_url)

        print(f"\n✅ 唯一视频链接: {video_urls}")

        batch_size = 5
        idx = 1
        # 分批并发抓取
        for i in range(0, len(video_urls), batch_size):
            batch = video_urls[i:i + batch_size]
            tasks = [fetch_video_comments(crawler, url, run_conf_each_video, idx + j) for j, url in enumerate(batch)]
            await asyncio.gather(*tasks)
            idx += len(batch)

if __name__ == "__main__":
    asyncio.run(main())
