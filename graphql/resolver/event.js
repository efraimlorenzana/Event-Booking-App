const { Event } = require('../../models/event');
const { User } = require('../../models/user');
const Date = require('../../helper/date');
const { findUser } = require('../../helper/fx');

module.exports = {
    events: async (args, req) => {
        if(!req.isAuth) {
            throw new Error("Please login!");
        }

        try {
            const events = await Event.find({ creator: req.userId }).populate('creator');
            const eventArr = await events.map(event => {
               
                return { 
                    ...event._doc,
                    date: Date.Format(event._doc.date),
                    createdAt: Date.Format(event._doc.createdAt),
                    updatedAt: Date.Format(event._doc.updatedAt),
                    creator: findUser.bind(this, event.creator)
                 };
            });
            
            return eventArr;

        } catch (error) {
            throw error;
        }

    },
    newEvent: async (args, req) => {
        if(!req.isAuth) {
            throw new Error("Please login!");
        }

        try {
            const model = new Event({
                title: args.param.title,
                description: args.param.description,
                price: args.param.price,
                date: Date.Format(args.param.date),
                creator: req.userId
            });
    
            const event = await model.save();

            const userCreator = await User.findById(req.userId);

            if(userCreator) {
                userCreator.createdEvents.push(event);
                await userCreator.save();
            }
            
            return { 
                ...event._doc,
                date: Date.Format(event._doc.date),
                createdAt: Date.Format(event._doc.createdAt),
                updatedAt: Date.Format(event._doc.updatedAt),
                creator: findUser.bind(this, req.userId)
             };

        } catch (error) {
            throw error;
        }
    }
}