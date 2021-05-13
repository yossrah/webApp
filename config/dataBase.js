const mongoose=require('mongoose')
const mongoDB = 'mongodb://localhost/restoService'; //restoServ de bd')
mongoose.connect('mongodb://localhost:27017/restoService', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connexion etablie")
    }
});
mongoose.Promise = global.Promise;
module.exports = mongoose;