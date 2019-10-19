const { Auth, WebToken } = require('../../models/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('./security/keys/private.key');

module.exports = {
    login: async ({ email, password }) => {
        try {
            const user = await Auth.findOne({email});

            if(!user) {
                throw new Error("Email not found");
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if(!isPasswordMatch) {
                throw new Error("Password not match");
            }

            const token = jwt.sign({ userId: user.user }, privateKey, { expiresIn: '1h' });
            
            const wt = new WebToken({
                token: token,
                expire: 1
            });

            return { ...wt._doc };

        } catch (error) {
            throw error;
        }
    }
}