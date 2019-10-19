

let issuer = "EM";
let subject = "some@user.com";
let audience = "anyone";
let expiresIn = "1h"

const signing = { 
    issuer, 
    subject, 
    audience, 
    expiresIn, 
    algorithm : 'RS256'
}

const verify = { 
    issuer, 
    subject, 
    audience, 
    expiresIn, 
    algorithm : ['RS256']
}

module.exports = { signing, verify };