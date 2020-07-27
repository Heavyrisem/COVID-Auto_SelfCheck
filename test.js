const SelfTest = require('./main');

SelfTest('학교이름', '학생이름', '생년월일').then(result => {
    console.log(result); // 결과값
});
