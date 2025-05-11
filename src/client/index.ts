import Base, { ClientOptions } from "./base"

import { channel } from "../api/search";
import { info } from "../api/live";

export interface StreamerInfo {
    streamerId: string | null;
    streamerName: string | null;
    streamerThumbnail: string | null;
    streamerFavorites: string | null;
    streamerSubscribe: string | null;
    streamerExplanation: string | null;
}

interface LiveInfo {
    streamerInfo: StreamerInfo | null;
    streamUrl: string;
    streamTitle: string | null;
    thumbnailUrl: string;
}
const defaultOptions: ClientOptions = {
    browser: {},
    context: {
        locale: "ko-KR",
        extraHTTPHeaders: {
            "accept-language": "ko,en-US;q=0.9,en;q=0.8,ko-KR;q=0.7,ro;q=0.6,vi;q=0.5",
        },
    },
};

class Soop extends Base {

    constructor(options?: ClientOptions) {
        super({ ...defaultOptions, ...options })
    }

    public readonly search = {
        channel: async (bj: string): Promise<StreamerInfo | null> => {
            if (!this.browser) {
                throw new Error("브라우저가 실행되고 있지 않습니다.");
            }

            return await channel(this.browser, bj);
        },
    };
    
    public readonly live = {
        info: async (bj: string): Promise<LiveInfo | unknown> => {
            if (!this.browser) {
                throw new Error("브라우저가 실행되고 있지 않습니다.");
            }

            return await info(this.browser, bj);
        },
    };
}

export default Soop;
