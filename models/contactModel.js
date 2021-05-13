const { text } = require('body-parser');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const contactSchema = new Schema({
    from: {
        type: String,
        required: true},
    to: {
         type: String,
         required: true},
    subject: {
            type: String,
            required: true},
    text: {
       type: String,
       required: true
    }

})
module.exports = mongoose.model('contact', contactSchema)