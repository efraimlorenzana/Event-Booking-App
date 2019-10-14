const { Event } = require('../../models/event');
const { User } = require('../../models/user');
const Date = require('../../helper/date');
const { findUser } = require('../../helper/fx');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find().populate('creator');
            const eventArr = await events.map(event => {
               
                return { 
                    ...event._doc,
                    date: Date.Format(event._doc.date),
                    createdAt: Date.Format(event._doc.createdAt),
                    updatedAt: Date.Format(event._doc.updatedAt),
                    creator: findUser.bind(this, event._doc.creator.id)
                 };
            });
            
            return eventArr;

        } catch (error) {
            throw error;
        }

    },
    newEvent: async (args) => {
        const creator = "5da3e26e2372962964f79234";

        try {
            const model = new Event({
                title: args.param.title,
                description: args.param.description,
                price: args.param.price,
                date: Date.Format(args.param.date),
                creator: creator
            });
    
            const event = await model.save();

            const userCreator = await User.findById(creator);

            if(userCreator) {
                userCreator.createdEvents.push(event);
                await userCreator.save();
            }
            
            return { 
                ...event._doc,
                date: Date.Format(event._doc.date),
                createdAt: Date.Format(event._doc.createdAt),
                updatedAt: Date.Format(event._doc.updatedAt)
             };

        } catch (error) {
            throw error;
        }
    }
}