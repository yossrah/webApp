const adminModel=require('../models/adminModel')
const jwt=require('jsonwebtoken')
const randtoken=require('rand-token')
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt')
var refreshTokens={}
const nexmo=require('nexmo')
// const nexmo=new Nexmo({
//     apiKey:"e8d5844b",
//     apiSecret:"5YO4SPmWdSXlAH3U"
// })
module.exports={
    addAdmin:function(req,res){
        new_admin={
            nom:req.body.nom,
            prenom :req.body.prenom,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password
        }
        adminModel.create(new_admin,function(err,admin){
            if (err){
                res.json({message:'error'+ err , status:500 , data:null})
            }
            else {
                res.json({message:'admin is created',status:200 ,data:admin})
            }
        })
    },
   authentification: function(req, res, next) {
        adminModel.findOne({ email: req.body.email }, function(err, admininfo) {
            if (err) {
                next(err)
            } else {
                if (admininfo != null) {
                    if (bcrypt.compareSync(req.body.password, admininfo.password)) {
                        var refreshToken = randtoken.uid(256)//****/
                        refreshTokens[refreshToken] = admininfo._id
                        console.log('reeeffff', refreshTokens[refreshToken]);
                        console.log('reeeffffaaa', refreshToken in refreshTokens);
                        const token = jwt.sign({ id: admininfo._id, },req.app.get('secretkey'), { expiresIn: '2min' });
                        res.json({
                            status: "success",
                            message: "admin found",
                            data: {
                                admin:admininfo,
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
    sendmail: function(req, res) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "yossrahas@gmail.com",
                pass: 'ingenieur!yes'
            }
        });
        var data = {
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        };
        transporter.sendMail(data, function(error, info) {
            if (error) {
                console.log("error", error)
                return res.json({ err: "error" })
            } else {
                return res.json({ message: "email has been sended" });
            }
        });
        
    },
    pushrole: function(req, res) {
        adminModel.findByIdAndUpdate({ _id: req.params.id }, { $push: { role: req.body.role } },
                function(err, role) {
                    if (err) {
                        res.json({ message: 'error' + err, statut: 500, data: null })
                    } else {
                        res.json({ message: 'role pushed', statut: 200, data:role  })
                    }
    
                })
        },
        pullRole: function(req, res) {
            adminModel.findByIdAndUpdate({ _id: req.params.id }, { $pull: { role: req.body.role } },
                function(err, role) {
                    if (err) {
                        res.json({ message: 'error' + err, statut: 500, data: null })
                    } else {
                        res.json({ message: 'role deleted', statut: 200, data: role })
                    }
    
                })
        },
//     sendsms:function(req,res){
//         const from = req.body.from
// const to = req.body.to
// const text = req.body.text
// nexmo.message.sendSms(from, to, text, (err, responseData) => {
//    if (err) {
//        console.log(err);
//    } else {
//        if(responseData.messages[0]['status'] === "0") {
//            console.log("Message sent successfully.");
//        } else {
//            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
//        }
//    }
// }
// )
// }
}




