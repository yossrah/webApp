const contactController=require('../controllers/contactController')
const express = require('express');
const route = express.Router();

route.post('/save', contactController.save)

route.get('/all', contactController.getEmails)

module.exports=route