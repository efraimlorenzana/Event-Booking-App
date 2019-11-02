const { User } = require('../../models/user');
const { Auth } = require('../../models/auth');
const Date = require('../../helper/date');
const { findEvents, findAccount } = require('../../helper/fx');
const bcrypt = require('bcrypt');

module.exports = {
    users: async (args, req) => {
        if(!req.isAuth) {
            throw new Error("Please login!");
        }

        try {
            const users = await User.find().populate('account');
            const userArr = await users.map(user => {
            
                return {
                    ...user._doc,
                    createdAt: Date.Format(user._doc.createdAt),
                    updatedAt: Date.Format(user._doc.updatedAt),
                    createdEvents: findEvents.bind(this, user.id),
                    account: findAccount.bind(this, user.id)
                }
            });

            return userArr;
            
        } catch (error) {
            throw error;
        }
    },
    createUser: async (args) => {
        let credential = null;

        try {
            const model = new User({
                firstname: args.param.firstname,
                lastname: args.param.lastname,
                account: credential
            });

            const account = await Auth.findOne({email: args.param.email});

            if(account)
                throw new Error("Email address already in use");

            const user = await model.save();

            const hashPassword = await bcrypt.hash(args.param.password, 12);
            
            try {
                credential = new Auth({
                    email: args.param.email,
                    password: hashPassword,
                    user: user
                });

                await credential.save();
                
                try {
                    let saveUser = await User.findById(user.id);

                    saveUser.account = credential;
                    await saveUser.save();

                } catch (error) {
                    throw error;
                }

            } catch (error) {
                throw error;
            }

            return {
                ...user._doc,
                createdAt: Date.Format(user._doc.createdAt),
                updatedAt: Date.Format(user._doc.updatedAt),
                account: findAccount.bind(this, user.id)
            }
        } catch (error) {
            throw error;
        }
    }
}