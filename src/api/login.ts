// src\api\auth.ts

import { Page } from 'playwright';

export const login = async (page: Page, loginUrl: string, id: string, password: string): Promise<void> => {
    await goToLoginPage(page, loginUrl);
    await fillLoginForm(page, id, password);
    await submitLoginForm(page);
};

const goToLoginPage = async (page: Page, loginUrl: string): Promise<void> => {
    await page.goto(loginUrl);
};

const fillLoginForm = async (page: Page, id: string, password: string): Promise<void> => {
    await page.fill("input#uid", id);
    await page.fill("input#password", password);
};

const submitLoginForm = async (page: Page): Promise<void> => {
    await page.click("body > form:nth-child(11) > div > fieldset > p.login_btn > button");
};
