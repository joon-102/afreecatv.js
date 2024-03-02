import { Browser, Page } from 'playwright';
import { channel, StreamerInfo } from "../api/search"

interface LiveInfo {
    Streamer: StreamerInfo | undefined
    StartTime?: string | undefined,
    Resolution?: string | undefined,
    Quality?: string | undefined,
    Stations?: string | undefined,
    Title?: string | undefined,
    Thumbnail? : string | undefined
}

export const info = async (browser: Browser, bj: string): Promise<LiveInfo | undefined> => {
    const page: Page = await browser.newPage();
    await page.goto(`https://play.afreecatv.com/${bj}`);
    await page.waitForLoadState('networkidle');

    const callbackurl: string = page.url();
    const Directory: string = callbackurl.split(`https://play.afreecatv.com/${bj}`)[1];

    if (callbackurl.includes("not_found") || Directory.includes("null")) {
        return undefined;
    }

    const liveInfo: LiveInfo = {
        Streamer: await channel(browser, bj),
        StartTime: await getStartTime(page),
        Resolution: await getResolution(page),
        Quality: await getQuality(page),
        Stations: await getStations(bj),
        Title: await getTitle(page),
        Thumbnail: await getThumbnail(Directory)
    }

    await page.close()

    return liveInfo
};

const getStartTime = async (page: Page): Promise<string | undefined> => {
    return getTextContent(page, "#player_area > div.broadcast_information > div.text_information > ul > li:nth-child(1) > span");
}

const getResolution = async (page: Page): Promise<string | undefined> => {
    return getTextContent(page, "#player_area > div.broadcast_information > div.text_information > ul > li:nth-child(3) > span");
}

const getQuality = async (page: Page): Promise<string | undefined> => {
    return getTextContent(page, "#player_area > div.broadcast_information > div.text_information > ul > li:nth-child(4) > span");
}

const getStations = async (bj: string): Promise<string | undefined> => {
    return `https://bj.afreecatv.com/${bj}`
}

const getTitle = async (page: Page): Promise<string | undefined> => {
    return getTextContent(page, "#player_area > div.broadcast_information > div.text_information > div.broadcast_title > span");
}

const getThumbnail = async (Directory: string): Promise<string> => {
    return `https://liveimg.afreecatv.com/h/${Directory.replace("/", "")}.webp`
}

const getTextContent = async (page: Page, selector: string): Promise<string | undefined | any> => {
    try {
        const element = await page.$(selector);
        const text = element?.textContent()
        return text || undefined;
    } catch (_) {
        return undefined;
    }
};
