const checkLDiversity = (data, sensitiveAttr, quasiIdentifiers, l) => {
    const grouped = data.reduce((acc, record) => {
        const key = quasiIdentifiers.map(attr => record[attr]).join('|');
        if (!acc[key]) acc[key] = new Set();
        acc[key].add(record[sensitiveAttr]);
        return acc;
    }, {});

    return Object.values(grouped).every(set => set.size >= l);
};

module.exports = checkLDiversity;
