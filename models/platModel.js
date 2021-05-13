var mongoose = require('mongoose');
const Schema=mongoose.Schema
const platSchema=new Schema({

  titre:{
    type:String,
    required:true
  },
  image: {
    type: String,
    trim: true,
    required: false,
  },
  description: {
    type: String,
    trim: true,
    required: true
  },

  prix: {
    type: Number,
    trim: true,
    required: true
  },
  restaurant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'resto'
  }

});
module.exports = mongoose.model('plat',platSchema);