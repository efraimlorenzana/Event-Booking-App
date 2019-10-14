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

const typeAuth = `
    type ${Name} {
        _id: ID!
        email: String!
        user: User!
        password: String!
        createdAt: String!
        updatedAt: String!
    }
`;

const get = {
    login: `login(email: String!, password: String!) : ${Name}!`
}

const _query = { get, typeAuth };

module.exports = { Auth, _query, _mutation };