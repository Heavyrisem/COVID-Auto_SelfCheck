# Auto_Selftest
코로나19 자가진단을 이상없음으로 처리해주는 코드입니다.

## 사용법

```
const SelfTest = require('./main');

SelfTest('학교이름', '학생이름', '생년월일').then(result => {
    console.log(result); // 결과값
});
```
>학교 이름은 줄여서 작성할수 있습니다. 예) 태성중학교 -> 태성중
