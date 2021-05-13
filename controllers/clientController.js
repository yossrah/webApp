const { text } = require('body-parser')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const randtoken=require('rand-token')
var refreshTokens = {};
const clientModel=require('../models/clientModel')
module.exports={
    addClient:function(req,res){
        new_client={
            nom:req.body.nom,
            prenom :req.body.prenom,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password
        }
        clientModel.create(new_client,function(err,client){
            if (err){
                res.json({message:'error'+ err , status:500 , data:null})
            }
            else {
                res.json({message:'client is created',status:200 ,data:client})
            }
        })
    },
    getAll: function(req,res){
        clientModel.find({}).exec(function(err,clients){
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'all clients :', statut: 200, data: clients })
            }
        })
    },
    getById:function(req,res){
        clientModel.findById({_id:req.params.id}.exec(function(err,client){
         if (err){
             res.json({message:'error' + err ,status:500,data:null})
         } 
         else {
             res.json({message:'client is found',status:200, data:client})
         }  
        }))
    },
    update: function(req,res){
        clientModel.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                nom:req.body.nom,
                prenom:req.body.prenom,
                phone:req.body.phone,
                email:req.body.email,
                password:req.body.password
            }
        }
        ,{ runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
        function(err, client) {
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'client updated:', statut: 200, data: client })
            }

        })
    },
    delete:function(req,res){
        clientModel.findByIdAndDelete({_id:req.params.id},function(err){
            if (err){
                res.json({message:'error' + err , status:500 , data:null})
            }
            else {
                res.json({message:'client is deleted',status:200})
            }
        })
    },
    authentification: function(req, res, next) {
        clientModel.findOne({ email: req.body.email }, function(err, clientinfo) {
            if (err) {
                next(err)
            } else {
                if (clientinfo != null) {
                    if (bcrypt.compareSync(req.body.password, clientinfo.password)) {
                        var refreshToken = randtoken.uid(256)//****/
                        refreshTokens[refreshToken] = clientinfo._id
                        console.log('reeeffff', refreshTokens[refreshToken]);
                        console.log('reeeffffaaa', refreshToken in refreshTokens);
                        const token = jwt.sign({ id: clientinfo._id, },req.app.get('secretkey'), { expiresIn: '1min' });
                        res.json({
                            status: "success",
                            message: "client found",
                            data: {
                                client: clientinfo,
                                accesstoken: token,
                                refreshToken: refreshToken
                            }
                        });
                    } else {
                        res.json({ status: "error", message: "invalide password", data: null });
                    }
                } else {
                    res.json({ status: "error", message: "invalid email", data: null });
                    console.log("err", err)

                }
            }
        })
    },
    logOut: function(req, res) {
        var refreshToken = req.body.refreshToken
        console.log('refreshtoken', refreshToken)
        jwt.verify(req.headers['x-access-token'], req.app.get('secretkey')) // verify
        if (refreshToken in refreshTokens) {
            console.log('hhhhhh', refreshTokens[refreshToken]);
            delete refreshTokens[refreshToken]
        }
        res.json({ msg: 'token experied', status: 204 })
        console.log('tttt', refreshTokens[refreshToken]);
    },
    refreshToken: function(req, res) {
        var id = req.params.id
        var refreshToken = req.body.refreshToken
        if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken] == id)) {
            var token = jwt.sign({ id: id }, req.app.get('secretkey'), { expiresIn: '1h' })
            res.json({ token: token })
        } else {
            res.send(401)
        }
    },
}