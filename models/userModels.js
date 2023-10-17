const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
    {
        fname:{
            type : String,
            required : [true, "please enter first name"]
        },
        lname:{
            type : String,
            required : [true, "please enter last name"]
        },
        email:{
            type: String,
            unique: true,
            required : [true, "please enter email"]
        },
        pass:{
            type : String,
            required : [true, "please enter password"]
        },
    },
    {
        timestamps : true
    }
)
const User = mongoose.model('User', userSchema);
module.exports = User;
