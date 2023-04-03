const mongoose =  require("mongoose");


const userSchema = {
    email: String,
    full_name: String,
    password: String
};
    
const User = mongoose.model("User", userSchema);

module.exports = User;
