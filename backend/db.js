const mongoose = require('mongoose');
require('dotenv').config();

const connecToMongo = async() => {
    await mongoose.connect(process.env.mongoURI);
    console.log("Connected to mongoose")
}

module.exports = connecToMongo