const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const user=require('./utilisateurModel')
const clientSchema=user.discriminator('client',new mongoose.Schema())
module.exports=clientSchema
module.exports=mongoose.model('client')