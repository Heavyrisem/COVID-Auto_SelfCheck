class dataset {

    schoolid(inputname) {
        return new Promise((resolve, reject) => {

            const regionlist = {
                "서울특별시": {find: ['서울', '서울특별시', '서울시', '서울교육청', '서울시교육청', "B"], data: {urlcode: 'sen', id: '01'}},
                "부산광역시": {find: ['부산', '부산광역시', '부산시', '부산교육청', '부산광역시교육청', "C"], data: {urlcode: 'pen', id: '02'}},
                "대구광역시": {find: ['대구', '대구광역시', '대구시', '대구교육청', '대구광역시교육청', "D"], data: {urlcode: 'dge', id: '03'}},
                "인천광역시": {find: ['인천', '인천광역시', '인천시', '인천교육청', '인천광역시교육청', "E"], data: {urlcode: 'ice', id: '04'}},
                "광주광역시": {find: ['광주', '광주광역시', '광주시', '광주교육청', '광주광역시교육청', "F"], data: {urlcode: 'gen', id: '05'}},
                "대전광역시": {find: ['대전', '대전광역시', '대전시', '대전교육청', '대전광역시교육청', "G"], data: {urlcode: 'dje', id: '06'}},
                "울산광역시": {find: ['울산', '울산광역시', '울산시', '울산교육청', '울산광역시교육청', "H"], data: {urlcode: 'use', id: '07'}},
                "세종특별시": {find: ['세종', '세종특별시', '세종시', '세종교육청', '세종특별자치시', '세종특별자치시교육청', "I"], data: {urlcode: 'sje', id: '08'}},
                "": {find: [], data: {}},
                "경기도": {find: ['경기', '경기도', '경기교육청', '경기도교육청', "J"], data: {urlcode: 'goe', id: '09'}},
                "강원도": {find: ['강원', '강원도', '강원교육청', '강원도교육청', "k"], data: {urlcode: 'kew', id: '10'}},
                "충청북도": {find: ['충북', '충청북도', '충북교육청', '충청북도교육청', "M"], data: {urlcode: 'cbe', id: '11'}},
                "충청남도": {find: ['충남', '충청남도', '충남교육청', '충청남도교육청', "N"], data: {urlcode: 'cne', id: '12'}},
                "전라북도": {find: ['전북', '전라북도', '전북교육청', '전라북도교육청', "P"], data: {urlcode: 'jbe', id: '13'}},
                "전라남도": {find: ['전남', '전라남도', '전남교육청', '전라남도교육청', "Q"], data: {urlcode: 'jne', id: '14'}},
                "경상북도": {find: ['경북', '경상북도', '경북교육청', '경상북도교육청', "R"], data: {urlcode: 'gbe', id: '15'}},
                "경상남도": {find: ['경남', '경상남도', '경남교육청', '경상남도교육청', "S"], data: {urlcode: 'gne', id: '16'}},
                "제주특별자치도": {find: ['제주', '제주특별자치도', '제주특별자치시', '제주도', '제주교육청', '제주도교육청', '제주특별자치시교육청', "T"], data: {urlcode: 'jje', id: '17'}}
            };

            if (inputname.match(/[a-z]/g)) inputname = inputname.substring(0, 1).toUpperCase();
        
            let found = false;
            const names = Object.keys(regionlist);
            names.forEach(name => {
                if (regionlist[name].find.indexOf(inputname) != -1) return resolve({name: name, urlcode: regionlist[name].data.urlcode, id: parseInt(regionlist[name].data.id)+1});
            });
            
            if (!found && inputname.match(/[A-Z]/g)) return resolve({err: "SCHOOL_CODE_NOT_FOUND"});
            if (!found) return resolve({err: "REGION_NOT_FOUND"});
        });
    }

    schoollevel(target) {
        return new Promise((resolve, reject) => {

            const list = [
                ['유치원', '유'],
                ['초등학교', '초'],
                ['중학교', '중'],
                ['고등학교', '고'],
                ['특수학교', '특']
            ];

            let found = false;
            list.forEach((value, index) => {
                index += 1;
                if (value.indexOf(target) != -1) return resolve(index);
            });

            if (!found) return resolve({err: "SCHOOL_LEVEL_NOT_FOUND"});
            
        });
    }

}






module.exports = new dataset();
