const sousmenuModel=require('../models/sous_menuModel')
module.exports={
    addSMenu:function(req,res){
        new_smenu={
            titre:req.body.titre,
        }
        sousmenuModel.create(new_menu,function(err,smenu){
            if (err){res.json({message:'error'+err , status:500,data:null})}
            else {res.json({message:'sous menu created succesfully',status:200,data:smenu})}
        })
    },
    getAll:function(req,res){
        sousmenuModel.find({}).exec(function(err,sousmenulivraison){
            if (err){res.json({message:'error'+err , status:500,data:null})}
            else {res.json({message:'sous menu livraison',status:200,data:sousmenulivraison})}
        })
    },
    getById:function(req,res){
        sousmenuModel.findById({_id:req.params.id}.exec(function(err,smenu){
            if (err){
                res.json({message:'error' + err ,status:500,data:null})
            } 
            else {
                res.json({message:'sous menu is found',status:200, data: smenu})
            } 
         }) 
         )

    },
    update:function(req,res){
        sousmenuModel.findByIdAndUpdate({_id:req.params.id},{$set:{
            titre:req.body.titre,
        }},{ runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
        function(err,menu){
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'sous menu updated:', statut: 200, data: menu })
            }
        })
    },
    delete : function(req,res){
        sousmenuModel.findByIdAndDelete({_id:req.params.id},function(err){
            if (err){
                res.json({message:'error' + err , status:500 , data:null})
            }
            else {
                res.json({message:'sous menu is deleted',status:200})
            }
         } 
         )
    } 
}