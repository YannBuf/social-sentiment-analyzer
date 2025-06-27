import asyncio
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
from crawl4ai.extraction_strategy import JsonCssExtractionStrategy
from crawl4ai.async_dispatcher import MemoryAdaptiveDispatcher
import re
async def main():
    # 浏览器配置
    browser_conf = BrowserConfig(
        browser_type="chromium",
        headless=False,
        user_agent_mode="random",
        light_mode=True, # 听说是用于提高性能
        text_mode=True
    )

    # 需要执行的js代码：
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

    # 编写链接的匹配URL
    pattern = r"https?://(?:www\.)?youtube\.com/watch\?[^ \n]+"

    # youtube搜索爬虫配置
    run_conf_search = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        magic=True, #使程序看起来更像人类
        js_code=js_commands,
    )

    # youtube each videos 爬虫配置
    run_conf_each_videos = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        magic=True,  # 使程序看起来更像人类
        js_code=js_commands,
        stream=True,  # 流式抓取
        semaphore_count=3, # max concurrent requests
        wait_for='css:ytd-comments#comments',  # 等待评论区元素加载完成
        wait_until='networkidle',
        scan_full_page=True,
    )

    async with AsyncWebCrawler(config=browser_conf) as crawler:
        result = await crawler.arun(
            url="https://www.youtube.com/results?search_query=BTC + Price",
            config=run_conf_search
        )

        # 使用reg匹配视频URL
        match_video_urls = [
            item['href']
            for item in result.links["internal"]
            if 'href' in item and re.search(pattern, item['href'])
        ]

        print(match_video_urls)

        results = await crawler.arun_many(match_video_urls[:2], config=run_conf_each_videos)

        i = 1
        async for result in results:
            if result.success and result.cleaned_html:
                print(f"Successfully crawled: {result.url}")
                print(result.html)
                with open(f"{i}.html", "w", encoding="utf-8") as f:
                    f.write(result.cleaned_html)
                i += 1
            else:
                print(f"Failed to crawl {result.url}: {result.error_message}")


if __name__ == "__main__":
    asyncio.run(main())
