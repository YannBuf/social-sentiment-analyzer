import asyncio
from crawl4ai import AsyncWebCrawler, BrowserConfig, CrawlerRunConfig, CacheMode
import json

async def main():
    with open("x_cookies.json", "r") as f:
        x_cookies = json.load(f)

    browser_conf = BrowserConfig(
        browser_type="chromium",
        headless=False,
        use_persistent_context=True,
        cookies=x_cookies,
        user_agent_mode="random",
        light_mode=True,
    )

    crawler = AsyncWebCrawler(config=browser_conf)
    await crawler.start()  # 手动启动浏览器

    run_conf = CrawlerRunConfig(
        cache_mode=CacheMode.BYPASS,
        magic=True,
    )

    result = await crawler.arun(
        url="https://x.com/home",
        config=run_conf
    )
    print(result.markdown)

    with open("content.md", "w", encoding="utf-8") as f:
        f.write(result.markdown)

    print("页面已加载，浏览器保持打开，按 Ctrl+C 退出程序或等待输入关闭。")
    try:
        # 异步等待，保持浏览器打开
        await asyncio.Event().wait()
    except KeyboardInterrupt:
        print("收到退出信号，关闭浏览器...")

    await crawler.close()  # 手动关闭浏览器

if __name__ == "__main__":
    asyncio.run(main())
