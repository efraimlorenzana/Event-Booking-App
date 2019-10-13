const { User } = require('../../models/user');
const Date = require('../../helper/date');
const { findEvents } = require('../../helper/fx');

module.exports = {
    users: async () => {
        try {
            const users = await User.find().populate('createdEvents');
            const userArr = await users.map(user => {
            
                return {
                    ...user._doc,
                    createdAt: Date.Format(user._doc.createdAt),
                    updatedAt: Date.Format(user._doc.updatedAt),
                    createdEvents: findEvents.bind(this, user.id)
                }
            });

            return userArr;
            
        } catch (error) {
            throw error;
        }
    },
    createUser: async (args) => {
        try {
            const model = new User({
                firstname: args.param.firstname,
                lastname: args.param.lastname
            });

            const user = await model.save();

            return {
                ...user._doc,
                createdAt: Date.Format(user._doc.createdAt),
                updatedAt: Date.Format(user._doc.updatedAt)
            }
        } catch (error) {
            throw error;
        }
    }
}