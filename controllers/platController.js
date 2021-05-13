const platModel=require('../models/platModel')
module.exports={
    addPlat:function(req,res){
        new_plat={
            titre:req.body.titre,
            description:req.body.description,
            image:req.file.filename,
            prix:req.body.prix
        }
        platModel.create(new_plat,function(err,plat){
            if (err){res.json({message:'error'+err , status:500,data:null})}
            else {res.json({message:'plat created succesfully',status:200,data:plat})}
        })
    },
    getImage:function(req,res){
        file=req.params.file
        console.log('file',file)
        res.sendFile(__dirname+ '/uploads/'+file)
    },
    getAll:function(req,res){
        platModel.find({}).exec(function(err,plat){
            if (err){res.json({message:'error'+err , status:500,data:null})}
            else {res.json({message:'les plats',status:200,data:plat})}
        })
    },
    getById:function(req,res){
        platModel.findById({_id:req.params.id}.exec(function(err,plat){
            if (err){
                res.json({message:'error' + err ,status:500,data:null})
            } 
            else {
                res.json({message:'menu is found',status:200, data: plat})
            } 
         }) 
         )

    },
    update:function(req,res){
        platModel.findByIdAndUpdate({_id:req.params.id},{$set:{
            titre:req.body.titre,
            description:req.body.description,
            image:req.file.filename,
            prix:req.body.prix
        }},{ runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
        function(err,plat){
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'plat updated:', statut: 200, data: plat })
            }
        })
    },
    delete : function(req,res){
        platModel.findByIdAndDelete({_id:req.params.id},function(err){
            if (err){
                res.json({message:'error' + err , status:500 , data:null})
            }
            else {
                res.json({message:'plat is deleted',status:200})
            }
         } 
         )
    },

}