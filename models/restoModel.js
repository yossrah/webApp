const mongoose=require('mongoose')
const Schema=mongoose.Schema
const restoSchema=new Schema({
    city:{
        type: String,
        trim: true,
        required: true
    
      },
    
    nom:{
        type:String,
        required:true,
        trim:true
    },
    localisation:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
        trim:true
    },
    openStatus:{
        type: Boolean,
        trim: true,
    
      },
      openingTime:{
        type: String,
    //    default:Date.now(),
        trim: true,
        required: true
    
      },
      closingTime:{
        type: String,
        //default:Date.now(),
        trim: true,
        required: true
      },
      etat:{
        type:Boolean,
         default: true
      },
      imageList:{
        type: String,
        trim: true,
      },
    
      nombre_table:{
        type:Number,
        trim:true,
        required:true
      },
      categorie:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categorie'
      }]
})
module.exports=mongoose.model('resto',restoSchema)