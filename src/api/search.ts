import { Browser, Page } from 'playwright';

export interface StreamerInfo {
  StreamerId?: string;
  StreamerName?: string;
  StreamerThumbnail?: string;
  StreamerFavorites?: string;
  StreamerSubscribe?: string;
  StreamerExplanation?: string;
}

export const channel = async (browser: Browser, bj: string): Promise<StreamerInfo> => {
  const page: Page = await browser.newPage();
  await page.goto(`https://bj.afreecatv.com/${bj}`);

  const streamerInfo: StreamerInfo = {
    StreamerId: await getStreamerId(page),
    StreamerName: await getTextContent(page, "#bs-navi > div > article.article_bj_box > section > div > div > h2"),
    StreamerThumbnail: await getTextContent(page, "#bs-contents > article.bs-contents-header.expansion > section.bs-infomation_wrap > div > div.items_wrap > div > button.favor > span"),
    StreamerFavorites: await getStreamerThumbnail(page),
    StreamerSubscribe: await getTextContent(page, "#bs-contents > article.bs-contents-header.expansion > section.bs-infomation_wrap > div > div.items_wrap > div > button.subscribe > span"),
    StreamerExplanation: await getTextContent(page, "#bs-contents > article.bs-contents-header.expansion > section.bs-infomation_wrap > div > div.title-wrap > div.explanation > p > span")
  };

  await page.close();

  return streamerInfo;
};

const getStreamerId = async (page: Page): Promise<string | undefined> => {
  try {
    const element: string = await getTextContent(page, "#bs-navi > div > article.article_bj_box > section > div > div > span");
    if (element !== undefined) {
      return element.replace(/^./, '').replace(/.$/, '');
    } else {
      return undefined;
    }
  } catch (_) {
    return undefined;
  }
}

const getStreamerThumbnail =  async (page: Page): Promise<string | undefined> => {
  try {
    const element : any = await page.$("#bs-navi > div > article.article_bj_box > section > a > div > img");
    const thumbnail : string =  await element?.evaluate((node: { getAttribute: (arg0: string) => any; }) => node.getAttribute('src'));
    return thumbnail.replace("//profile" , "https://profile") || undefined
  } catch (_) {
    return undefined;
  }
}

const getTextContent = async (page: Page, selector: string): Promise<string | undefined | any> => {
  try {
    const element = await page.$(selector);
    return element?.textContent() || undefined;
  } catch (_) {
    return undefined;
  }
};
