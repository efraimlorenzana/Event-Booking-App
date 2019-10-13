const Format = (strDate) => {
    return new Date(strDate).toLocaleDateString()
};

module.exports = { Format };