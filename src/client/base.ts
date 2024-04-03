import playwright, { Browser, BrowserContext, BrowserContextOptions, LaunchOptions, Page } from "playwright"

export interface ClientOptions {
    browser?: LaunchOptions
    context?: BrowserContextOptions
}

class Base {
    protected browser?: Browser;
    protected context?: BrowserContext;
    protected page?: Page;

    constructor(private options: ClientOptions) { }

    public async bootstrapping() {
        this.browser = await playwright.chromium.launch(this.options.browser)
        this.context = await this.browser.newContext(this.options.context)
    }

    public async close() {
        if (this.page) {
            await this.page.close()
        }
        if (this.context) {
            await this.context.close()
        }
        if (this.browser) {
            await this.browser.close()
        }
    }
}

export default Base