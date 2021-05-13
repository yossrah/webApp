const mongoose=require('mongoose')
const Schema=mongoose.Schema
const commentSchema=new Schema({
    text:{
        type:String,
        required:true
    
    },
    client:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'client'
        
    }
    
},{timestamps: true}
)


module.exports=mongoose.model('comment',commentSchema)

