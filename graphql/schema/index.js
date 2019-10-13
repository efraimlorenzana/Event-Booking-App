const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Person {
    _id: ID!
    Name: String!
    Age: Int!
}

input inputPerson {
    Name:String!
    Age:Int!
}

type rootQuery {
    getPerson : [Person!]
}

type rootMutation {
    postPerson(data: inputPerson): Person!
}

schema {
    query : rootQuery
    mutation : rootMutation
}
`)