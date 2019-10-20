const { Auth, WebToken } = require('../../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { signing } = require('../../security/options');
const privateKey = fs.readFileSync('./security/keys/private.key');
const { findUser } = require('../../helper/fx');

module.exports = {
    login: async ({ email, password }) => {
        try {
            const account = await Auth.findOne({ email });

            if(!account) {
                throw new Error("Email not found");
            }

            const isPasswordMatch = await bcrypt.compare(password, account.password);

            if(!isPasswordMatch) {
                throw new Error("Password not match");
            }

            const token = jwt.sign({ userId: account.user }, privateKey, signing);
            
            const wt = new WebToken({
                token: token,
                expire: 1,
                user: account.user
            });

            return { 
                ...wt._doc,
                user: findUser.bind(this, account.user)
            };

        } catch (error) {
            throw error;
        }
    }
}