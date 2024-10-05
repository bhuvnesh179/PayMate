const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://bhuvneshbansal179:Bansal1234@@cluster0.0f0kq.mongodb.net/paytmDB");

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User
};