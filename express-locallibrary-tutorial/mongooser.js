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

async function createSchema() {
    const Schema = mongoose.Schema;

    const SomeModelSchema = new Schema({
        a_string: String,
        a_date: Date,
    });

    // Compile model from schema
    const SomeModel = mongoose.model("SomeModel", SomeModelSchema);

}

async function printAllData() {
    try {
        // Connect to MongoDB
        await connectToDb();

        // Fetch all users
        const users = await User.find();

        // Print the users
        console.log('All Users:');
        users.forEach(user => {
            console.log(user);
        });

        // Optionally return the users array or handle further logic
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        // Optionally close the connection if needed
        // await mongoose.connection.close();
    }
}
module.exports = {
    connectToDb,
    printAllData
};
