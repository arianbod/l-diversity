// utils/generalize.js
const generalizeAge = (age) => {
    age = parseInt(age, 10);  // Ensure age is treated as a number
    if (age < 20) return '<20';
    if (age < 30) return '20-29';
    if (age < 40) return '30-39';
    if (age < 50) return '40-49';
    if (age < 60) return '50-59';
    return '60+';
};

const generalizeZip = (zip) => {
    if (typeof zip !== 'string') {
        zip = zip.toString();
    }
    return zip.slice(0, 3) + 'XX';
};

const generalizeData = (data, level) => {
    return data.map(record => {
        let generalizedAge = record.age;
        let generalizedZip = record.zipCode;

        if (level >= 1) {
            generalizedAge = generalizeAge(generalizedAge);
        }
        if (level >= 2) {
            generalizedZip = generalizeZip(generalizedZip);
        }

        return {
            ...record,
            age: generalizedAge,
            zipCode: generalizedZip,
        };
    });
};

module.exports = generalizeData;
