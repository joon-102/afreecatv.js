# **soop.js**

![Image](https://img.shields.io/npm/v/afreecatv.js?color=%2351F9C0&label=soop.js)
![Image](https://img.shields.io/npm/dt/afreecatv.js.svg?color=%2351FC0&maxAge=3600)
<br>

대한민국의 인터넷 방송 플랫폼 SOOP(숲)의 비공식 API 라이브러리 🍕

## <i class="fa-solid fa-download"></i> **설치**

```bash
$ npm install soop.js
```

## <i class="fa-solid fa-bookmark"></i> **사용법**

```js
const { Client } = require('soop.js');

(async () => {
    const client = new Client({ browser: { headless: true } });

    await client.bootstrapping();

    // 1 . BJ 정보 가져오기 (BJ가 존재하지 않을시 null 반환)
    const channel = await client.search.channel("gosegu2");
    console.log(channel);

    // 2 . BJ 라이브 정보 가져오기 ( 방송중이 아닐시 null 반환)
    const live = await client.live.info("gosegu2");
    console.log(live);

    // 3 . 프로세스 종료
    await client.close();
})()
```
<br>

## <i class="fa-solid fa-download"></i> **경고⚠️**
이 프로젝트는 **개인적** 또는 **학습 목적으로** 제공됩니다.이 코드를 사용함에 있어 발생하는 모든 문제나 손해에 대해 책임은 전적으로 사용자 본인에게 있습니다. 