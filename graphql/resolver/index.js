
module.exports = {
    getPerson: () => {
        return events;
    },
    postPerson: (args) => {
        const person = {
            _id: args.data._id,
            Name : args.data.Name,
            Age : args.data.Age
        }

        events.push(person);
        return person;
    }
}