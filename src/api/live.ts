import { Browser, Page } from 'playwright';
import { channel, StreamerInfo } from "../api/search";

interface LiveInfo {
    streamerInfo: StreamerInfo | null;
    streamUrl: string;
    streamTitle: string | null;
    thumbnailUrl: string;
}

export const info = async (browser: Browser, bj: string): Promise<LiveInfo | null> => {
    const page: Page = await browser.newPage();
    try {
        const url = `https://play.sooplive.co.kr/${bj}`;
        await page.goto(url , { waitUntil: 'networkidle' })

        const currentUrl = page.url();
        const pathSuffix = currentUrl.replace(url, "");

        if (currentUrl.includes("not_found") || pathSuffix.includes("null")) {
            return null;
        }

        const directory = pathSuffix.replace("/", "");
        const [streamerInfo, streamTitle] = await Promise.all([
            channel(browser, bj),
            page.$("#infoTitle").then(el => el?.textContent() ?? null)
        ]);

        return {
            streamerInfo,
            streamUrl: `https://ch.sooplive.co.kr/${bj}`,
            streamTitle,
            thumbnailUrl: `https://liveimg.sooplive.co.kr/h/${directory}.webp`,
        };
    } catch (error) {
        console.error(`[soop.js] Error fetching live info for ${bj}:`, error);
        return null;
    }  finally {
        await page.close();
    }
};
