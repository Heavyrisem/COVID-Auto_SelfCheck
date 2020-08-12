const request = require('request');
const kostudycenter = require('kostudycenter');


async function getSculNm(school) {

    return new Promise(function(resolve, reject) {
        let info = {
            uri: `https://${school.studyCenter}/stv_cvd_co00_004.do`,
            qs: { schulNm : school.name }
        };
    
        request.post(info, (err, response, body) => {
            
            if (err) {console.log(err);resolve(0);}
            let data = JSON.parse(body).resultSVO.data;
    
            if (data.schulCode == '') {
                // console.log(`${data.schulNm}의 검색 결과가 없습니다. 정확한 이름을 입력해 주세요.`);
                resolve(0);
            } else {
                // console.log(`${data.schulNm}를 찾았습니다.`);
                school = {
                    code: data.schulCode,
                    name: data.schulNm,
                    studyCenter: school.studyCenter
                };

                resolve(school);
            }
        });
    });

}

module.exports = async function Self_test(schoolname, username, birth, studyCenter, agree) {
    return new Promise(resolve => {

        if (!agree) return resolve("AGREE_FOR_USAGE");

        let userinfo = {
            school: { name: schoolname, code: undefined, studyCenter: undefined },
            name: username,
            birth: birth
        };
        kostudycenter(studyCenter).then(result => {
            if (result == "STUDY_CENTER_NOT_FOUND") return resolve(result);


            userinfo.school.studyCenter = result.URL;

            getSculNm(userinfo.school).then((schul) => {
                if (schul == 0)
                    return resolve('SCHUL_NOT_FOUND');
        
                userinfo.school = schul;
                
        
                
                let reqData = {
                    uri: `https://${userinfo.school.studyCenter}/stv_cvd_co00_012.do`,
                    qs: {
                        qstnCrtfcNoEncpt: '',
                        rtnRsltCode: '',
                        schulCode: userinfo.school.code,
                        schulNm: userinfo.school.name,
                        pName: userinfo.name,
                        frnoRidno: userinfo.birth,
                        aditCrtfcNo: ''
                    }        
                };
                
                
                request.post(reqData, (err, response, body) => {
                    if (err)
                        return resolve(console.log(err));
                    let data = JSON.parse(body).resultSVO.data;
        
                    if (data.rtnRsltCode == "SUCCESS") {
                        let checkData = {
                            uri: `https://${userinfo.school.studyCenter}/stv_cvd_co01_000.do`,
                            qs: {
                                rtnRsltCode: data.rtnRsltCode,
                                qstnCrtfcNoEncpt: data.qstnCrtfcNoEncpt,
                                schulNm: '',
                                stdntName: '',
                                rspns01: 1,
                                rspns02: 1,
                                rspns07: 0,
                                rspns08: 0,
                                rspns09: 0
                            }
                        }
        
                        request.post(checkData, (err, response, body) => {
                            if (err)
                                return resolve(console.log(err));
                            let data = JSON.parse(body).resultSVO.data;
        
                            if (data.rtnRsltCode == "SUCCESS")
                                return resolve('SUCCESS');
                                // resolve(console.log(`${data.schulNm} ${data.stdntName} 학생의 자가진단을 완료했습니다.`));
                            else 
                                return resolve('WRONG_USER_INFO');
                                // resolve(console.log(`잘못된 본인확인 정보입니다. (${data.rtnRsltCode})\n\r참여주소 또는 본인확인 정보를 확인바랍니다.\n\r확인 후 다시 시도해 주시기 바랍니다.`));
                        })
                        
                    } else {
                        switch (data.rtnRsltCode) {
                            case "ADIT_CRTFC_NO":
                                return resolve('ADIT_CRTFC_NO'); break
                                // console.log('동일한 이름을 가진 학생이 있어, 웹 페이지에서 진행해 주시길 바랍니다.'); break;
                            case "QSTN_USR_ERROR":
                                return resolve('QSTN_USR_ERROR'); break;
                                // console.log('잘못된 본인확인 정보(학교,성명,생년월일)를 입력하였습니다.\n\r확인 후 다시 시도해 주시기 바랍니다.'); break;                        
                            case "SCHOR_RFLT_YMD_ERROR":
                                return resolve('SCHOR_RFLT_YMD_ERROR'); break;
                                // console.log('학생 건강상태 자가진단 참여가능기간을 확인바랍니다.\n\r확인 후 다시 시도해 주시기 바랍니다.'); break;                        
                            default:
                                return resolve('WRONG_USER_INFO'); break;
                                // console.log(`잘못된 본인확인 정보입니다.(${data.rtnRsltCode})\n\r확인 후 다시 시도해 주시기 바랍니다.`); break;
                        }
                    }
                });
            });
        });
    });
}