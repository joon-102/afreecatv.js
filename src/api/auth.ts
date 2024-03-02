import { Browser, Page } from 'playwright';

export const login = async (browser: Browser, loginUrl: string, id: string, password: string): Promise<void> => {
    const page: Page = await browser.newPage();

    await page.goto(loginUrl);

    await page.waitForSelector('input#uid');
    await page.waitForSelector('input#password');

    await page.fill('input#uid', id);
    await page.fill('input#password', password);

    await page.click('body > form:nth-child(11) > div > fieldset > p.login_btn > button');

    await page.close()
};
