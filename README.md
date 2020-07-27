# COVID Auto_Check
코로나19 자가진단을 이상없음으로 처리해주는 라이브러리입니다.

## 사용법

```
const SelfTest = require('covid_selfcheck');

SelfTest('학교이름', '학생이름', '생년월일').then(result => {
    console.log(result); // 결과값
});
```
>학교 이름은 줄여서 작성할수 있습니다. 예) 태성중학교 -> 태성중

## 결과값 설명

* SUCCESS
> 처리 성공

* WRONG_USER_INFO
> 잘못된 본인확인 정보입니다. 참여주소 또는 본인확인 정보를 확인바랍니다.

* ADIT_CRTFC_NO
> 동일한 이름을 가진 학생이 있어, 웹 페이지에서 진행해 주시길 바랍니다.

* QSTN_USR_ERROR
> 잘못된 본인확인 정보(학교,성명,생년월일)를 입력하였습니다.

* SCHOR_RFLT_YMD_ERROR
> 학생 건강상태 자가진단 참여가능기간을 확인바랍니다.

* SCHUL_NOT_FOUND
> 검색된 학교가 없거나, 같은 이름인 학교가 있는경우 발생합니다. 에) 태성 -> 태성중학교, 태성고등학교