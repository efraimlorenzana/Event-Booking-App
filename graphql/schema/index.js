const { buildSchema } = require('graphql');

const Event = require('../../models/event');
const User = require('../../models/user');
const Auth = require('../../models/auth');

module.exports = buildSchema(`
    ${Event._query.typeEvent}
    ${User._query.typeUser}
    ${Auth._query.typeAuth}

    type rootQuery {
        ${Event._query.get.events}
        ${User._query.get.users}
        ${Auth._query.get.login}
    }

    type rootMutation {
        ${Event._mutation.post.newEvent}
        ${User._mutation.post.createUser}
    }

    schema {
        query : rootQuery
        mutation : rootMutation
    }
`)