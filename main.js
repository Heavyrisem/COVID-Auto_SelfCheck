const request = require('request');
const { serialize } = require('v8');




async function getSculNm(school_name) {

    return new Promise(function(resolve, reject) {
        let info = {
            uri: "https://eduro.goe.go.kr/stv_cvd_co00_004.do",
            qs: { schulNm : school_name }
        };
    
    
        request.post(info, (err, response, body) => {
            let data = JSON.parse(body).resultSVO.data;
    
            if (data.schulCode == '') {
                console.log(`${data.schulNm}의 검색 결과가 없습니다. 정확한 이름을 입력해 주세요.`);
                resolve(0);
            } else {
                console.log(`${data.schulNm}를 찾았습니다.`);
                resolve({ code: data.schulCode, name: data.schulNm});
            }
        });
    });

}

async function Self_test(userinfo) {
    
    getSculNm(userinfo.school.name).then((schul) => {
        if (schul == 0) 
            return;

        userinfo.school = schul;
        

        
        let reqData = {
            uri: "https://eduro.goe.go.kr/stv_cvd_co00_012.do",
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
                return console.log(err)
            let data = JSON.parse(body).resultSVO.data;

            if (data.rtnRsltCode == "SUCCESS") {
                let checkData = {
                    uri: "https://eduro.goe.go.kr/stv_cvd_co01_000.do",
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
                        return console.log(err);
                    let data = JSON.parse(body).resultSVO.data;

                    if (data.rtnRsltCode == "SUCCESS")
                        return console.log(`${data.schulNm} ${data.stdntName} 학생의 자가진단을 완료했습니다.`);
                    else 
                        return console.log(`잘못된 본인확인 정보입니다. (${data.rtnRsltCode})\n\r참여주소 또는 본인확인 정보를 확인바랍니다.\n\r확인 후 다시 시도해 주시기 바랍니다.`);
                })
                
            } else {
                switch (data.rtnRsltCode) {
                    case "ADIT_CRTFC_NO":
                        console.log('동일한 이름을 가진 학생이 있어, 웹 페이지에서 진행해 주시길 바랍니다.'); break;
                    case "QSTN_USR_ERROR":
                        console.log('잘못된 본인확인 정보(학교,성명,생년월일)를 입력하였습니다.\n\r확인 후 다시 시도해 주시기 바랍니다.'); break;
                    case "SCHOR_RFLT_YMD_ERROR":
                        console.log('학생 건강상태 자가진단 참여가능기간을 확인바랍니다.\n\r확인 후 다시 시도해 주시기 바랍니다.'); break;
                    default:
                        console.log(`잘못된 본인확인 정보입니다.(${data.rtnRsltCode})\n\r확인 후 다시 시도해 주시기 바랍니다.`); break;
                }
            }
        })

    });
}


let ex_user = {
    school: { name: "덕영", code: undefined },
    name: "표인수",
    birth: "030924"
};


Self_test(ex_user);
