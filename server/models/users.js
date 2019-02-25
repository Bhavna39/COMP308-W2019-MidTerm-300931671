/**********************************/
/* Users - Books Java Script File */
/*      Bhavna Pulliahgari        */
/*          300931671             */
/*       Favourite Books          */
/**********************************/

// require modules - User Model

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'Username is required'
    },
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'Email ID is required'
    },
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'Display Name is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "user"
}
);

let options = ({
    missingPasswordError: "Invalid Password, Please enter a valid password"
});

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', userSchema);