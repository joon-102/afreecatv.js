const { Client } = require('soop.js');

(async () => {
    const client = new Client({ browser: { headless: true } });

    // 브라우저 실행
    await client.bootstrapping();

    // 1 . BJ 정보 가져오기 (BJ가 존재하지 않을시 null 반환)
    const channel = await client.search.channel("gosegu2");
    console.log(channel);

    // 2 . BJ 라이브 정보 가져오기 ( 방송중이 아닐시 null 반환)
    const live = await client.live.info("gosegu2");
    console.log(live);

    // 2 . 프로세스 종료
    await client.close();
})();