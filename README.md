# afreecatv.js
### afreecaTV's unofficial API library 🍕

## ⚠️ 경고

이 스크립트는 **교육 목적**으로 제작되었습니다.  
**이 스크립트**를 사용함으로써 귀하는 귀하의 행동으로 인해 발생하는 모든 결과에 대해 **책임**을 지는 데 동의하게 됩니다.

# 💻 설치
### Installation  
It only works with Node.js version 18 or higher.
```
npm install afreecatv.js
```

# 📜 예시
```js
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
```