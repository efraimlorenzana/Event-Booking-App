const { Event } = require('../../models/event');
const Date = require('../../helper/date');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find().populate('creator');
            const eventArr = await events.map(event => {
               
                return { 
                    ...event._doc,
                    date: Date.Format(event._doc.date),
                    createdAt: Date.Format(event._doc.createdAt),
                    updatedAt: Date.Format(event._doc.updatedAt)
                 };
            });
            
            return eventArr;

        } catch (error) {
            throw error;
        }

    },
    newEvent: async (args) => {
        try {
            const model = new Event({
                title: args.param.title,
                description: args.param.description,
                price: args.param.price,
                date: Date.Format(args.param.date),
                creator: "5da33de1cc7c44239837298a"
            });
    
            const event = await model.save();
            
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