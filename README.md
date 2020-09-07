# COVID Auto_Check
코로나19 자가진단을 이상없음으로 처리해주는 라이브러리입니다.


개인 학습용으로 만들어졌습니다.

## 사용법

```
const SelfTest = require('covid_selfcheck');

SelfTest('학생이름', '생년월일', '소속 시', '학교이름', '학교 유형').then(result => {
    console.log(result); // 결과값
});
```

>학교 이름은 줄여서 작성할수 있습니다. 예) XX중학교 -> XX중

>시 이름을 줄여서 작성할수 있습니다. 에) 제주특별자치시 -> 제주


## 결과값 설명

* { registerDtm: 'Sep 7, 2020 5:40:11 PM', inveYmd: '20200907' }
> 처리 성공

모든 오류는 err 객체에 담겨 돌아옵니다.

* { err: REGION_NOT_FOUND }
> 입력된 소속 시 이름이 없습니다.

* { err: SCHOOL_LEVEL_NOT_FOUND }
> 입력된 학급 이름이 없습니다.

* { err: SCHOOL_NOT_FOUND }
> 입력된 정보로 학교를 찾을수 없습니다.

* { err: 503_SERVER_ERROR }
> API 서버가 응답하지 않습니다.

이 아래의 오류들은 처리되지 못한 오류입니다.
* { err: UNKNOWN_ERROR }

* { err: message }

## 경고!

해당 라이브러리를 사용하여 생기는 문제는 사용자에게 있음을 알립니다.

사용 전 신중하게 생각을 해주세요