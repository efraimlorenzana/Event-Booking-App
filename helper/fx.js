const { Event } = require('../models/event');
const { User } = require('../models/user');
const { Auth } = require('../models/auth');

const findEvents = async userID => {
    const getEvents = await Event.find({creator: {$in: userID}});

    const eventsArr = await getEvents.map(event => {
        return {
            ...event._doc,
            creator: findUser.bind(this, event.creator)
        }
    });

    return eventsArr;
}

const findUser = async userID => {
    const getUser = await User.findById(userID);

    return {
        ...getUser._doc,
        createdEvents: findEvents.bind(this, getUser.id),
        account: findAccount.bind(this,getUser.id)
    };
}

const findAccount = async userID => {
    const fetchAccount = await Auth.findOne({user: userID});

    return {
        ...fetchAccount._doc,
        user: findUser.bind(this, userID)
    }
}

module.exports = { findEvents, findUser, findAccount };