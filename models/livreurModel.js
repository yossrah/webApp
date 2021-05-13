const mongoose=require('mongoose')
const user=require('./utilisateurModel')
const livreurSchema=user.discriminator('livreur',new mongoose.Schema({
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'resto'
    },
    role:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'role'
    }
}))
module.exports=livreurSchema