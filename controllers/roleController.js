const roleModel=require('../models/roleModel')
module.exports={
    addRole : function(req,res){
        new_role={nom:req.body.nom}
        roleModel.create(new_role,function(err,role){
            if(err){
                res.json({message:'error'+err , status:500,data:null})
            }
            else {res.json({message:'role created',status:200,data:role})}

        })
    },
    getAll:function(req,res){
        roleModel.find({}).exec(function(err,roles){
            if (err){
                res.json({message:'error'+ err , status:500, data:null})
            }
            else {res.json({message:'all roles' , status:200 ,data:roles})}

        })
    }
    
}