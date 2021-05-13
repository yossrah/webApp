const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const user=require('./utilisateurModel')
const adminSchema=user.discriminator('admin',new mongoose.Schema({
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'role'
    }
}))
    
module.exports=adminSchema