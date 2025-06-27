import asyncio
import csv
import re
from playwright.async_api import async_playwright

VIDEO_URL = "https://www.youtube.com/watch?v=1MWQIItK90Y"  # 替换为你的视频链接

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

async def scroll_to_comments(page):
    print("🔍 正在滚动到评论区域...")
    await page.wait_for_selector("#comments", timeout=10000)
    comments_section = await page.query_selector("#comments")
    await comments_section.scroll_into_view_if_needed()
    await asyncio.sleep(3)  # 等待加载

async def extract_comments(page):
    comments_data = []
    comment_elements = await page.query_selector_all('#contents #comment')

    print(f"📝 找到 {len(comment_elements)} 条原始评论，开始提取...")
    for element in comment_elements:
        try:
            text_el = await element.query_selector('#content-text')
            author_el = await element.query_selector('#author-text')
            likes_el = await element.query_selector('#vote-count-middle')

            text = (await text_el.inner_text()).strip()
            author = (await author_el.inner_text()).strip()
            likes = (await likes_el.inner_text()).strip()

            comments_data.append({
                'text': text.replace('\n', ' ').replace('"', '""').replace("'", "''"),
                'author': author.replace('"', '""').replace("'", "''"),
                'likes': likes
            })
        except Exception as e:
            print(f"⚠️ 跳过一条评论，原因: {e}")
            continue
    return comments_data

def save_to_csv(comments, video_title, video_id):
    comments.sort(key=lambda x: get_sortable_likes(x['likes']), reverse=True)
    filename = f"{video_title} [{video_id}].csv"
    with open(filename, "w", newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(["Text", "Author", "Likes"])
        for comment in comments:
            writer.writerow([comment['text'], comment['author'], comment['likes']])
    print(f"✅ 已保存评论为 CSV: {filename}")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(viewport={'width': 1280, 'height': 800})
        page = await context.new_page()

        print("🌐 打开页面中...")
        await page.goto(VIDEO_URL)
        await page.wait_for_selector("#comments", timeout=15000)

        # 关闭可能存在的 cookie 弹窗
        try:
            accept_btn = await page.query_selector('button:has-text("Accept")')
            if accept_btn:
                await accept_btn.click()
                print("✅ 已点击 cookie 同意按钮")
        except:
            pass

        # 滚动到评论模块
        await scroll_to_comments(page)

        # 提取评论
        comments = await extract_comments(page)

        # 获取标题 & ID
        video_id_match = re.findall(r'v=([a-zA-Z0-9_-]+)', VIDEO_URL)
        video_id = video_id_match[0] if video_id_match else 'unknown'

        title_raw = await page.title()
        video_title = title_raw.replace(" - YouTube", "").strip()
        video_title = re.sub(r'[^\w\s\-_\.]', '', video_title).strip().replace(" ", "_")

        # 保存为 CSV
        save_to_csv(comments, video_title, video_id)

        await browser.close()

asyncio.run(main())
