const { Client } = require('afreecatv.js');

(async () => {
    const client = new Client({ browser: { headless: true } })

    await client.bootstrapping()

    // 로그인 (필수아님)
    await client.auth.login('YOUR_ID', 'YOUR_PW')

    // 1 . BJ 정보 가져오기 (BJ가 존재하지 않을시 undefined 반환)
    const channel = await client.search.channel("gosegu2")
    console.log(channel)

    // 2 . BJ 라이브 정보 가져오기 ( 방송중이 아닐시 undefined 반환)
    const live = await client.live.info("gosegu2")
    console.log(live)

    // 2 . 프로세스 종료
    await client.close()
})()