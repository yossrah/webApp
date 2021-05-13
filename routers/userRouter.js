const userController=require('../controllers/userController')
const express=require('express')
const route=express.Router()
route.post('/login',userController.authentification)

module.exports=route