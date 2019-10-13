const MonggoDB = require('mongoose');
const Name = "Event";

const Event = MonggoDB.model(Name, new MonggoDB.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    creator: {
        type: MonggoDB.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps : true }));

const typeEvent = `
    type ${Name} {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        createdAt: String
        updatedAt: String
        creator: User!
    }

    input input${Name} {
        title: String!
        description: String!
        price: Float!
        date: String!
    }
`;

const get = {
    events: `events: [${Name}]`
};

const _query = { typeEvent, get };

const post = {
    newEvent : `newEvent(param: input${Name}) : ${Name}`
}

const _mutation = { post };

module.exports = { Event, _query, _mutation };