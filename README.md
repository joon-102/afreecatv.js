# **afreecatv.js**

![Image](https://img.shields.io/npm/v/afreecatv.js?color=%2351F9C0&label=afreecatv.js)
![Image](https://img.shields.io/npm/dt/afreecatv.js.svg?color=%2351FC0&maxAge=3600)

#

![Image](https://nodei.co/npm/afreecatv.js.png?downloads=true&downloadRank=true&stars=true)
<br>

afreecaTV's unofficial API library 🍕

## <i class="fa-solid fa-download"></i> **Installation**

```bash
$ npm install afreecatv.js
```

## <i class="fa-solid fa-bookmark"></i> **Usage**

```js
const { Client } = require('afreecatv.js');

(async () => {
    const client = new Client({ browser: { headless: true } });

    await client.bootstrapping();

    // 1 . BJ 정보 가져오기 (BJ가 존재하지 않을시 undefined 반환)
    const channel = await client.search.channel("gosegu2");
    console.log(channel);

    // 2 . BJ 라이브 정보 가져오기 ( 방송중이 아닐시 undefined 반환)
    const live = await client.live.info("gosegu2");
    console.log(live);

    // 3 . 프로세스 종료
    await client.close();
})()
```
<br>

## <i class="fa-solid fa-download"></i> **warning⚠️**
### 이 저장소는 이 GitHub 저장소에 포함된 API 제공업체와 연관되거나 보증되지 않습니다.

1. 이 스크립트는 오로지  **교육 목적**으로 제작되었습니다.   
2. 이 스크립트를 사용함으로써 발생하는 모든 결과는 사용자의 **책임**하에 있으며, 제작자는 그 결과에 대한 **책임**을 지지 않습니다.  
3. 어떠한 경우에도 이 스크립트의 사용으로 인한 손해나 문제에 대한 **책임**은 전적으로 사용자에게 있습니다.  
4. 이 스크립트를 사용함으로써 발생하는 모든 법적, 금융적, 의료적 문제에 대한 해결은 전적으로 사용자의 **책임**하에 이루어져야 합니다.  
5. 제작자는 이 스크립트의 사용으로 인해 발생하는 어떠한 문제나 손해에 대해서도 **책임**지지 않습니다.  

**이 저장소 또는 이와 관련된 코드를 사용하면 이러한 조건에 동의하는 것입니다. 작성자는 다른 사용자가 만든 복사본, 포크 또는 재업로드에 대해 책임을 지지 않습니다.**
