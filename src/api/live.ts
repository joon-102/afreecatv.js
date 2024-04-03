import { Browser, Page } from 'playwright';
import { channel, StreamerInfo } from "../api/search";

interface LiveInfo {
    Streamer: StreamerInfo | undefined;
    StartTime?: string;
    Resolution?: string;
    Quality?: string;
    Stations?: string;
    Title?: string;
    Thumbnail?: string;
}

export const info = async (browser: Browser, bj: string): Promise<LiveInfo | undefined> => {
    const page: Page = await browser.newPage();
    await page.goto(`https://play.afreecatv.com/${bj}`);
    await page.waitForLoadState('networkidle');

    const callbackurl: string = page.url();
    const Directory: string = callbackurl.split(`https://play.afreecatv.com/${bj}`)[1];

    if (callbackurl.includes("not_found") || Directory.includes("null")) {
        await page.close();
        return undefined;
    }

    const liveInfo: LiveInfo = {
        Streamer: await channel(browser, bj),
        StartTime: await getTextContent(page, "#player_area > div.broadcast_information > div.text_information > ul > li:nth-child(1) > span"),
        Resolution: await getTextContent(page, "#player_area > div.broadcast_information > div.text_information > ul > li:nth-child(3) > span"),
        Quality: await getTextContent(page, "#player_area > div.broadcast_information > div.text_information > ul > li:nth-child(4) > span"),
        Stations: `https://bj.afreecatv.com/${bj}`,
        Title: await getTextContent(page, "#player_area > div.broadcast_information > div.text_information > div.broadcast_title > span"),
        Thumbnail: `https://liveimg.afreecatv.com/h/${Directory.replace("/", "")}.webp`
    }

    await page.close()

    return liveInfo
};

const getTextContent = async (page: Page, selector: string): Promise<string | undefined> => {
    try {
        const element = await page.$(selector);
        return await element?.textContent() || undefined;
    } catch (_) {
        return undefined;
    }
};