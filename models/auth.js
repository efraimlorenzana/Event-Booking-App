const MonggoDB = require('mongoose');
const Name = "Auth";

const Auth = MonggoDB.model(Name, MonggoDB.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user: {
        type: MonggoDB.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true }));

const WebToken = MonggoDB.model('WebToken', MonggoDB.Schema({
    token: {
        type: String,
        required: true
    },
    expire: {
        type: Number,
        required: true
    },
    user: {
        type: MonggoDB.Schema.Types.ObjectId,
        ref: 'User'
    }
}));

const typeAuth = `
    type ${Name} {
        _id: ID!
        email: String!
        user: User!
        password: String!
        createdAt: String!
        updatedAt: String!
    }

    type WebToken {
        token: String!
        expire: Int!
        user: User!
    }
`;

const get = {
    login: `login(email: String!, password: String!) : WebToken!`
}

const _query = { get, typeAuth };

module.exports = { Auth, WebToken, _query, _mutation };