// utils/applyGeneralization.js
const fs = require('fs');
const path = require('path');
const generalizeData = require('./generalize');
const checkLDiversity = require('./checkDiversity');

const applyGeneralization = (filePath, l) => {
    const rawData = fs.readFileSync(filePath);
    let data = JSON.parse(rawData);
    let level = 0;

    while (!checkLDiversity(data, 'diagnosis', ['age', 'gender', 'zipCode'], l) && level < 2) {
        level++;
        data = generalizeData(data, level);
    }

    fs.writeFileSync(path.join(process.cwd(), 'public/generalized_data.json'), JSON.stringify(data, null, 2));
};

module.exports = applyGeneralization;
