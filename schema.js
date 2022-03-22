const { Schema } = require('mongoose')
const mongoose = require('mongoose')


exports.userSchema = new mongoose.Schema({
   

    "firstName": String,
    "lastName": String,
    "dateCreated": new Date,
    
})
