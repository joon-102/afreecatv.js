import { Browser, Page } from 'playwright';

export interface StreamerInfo {
  streamerId: string | null;
  streamerName: string | null;
  streamerThumbnail: string | null;
  streamerFavorites: string | null;
  streamerSubscribe: string | null;
  streamerExplanation: string | null;
}

export const channel = async (browser: Browser, bj: string): Promise<StreamerInfo> => {
  const page: Page = await browser.newPage();
  await page.goto(`https://ch.sooplive.co.kr/${bj}`);

  const [streamerId, streamerName, streamerThumbnail, streamerFavorites, streamerSubscribe, streamerExplanation] = await Promise.all([
    getStreamerId(page),
    getTextContent(page, "#bs-navi > div > article.article_bj_box > section > div > div > h2"),
    getStreamerThumbnail(page),
    getTextContent(page, "#bs-contents > article.bs-contents-header.expansion > section.bs-infomation_wrap > div > div.items_wrap > div > button.favor > span"),
    getTextContent(page, "#bs-contents > article.bs-contents-header.expansion > section.bs-infomation_wrap > div > div.items_wrap > div > button.subscribe > span"),
    getTextContent(page, "#bs-contents > article.bs-contents-header.expansion > section.bs-infomation_wrap > div > div.title-wrap > div.explanation > p > span")
  ]);

  await page.close();
  
  return {
    streamerId,
    streamerName,
    streamerThumbnail,
    streamerFavorites,
    streamerSubscribe,
    streamerExplanation,
  };
};

const getTextContent = async (page: Page, selector: string): Promise<string | null> => {
  try {
    const element = await page.$(selector);
    return element ? await element.textContent() : null;
  } catch {
    return null;
  }
};

const getStreamerId = async (page: Page): Promise<string | null> => {
  const element = await getTextContent(page, "#bs-navi > div > article.article_bj_box > section > div > div > span");
  return element ? element.slice(1, -1) : null;
};

const getStreamerThumbnail = async (page: Page): Promise<string | null> => {
  try {
    const element = await page.$("#bs-navi > div > article.article_bj_box > section > a > div > img");
    if (!element) return null;

    const src = await element.evaluate(node => node.getAttribute('src'));
    return src ? src.replace("//profile", "https://profile") : null;
  } catch {
    return null;
  }
};
