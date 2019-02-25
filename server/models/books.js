/**********************************/
/* Model - Books Java Script File */
/*      Bhavna Pulliahgari        */
/*          300931671             */
/*       Favourite Books          */
/**********************************/

let mongoose = require('mongoose');

// create a model class
let gamesSchema = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('books', gamesSchema);
