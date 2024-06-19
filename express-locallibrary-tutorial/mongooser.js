const mongoose = require("mongoose");
const fs = require('fs').promises; // Use fs.promises for async file operations

async function getDbKey() {
    try {
        const data = await fs.readFile('../../mongoKey.txt', 'utf8');
        console.log("Read key:", data);
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
        console.log('DB Key:', mongoDB);

        await mongoose.connect(mongoDB);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectToDb;
