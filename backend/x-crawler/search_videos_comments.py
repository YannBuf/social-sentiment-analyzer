import asyncio
import csv
import re
from bs4 import BeautifulSoup
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
from crawl4ai.async_dispatcher import MemoryAdaptiveDispatcher

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

def extract_comments_from_html(html):
    soup = BeautifulSoup(html, "html.parser")
    comments_data = []

    comment_elements = soup.select("#contents #comment")

    for element in comment_elements:
        try:
            text_el = element.select_one("#content-text")
            author_el = element.select_one("#author-text")
            likes_el = element.select_one("#vote-count-middle")

            text = text_el.get_text(strip=True)
            author = author_el.get_text(strip=True)
            likes = likes_el.get_text(strip=True)

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

def extract_video_id(url):
    match = re.search(r"v=([a-zA-Z0-9_-]{11})", url)
    return match.group(1) if match else None

async def main():
    browser_conf = BrowserConfig(
        browser_type="chromium",
        headless=False,
        user_agent_mode="random",
        light_mode=True,
        text_mode=True
    )

    js_commands = [
        "window.scrollTo(0, document.body.scrollHeight);",
        "await new Promise(resolve => setTimeout(resolve, 2000));",
        "window.scrollTo(0, document.body.scrollHeight);",
        "await new Promise(resolve => setTimeout(resolve, 2000));",
        "window.scrollTo(0, document.body.scrollHeight);",
        "await new Promise(resolve => setTimeout(resolve, 2000));",
        # 评论区内部滚动
        """
        const scrollComments = async () => {
            const comments = document.querySelector('ytd-comments#comments');
            if (!comments) return;

            const scrollable = comments.querySelector('#sections');
            if (!scrollable) return;

            for (let i = 0; i < 5; i++) {
                scrollable.scrollBy(0, 3000);
                await new Promise(r => setTimeout(r, 1500));
            }
        };
        await scrollComments();
        """
    ]

    pattern = r"https?://(?:www\.)?youtube\.com/watch\?[^ \n]+"

    run_conf_search = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        magic=True,
        js_code=js_commands,
    )

    run_conf_each_video = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        magic=True,
        js_code=js_commands,
        stream=True,
        semaphore_count=3,
        wait_for='css:ytd-comments#comments',
        wait_until='networkidle',
        scan_full_page=True,
    )

    async with AsyncWebCrawler(config=browser_conf) as crawler:
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

        print(f"✅ 唯一视频链接: {video_urls}")

        results = await crawler.arun_many(video_urls, config=run_conf_each_video)

        i = 1
        async for result in results:
            if result.success and result.html:
                print(f"✅ 成功抓取: {result.url}")
                if "Comments are turned off" in result.cleaned_html:
                    print(f"⚠️ 评论已关闭，跳过: {result.url}")
                    continue

                comments = extract_comments_from_html(result.html)
                if not comments:
                    print(f"⚠️ 没有提取到任何评论，跳过保存: {result.url}")
                    continue
                filename = f"video_{i}_comments.csv"
                save_comments_to_csv(comments, filename)
                i += 1
            else:
                print(f"❌ 抓取失败: {result.url} -> {result.error_message}")

if __name__ == "__main__":
    asyncio.run(main())
