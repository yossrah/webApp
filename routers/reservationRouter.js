const reservController=require('../controllers/reservationController')
const express=require('express')
const route=express.Router()
route.post('/addReservation',reservController.addReservation)
route.get('/listreservation',reservController.getAll)
route.get('/reservation/:id',reservController.getById)
route.put('/update/:id',reservController.update)
route.delete('/delete/:id',reservController.delete)
module.exports=route