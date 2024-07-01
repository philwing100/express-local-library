const mongoose = require("mongoose");
const fs = require('fs').promises;

async function getDbKey() {
    try {
        const data = await fs.readFile('../../mongoKey.txt', 'utf8');
        return data.trim(); // Trim to remove any extra whitespace
    } catch (err) {
        console.error('Error reading key:', err);
        throw err; // Propagate the error back to the caller
    }
}

async function connectToDb() {
    mongoose.set("strictQuery", false);

    try {
        const mongoDB = await getDbKey();
        await mongoose.connect(mongoDB);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = {
    connectToDb
};
