// src\api\search.ts
import { Browser, Page } from 'playwright';

export interface StreamerInfo {
  StreamerId?: string | undefined,
  StreamerName?: string | undefined,
  StreamerThumbnail?: string | undefined,
  StreamerFavorites?: string | undefined,
  StreamerSubscribe?: string | undefined,
  StreamerExplanation?: string | undefined,
}

// channel
export const channel = async (browser: Browser, bj: string): Promise<StreamerInfo> => {
  const page: Page = await browser.newPage();
  await page.goto(`https://bj.afreecatv.com/${bj}`);

  const streamerInfo: StreamerInfo = {
    StreamerId: await getStreamerId(page),
    StreamerName: await getStreamerName(page),
    StreamerThumbnail: await getStreamerFavorites(page),
    StreamerFavorites: await getStreamerThumbnail(page),
    StreamerSubscribe: await getStreamerSubscribe(page),
    StreamerExplanation: await getStreamerExplanation(page)
  };

  await page.close();

  return streamerInfo;
};

const getStreamerId = async (page: Page): Promise<string | undefined> => {
  try {
    const element: string = await getTextContent(page, "#bs-navi > div > article.article_bj_box > section > div > div > span");
    if (element !== undefined) {
      return element.replace(/^./, '').replace(/.$/, '');
    }
    return undefined;
  } catch (_) {
    return undefined;
  }
}

const getStreamerName = async (page: Page): Promise<string | undefined> => {
  return getTextContent(page, "#bs-navi > div > article.article_bj_box > section > div > div > h2");
};

const getStreamerThumbnail =  async (page: Page): Promise<string | undefined> => {
  try {
    const element : any = await page.$("#bs-navi > div > article.article_bj_box > section > a > div > img");
    const thumbnail : string =  await element?.evaluate((node: { getAttribute: (arg0: string) => any; }) => node.getAttribute('src'));
    return thumbnail.replace("//profile" , "https://profile") || undefined
  } catch (_) {
    return undefined;
  }
}

const getStreamerFavorites = async (page: Page): Promise<string | undefined> => {
  return getTextContent(page, "#bs-contents > article.bs-contents-header.expansion > section.bs-infomation_wrap > div > div.items_wrap > div > button.favor > span");
};

const getStreamerSubscribe = async (page: Page): Promise<string | undefined> => {
  return getTextContent(page, "#bs-contents > article.bs-contents-header.expansion > section.bs-infomation_wrap > div > div.items_wrap > div > button.subscribe > span");
};

const getStreamerExplanation = async (page: Page): Promise<string | undefined> => {
  return getTextContent(page, "#bs-contents > article.bs-contents-header.expansion > section.bs-infomation_wrap > div > div.title-wrap > div.explanation > p > span");
};

const getTextContent = async (page: Page, selector: string): Promise<string | undefined | any> => {
  try {
    const element = await page.$(selector);
    return element?.textContent() || undefined;
  } catch (_) {
    return undefined;
  }
};
