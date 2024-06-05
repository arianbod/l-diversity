// utils/data.js
const fs = require('fs');
const path = require('path');

const createDataset = () => {
    const data = require(path.join(process.cwd(), 'public/data.json'));
    fs.writeFileSync(path.join(process.cwd(), 'public/data.json'), JSON.stringify(data, null, 2));
};

createDataset();
