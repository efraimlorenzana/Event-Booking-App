const { buildSchema } = require('graphql');

const Event = require('../../models/event');

module.exports = buildSchema(`
    ${Event._query.typeEvent}

    type rootQuery {
        ${Event._query.get.events}
    }

    type rootMutation {
        ${Event._mutation.post.newEvent}
    }

    schema {
        query : rootQuery
        mutation : rootMutation
    }
`)