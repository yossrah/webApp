const livreurModel=require('../models/livreurModel')
const jwt =require('jsonwebtoken')
const randtoken=require('rand-token')
const bcrypt = require('bcrypt')
var refreshtokens={}
module.exports={
    addlivreur:function(req,res){
        new_livreur={
            nom:req.body.nom,
            prenom :req.body.prenom,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password
        }
        livreurModel.create(new_livreur,function(err,livreur){
            if (err){
                res.json({message:'error'+ err , status:500 , data:null})
            }
            else {
                res.json({message:'livreur is created',status:200 ,data:livreur})
            }
        })
    },
    getAll: function(req,res){
        livreurModel.find({}).exec(function(err,livreurs){
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'all livreurs :', statut: 200, data: livreurs })
            }
        })
    },
    getById:function(req,res){
        livreurModel.findById({_id:req.params.id}.exec(function(err,livreur){
         if (err){
             res.json({message:'error' + err ,status:500,data:null})
         } 
         else {
             res.json({message:'livreur is found',status:200, data:livreur})
         }  
        }))
    },
    update: function(req,res){
        livreurModel.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                nom:req.body.nom,
                prenom:req.body.prenom,
                phone:req.body.phone,
                email:req.body.email,
                password:req.body.password
            }
        }
        ,{ runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
        function(err, livreur) {
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'livreur updated:', statut: 200, data: livreur })
            }

        })
    },
    delete:function(req,res){
        livreurModel.findByIdAndDelete({_id:req.params.id},function(err){
            if (err){
                res.json({message:'error' + err , status:500 , data:null})
            }
            else {
                res.json({message:'livreur is deleted',status:200})
            }
        })
    },
    pushResto: function(req, res) {
        restauModel.findByIdAndUpdate({ _id: req.params.id }, { $push: { restaurant: req.body.restaurant } },
                function(err, restaurateur) {
                    if (err) {
                        res.json({ message: 'error' + err, statut: 500, data: null })
                    } else {
                        res.json({ message: 'resto pushed', statut: 200, data:restaurateur  })
                    }
    
                })
        },
        pullResto: function(req, res) {
            restauModel.findByIdAndUpdate({ _id: req.params.id }, { $pull: { restaurant: req.body.restaurant } },
                function(err, restaurateur) {
                    if (err) {
                        res.json({ message: 'error' + err, statut: 500, data: null })
                    } else {
                        res.json({ message: 'resto deleted', statut: 200, data: restaurateur })
                    }
    
                })
        },
    authentification: function(req, res, next) {
        livreurModel.findOne({ email: req.body.email }, function(err, livreurinfo) {
            if (err) {
                next(err)
            } else {
                if (livreurinfo != null) {
                    if (bcrypt.compareSync(req.body.password, livreurinfo.password)) {
                        var refreshToken = randtoken.uid(256)//****/
                        refreshTokens[refreshToken] = livreurinfo._id
                        console.log('reeeffff', refreshTokens[refreshToken]);
                        console.log('reeeffffaaa', refreshToken in refreshTokens);
                        const token = jwt.sign({ id:livreurinfo._id, },req.app.get('secretkey'), { expiresIn: '1h' });
                        res.json({
                            status: "success",
                            message: "livreur found",
                            data: {
                                livreur:livreurinfo,
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
    logOut: function(req, res) {//ki nokhrej w mazel l token loul not expired
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
    pushResto: function(req, res) {
        livreurModel.findByIdAndUpdate({ _id: req.params.id }, { $push: {restaurant : req.body.restaurant } },
            function(err, livreur) {
                if (err) {
                    res.json({ message: 'error' + err, statut: 500, data: null })
                } else {
                    res.json({ message: 'catégorie pushed', statut: 200, data: livreur })
                }

            })
    },
    pullResto: function(req, res) {
        livreurModel.findByIdAndUpdate({ _id: req.params.id }, { $pull: { restaurant: req.body.restaurant } },
            function(err, livreur) {
                if (err) {
                    res.json({ message: 'error' + err, statut: 500, data: null })
                } else {
                    res.json({ message: 'resto deleted', statut: 200, data: livreur })
                }

            })
    },  

}