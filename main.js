const request = require('request');
const dataset = require('./dataset.js');
const JSencrypt = require('node-jsencrypt');
const crypto =  new JSencrypt();

crypto.setPublicKey("MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA81dCnCKt0NVH7j5Oh2+SGgEU0aqi5u6sYXemouJWXOlZO3jqDsHYM1qfEjVvCOmeoMNFXYSXdNhflU7mjWP8jWUmkYIQ8o3FGqMzsMTNxr+bAp0cULWu9eYmycjJwWIxxB7vUwvpEUNicgW7v5nCwmF5HS33Hmn7yDzcfjfBs99K5xJEppHG0qc+q3YXxxPpwZNIRFn0Wtxt0Muh1U8avvWyw03uQ/wMBnzhwUC8T4G5NclLEWzOQExbQ4oDlZBv8BM/WxxuOyu0I8bDUDdutJOfREYRZBlazFHvRKNNQQD2qDfjRz484uFs7b5nykjaMB9k/EJAuHjJzGs9MMMWtQIDAQAB");

async function schoolInfo(name, level, region) {

    return new Promise(async (resolve, reject) => {
        if (name.length < 2) {return resolve({err: "INPUT_VALUE_LENGTH"})}
        const schoolcode = await dataset.schoolid(region);
        const schoollevel = await dataset.schoollevel(level);
        
        switch(schoolcode) {
            case "REGION_NOT_FOUND":
                return resolve({err: "REGION_NOT_FOUND"}); break;
        }
        switch(schoollevel) {
            case "SCHOOL_LEVEL_NOT_FOUND":
                return resolve({err: "SCHOOL_LEVEL_NOT_FOUND"}); break;
        }

        let info = {
            uri: `https://${schoolcode.urlcode}hcs.eduro.go.kr/school`,
            qs: {
                lctnScCode: schoolcode.id,
                schulCrseScCode: schoollevel,
                orgName : name,
                currentPageNo: '1'
            }
        };
        
        
        request.get(info, (err, response, body) => {
            
            if (err) {resolve({err: err});return;}

            let data;
            try {
                data = JSON.parse(body);
            } catch (err) {
                return resolve({err: body});
            }
            if (data.message) {return resolve({err: data.message})};

            if (data.schulList.length == 0) {
                return resolve({err: "SCHOOL_NOT_FOUND"});
            } else {
                const school = {
                    code: data.schulList[0].orgCode,
                    name: data.schulList[0].kraOrgNm,
                    engname: data.schulList[0].engOrgNm,
                    urlcode: schoolcode.urlcode
                };

                return resolve(school);
            }
        });
    });

}

async function userinfo(name, birth, region, schoolname, schoollevel) {
    return new Promise(async (resolve, reject) => {

        const schoolinfo = await schoolInfo(schoolname, schoollevel, region);
        if(schoolinfo.err) {return resolve({err: schoolinfo.err})}
        
        let info = {
            uri: `https://${schoolinfo.urlcode}hcs.eduro.go.kr/loginwithschool`,
            json: {
                birthday: crypto.encrypt(birth),
                name: crypto.encrypt(name),
                orgcode: schoolinfo.code
            }
        };

        request.post(info, (err, response, body) => {
            if (err) return resolve({err: err});
            
            if (body.isError) return resolve({"err": body.message});
            if (typeof body == "string") return resolve({err: "503_SERVER_ERROR"});
            body.urlcode = schoolinfo.urlcode;
            
            return resolve(body);
        });

    });
}

module.exports = async function autocheck(name, birth, region, schoolname, schoollevel) {
    return new Promise(async (resolve, reject) => {

        const usrInfo = await userinfo(name, birth, region, schoolname, schoollevel);
        if (usrInfo.err) {return resolve({err: usrInfo.err});}
        if (usrInfo.registerDtm) {return resolve({err: "ALREADY_DIAGNOSED"})}

        const info = {
            uri: `https://${usrInfo.urlcode}hcs.eduro.go.kr/registerServey`,
            headers: {
                Authorization: usrInfo.token
            },
            json: {
                eviceUuid: "",
                rspns00: "Y",
                rspns01: "1",
                rspns02: "1",
                rspns03: null, 
                rspns04: null,
                rspns05: null,
                rspns06: null,
                rspns07: "0",
                rspns08: "0",
                rspns09: "0",
                rspns10: null,
                rspns11: null,
                rspns12: null,
                rspns13: null,
                rspns14: null,
                rspns15: null
            }
        }

        request.post(info, (err, response, body) => {
            if (err) {return resolve({err: err})};
            
            if (body.message) return resolve({err: message});

            return resolve(body);
        });

    });
}