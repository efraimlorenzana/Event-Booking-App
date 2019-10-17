const { Auth } = require('../../models/auth');
const bcrypt = require('bcrypt');

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

            
        } catch (error) {
            throw error;
        }
    }
}