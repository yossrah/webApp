const restoController=require('../controllers/restoController')
const express=require('express')
const route=express.Router()
const file = require('../middelwiares/file')
route.post('/addResto',restoController.addResto)
route.get('/getAll',restoController.getAll)
route.get('/getById/:id',restoController.getById)
route.put('/update/:id',file.single('image'),restoController.update)
route.delete('/delete/:id',restoController.delete)
route.get('/getimage/:file',restoController.getImage)
route.put('/pushCategory/:id',restoController.pushCatégorie)
route.put('/pullCategory/:id',restoController.pullCategorie)
module.exports=route