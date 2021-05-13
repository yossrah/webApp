const smenuController=require('../controllers/sousmenuController')
const express=require('express')
const route=express.Router()
route.post('/addSmenu',smenuController.addSMenu)
route.get('/get',smenuController.getAll)
route.get('/get/:id',smenuController.getById)
route.put('/update/:id',smenuController.update)
route.delete('/delete/:id',smenuController.delete)
module.exports=route