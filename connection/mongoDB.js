const mongoose = require('mongoose');

const { MONGO_URL } = process.env;

const db = mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongo DB failed to connect: ERROR`, err);
});

mongoose.connection.on('open', (connected) => {
    console.log(`Mongo DB connection successful`, connected);
});

const session = mongoose.connection.startSession();

module.exports = {
    db,
    session
}