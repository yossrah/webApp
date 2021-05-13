const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const Schema=mongoose.Schema
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}
var passw = function(password) {
    var pw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;
    return pw.test(password)
}
const userSchema=new Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validateEmail],
        unique: true //pour entrer l'email 1 fois


    },
    password: {
        type: String,
        required: true,
        validate: [passw],}
})
userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
});

module.exports=mongoose.model('user',userSchema)