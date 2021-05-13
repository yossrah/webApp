const roleController=require('../controllers/roleController')
const express=require('express')
const route=express.Router()
route.post('/addRole',roleController.addRole)
route.get('/listeRole',roleController.getAll)
module.exports=route