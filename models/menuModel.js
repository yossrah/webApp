const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const Menu = mongoose.model('Menu', new Schema({
  titre: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  list_image: {
    type: String,
    trim: true,
    required: false,
  },
  sous_menu:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'sousmenu'
  }
  },
  {
  timestamps: true
}));
module.exports = mongoose.model('Menu');