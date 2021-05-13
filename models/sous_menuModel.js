const mongoose=require('mongoose')
const Schema=mongoose.Schema
const sousmenuSchema=new Schema({
    titre:{
        type:String,
        required:true
    },
   plat:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'plat'
   }
})
module.exports=mongoose.model('sousmenu',sousmenuSchema)