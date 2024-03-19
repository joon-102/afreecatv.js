import Base, { ClientOptions } from "./base"

import { login } from "../api/auth";
import { channel } from "../api/search";
import { info } from "../api/live";

interface StreamerInfo {
    StreamerId?: string;
    StreamerName?: string;
    StreamerThumbnail?: string;
    StreamerFavorites?: string;
    StreamerSubscribe?: string;
    StreamerExplanation?: string;
}

interface LiveInfo {
    Streamer: StreamerInfo;
    StartTime?: string;
    Resolution?: string;
    Quality?: string;
    Stations?: string;
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

class AfreecaTV extends Base {
    private LOGIN_URL = "https://login.afreecatv.com/afreeca/login.php";

    constructor(options?: ClientOptions) {
        super({ ...defaultOptions, ...options })
    }

    /**
     * @deprecated 해당 함수는 더 이상 사용되지 않습니다.
    */
    // public readonly auth = {
    //     login: async (id: string, password: string): Promise<void> => {
    //         if (!this.browser) {
    //             throw new Error("브라우저가 실행되고 있지 않습니다.");
    //         }

    //         return await login(this.browser, this.LOGIN_URL, id, password);
    //     },
    // };

    public readonly search = {
        channel: async (bj: string): Promise<StreamerInfo> => {
            if (!this.browser) {
                throw new Error("브라우저가 실행되고 있지 않습니다.");
            }

            return await channel(this.browser, bj);
        },
    };
    
    public readonly live = {
        info: async (bj: string): Promise<LiveInfo | undefined | any> => {
            if (!this.browser) {
                throw new Error("브라우저가 실행되고 있지 않습니다.");
            }

            return await info(this.browser, bj);
        },
    };
}

export default AfreecaTV