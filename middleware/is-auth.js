const jwt = require('jsonwebtoken');
const fs = require('fs');
const { verify } = require('../security/options');
const publicKey = fs.readFileSync('./security/keys/public.key');

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");

    if(!authHeader || authHeader === '') {
        req.isAuth = false;
        return next();
    }

    const getToken = authHeader.split(' ')[1];
    if(!getToken || getToken === '') {
        req.isAuth = false;
        return next();
    }
    
    let decodeToken;
    try {
        decodeToken = jwt.verify(getToken, publicKey, verify);
    } catch (error) {
        req.isAuth = false;
        return next();
    }
    
    req.isAuth = true;
    req.userId = decodeToken.userId;

    return next();
}