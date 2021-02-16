const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type:String,
        require:true
    },
    name:String,
    age:{
        type:Number,
        min:18,
        max:50
    },
    enrlled:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('User', userSchema);