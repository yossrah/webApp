const mongoose=require('mongoose')
const user=require('./utilisateurModel')
const restaurateurSchema=user.discriminator('restaurateur',new mongoose.Schema({
   
    restaurant:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'resto'
    }],
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'role'
    }
}))
module.exports=restaurateurSchema