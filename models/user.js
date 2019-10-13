const MonggoDB = require('mongoose');
const Name = "User";

const User = MonggoDB.model(Name, new MonggoDB.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: MonggoDB.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
}, { timestamps: true }));

const typeUser = `
    type ${Name} {
        _id: ID!
        firstname: String!
        lastname: String!
        createdAt: String!
        updatedAt: String!
        createdEvents: [Event!]
    }

    input input${Name} {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
    }
`;

const get = {
    users: `users: [${Name}!]`
};

const post = {
    createUser: `create${Name}(param: input${Name}) : ${Name}`
}

_query = { typeUser, get };
_mutation = { post };

module.exports = { User, _query, _mutation };