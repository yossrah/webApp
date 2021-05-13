const express=require('express')
const comController=require('../controllers/comntController')
const route=express.Router()
route.post('/addComment',comController.addComment)
route.get('/getAll',comController.getAll)
route.get('/getById/:id',comController.getById)
route.put('/addClient/:id',comController.pushClient)
module.exports=route