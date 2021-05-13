const restauModel=require('../models/restaurateurModel')
const jwt=require('jsonwebtoken')
const randtoken=require('rand-token')
const bcrypt=require('bcrypt')
var refreshTokens={}
module.exports={
    addRestaurateur:function(req,res){
        new_restaurateurt={
            nom:req.body.nom,
            prenom :req.body.prenom,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password,
            
        }
        restauModel.create(new_restaurateurt,function(err,restaurateur){
            if (err){
                res.json({message:'error'+ err , status:500 , data:null})
            }
            else {
                res.json({message:'restaurateur is created',status:200 ,data:restaurateur})
            }
        })
    },
    getAll: function(req,res){
        restauModel.find({}).exec(function(err,restaurateurs){
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'all restaurateurs :', statut: 200, data: restaurateurs })
            }
        })
    },
    getById:function(req,res){
        restauModel.findById({_id:req.params.id}.exec(function(err,restaurateur){
         if (err){
             res.json({message:'error' + err ,status:500,data:null})
         } 
         else {
             res.json({message:'restaurateur is found',status:200, data: restaurateur})
         }  
        }))
    },
    update: function(req,res){
        restauModel.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                nom:req.body.nom,
                prenom:req.body.prenom,
                phone:req.body.phone,
                email:req.body.email,
                password:req.body.password,
                
            }
        }
        ,{ runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
        function(err, restaurateur) {
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'restaurateur updated:', statut: 200, data: restaurateur })
            }

        })
    },
    delete:function(req,res){
        restauModel.findByIdAndDelete({_id:req.params.id},function(err){
            if (err){
                res.json({message:'error' + err , status:500 , data:null})
            }
            else {
                res.json({message:'restaurateur is deleted',status:200})
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
    pushrole: function(req, res) {
        restauModel.findByIdAndUpdate({ _id: req.params.id }, { $push: { role: req.body.role } },
                function(err, role) {
                    if (err) {
                        res.json({ message: 'error' + err, statut: 500, data: null })
                    } else {
                        res.json({ message: 'role pushed', statut: 200, data:role  })
                    }
    
                })
        },
        pullRole: function(req, res) {
            restauModel.findByIdAndUpdate({ _id: req.params.id }, { $pull: { role: req.body.role } },
                function(err, role) {
                    if (err) {
                        res.json({ message: 'error' + err, statut: 500, data: null })
                    } else {
                        res.json({ message: 'role deleted', statut: 200, data: role })
                    }
    
                })
        },
    authentification: function(req, res, next) {
        restauModel.findOne({ email: req.body.email }, function(err, restaurinfo) {
            if (err) {
                next(err)
            } else {
                if (restaurinfo!= null) {
                    if (bcrypt.compareSync(req.body.password, restaurinfo.password)) {
                        var refreshToken = randtoken.uid(256)//****/
                        refreshTokens[refreshToken] = restaurinfo._id
                        console.log('reeeffff', refreshTokens[refreshToken]);
                        console.log('reeeffffaaa', refreshToken in refreshTokens);
                        const token = jwt.sign({ id: restaurinfo._id, },req.app.get('secretkey'), { expiresIn: '1h' });
                        res.json({
                            status: "success",
                            message: "restaurateur found",
                            data: {
                                restaurateur: restaurinfo,
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