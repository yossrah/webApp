const menuModel=require('../models/menuModel')
module.exports={
    addMenu:function(req,res){
        new_menu={
            titre:req.body.titre,
            description:req.body.description,
            list_image:req.body.list_image,
        }
        menuModel.create(new_menu,function(err,menu){
            if (err){res.json({message:'error'+err , status:500,data:null})}
            else {res.json({message:'menu created succesfully',status:200,data:menu})}
        })
    },
    getAll:function(req,res){
        menuModel.find({}).exec(function(err,menulivraison){
            if (err){res.json({message:'error'+err , status:500,data:null})}
            else {res.json({message:'menu livraison',status:200,data:menulivraison})}
        })
    },
    getById:function(req,res){
        menuModel.findById({_id:req.params.id}.exec(function(err,menu){
            if (err){
                res.json({message:'error' + err ,status:500,data:null})
            } 
            else {
                res.json({message:'menu is found',status:200, data: menu})
            } 
         }) 
         )

    },
    update:function(req,res){
        menuModel.findByIdAndUpdate({_id:req.params.id},{$set:{
            titre:req.body.titre,
            description:req.body.description,
            list_image:req.body.list_image,
        }},{ runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
        function(err,menu){
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'menu updated:', statut: 200, data: menu })
            }
        })
    },
    delete : function(req,res){
        menuModel.findByIdAndDelete({_id:req.params.id},function(err){
            if (err){
                res.json({message:'error' + err , status:500 , data:null})
            }
            else {
                res.json({message:'menu is deleted',status:200})
            }
         } 
         )
    } 
}