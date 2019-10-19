const express = require('express');
const bodyParser = require('body-parser');
const graphql_endpoint = require('express-graphql');
const graphql_schema = require('./graphql/schema/index');
const graphiql_resolver = require('./graphql/resolver/index');
const Authorization = require('./middleware/is-auth');
const MonggoDB = require('mongoose');

const app = express();

app.use(bodyParser.json());
MonggoDB.set('useNewUrlParser', true);
MonggoDB.set('useUnifiedTopology', true);

app.use(Authorization);

app.use('/event_booking_endpoint', graphql_endpoint({
    schema: graphql_schema,
    rootValue: graphiql_resolver,
    graphiql: true
}));

MonggoDB.connect(`
mongodb+srv://${process.env.MONGGO_USERNAME}:${process.env.MONGGO_PASSWORD}@em-qqa76.azure.mongodb.net/${process.env.MONGGO_DB}?retryWrites=true&w=majority`)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`<-----( Server running on port ${process.env.PORT} )----->`);
    });
})
.catch(error => {
    throw error;
});

