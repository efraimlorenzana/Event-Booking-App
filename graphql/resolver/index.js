const EventMutation = require('./event');
const UserMutation = require('./user');
const AuthMutation = require('./auth');

module.exports = {
    ...EventMutation,
    ...UserMutation,
    ...AuthMutation
}