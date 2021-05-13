const menuController=require('../controllers/menuController')
const express=require('express')
const route=express.Router()
route.post('/addMenu',menuController.addMenu)
route.get('/menulivraison',menuController.getAll)
route.get('/menu/:id',menuController.getById)
route.put('/updateMenu/:id',menuController.update)
route.delete('/deleteMenu/:id',menuController.delete)
module.exports=route