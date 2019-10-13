const { buildSchema } = require('graphql');

const Event = require('../../models/event');
const User = require('../../models/user');

module.exports = buildSchema(`
    ${Event._query.typeEvent}
    ${User._query.typeUser}

    type rootQuery {
        ${Event._query.get.events}
        ${User._query.get.users}
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