class dataset {

    schoolid(name) {
        return new Promise((resolve, reject) => {

            const list = [
                ['서울', '서울특별시', '서울시', '서울교육청', '서울시교육청', 'sen', "B"],
                ['부산', '부산광역시', '부산시', '부산교육청', '부산광역시교육청', 'pen', "C"],
                ['대구', '대구광역시', '대구시', '대구교육청', '대구광역시교육청', 'dge', "D"],
                ['인천', '인천광역시', '인천시', '인천교육청', '인천광역시교육청', 'ice', "E"],
                ['광주', '광주광역시', '광주시', '광주교육청', '광주광역시교육청', 'gen', "F"],
                ['대전', '대전광역시', '대전시', '대전교육청', '대전광역시교육청', 'dje', "G"],
                ['울산', '울산광역시', '울산시', '울산교육청', '울산광역시교육청', 'use', "H"],
                ['세종', '세종특별시', '세종시', '세종교육청', '세종특별자치시', '세종특별자치시교육청', 'sje', "I"],
                [],
                ['경기', '경기도', '경기교육청', '경기도교육청', 'goe', "J"],
                ['강원', '강원도', '강원교육청', '강원도교육청', 'kwe', "k"],
                ['충북', '충청북도', '충북교육청', '충청북도교육청', 'cbe', "M"],
                ['충남', '충청남도', '충남교육청', '충청남도교육청', 'cne', "N"],
                ['전북', '전라북도', '전북교육청', '전라북도교육청', 'jbe', "P"],
                ['전남', '전라남도', '전남교육청', '전라남도교육청', 'jne', "Q"],
                ['경북', '경상북도', '경북교육청', '경상북도교육청', 'gbe', "R"],
                ['경남', '경상남도', '경남교육청', '경상남도교육청', 'gne', "S"],
                ['제주', '제주특별자치도', '제주특별자치시', '제주도', '제주교육청', '제주도교육청', '제주특별자치시교육청', 'jje', "T"]
            ];

            if (name.match(/[a-z]/g)) name = name.substring(0, 1).toUpperCase();
        
            let found = false;
            list.forEach((value, index) => {
                index += 1;
                
                if (value.indexOf(name) != -1)
                    return resolve({name: value[1], id: (index >= 10) ? `${index}` : `0${index}`, urlcode: value[value.length-2]});
            });
            
            if (!found && name.match(/[A-Z]/g)) return resolve({err: "SCHOOL_CODE_NOT_FOUND"});
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