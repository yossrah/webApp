const userController=require('../models/utilisateurModel')
const jwt=require('jsonwebtoken')
const randtoken=require('rand-token')
const bcrypt=require('bcrypt')
var refreshTokens={}
module.exports={
    authentification: function(req, res, next) {
        userController.findOne({ email: req.body.email }, function(err, userinfo) {
            if (err) {
                next(err)
            } else {
                if (userinfo != null) {
                    if (bcrypt.compareSync(req.body.password, userinfo.password)) {
                        var refreshToken = randtoken.uid(256)//****/
                        refreshTokens[refreshToken] = userinfo._id
                        console.log('reeeffff', refreshTokens[refreshToken]);
                        console.log('reeeffffaaa', refreshToken in refreshTokens);
                        const token = jwt.sign({ id: userinfo._id, },req.app.get('secretkey'), { expiresIn: '2min' });
                        res.json({
                            status: "success",
                            message: "admin found",
                            data: {
                                user:userinfo,
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
}