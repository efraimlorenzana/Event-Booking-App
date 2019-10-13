const EventMutation = require('./event');
const UserMutation = require('./user');

module.exports = {
    ...EventMutation,
    ...UserMutation
}