const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const categorieSchema = new Schema({
    titre: {

        type: String,
        required: true,


    },
    ref: {
        type: String,
        required: true
    },
    image:{
        type:String,
        require:true
    },
});
module.exports = mongoose.model('categorie', categorieSchema)