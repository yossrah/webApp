const commentModel=require('../models/commentModel')

module.exports={
    addComment:function(req,res){
        new_comment={
            text:req.body.text,
            }

        commentModel.create(new_comment, function(err,comment){
            if (err){
                res.json({message:'error'+ err , status:500, data:null})
            }
            else {res.json({message:'comment is created' , status:200 ,data:comment})}    
        })
    },
    getAll: function(req,res){
        commentModel.find({}).populate('client').exec(function(err,comments){
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'all comments :', statut: 200, data: comments })
            }
        })
    },
    getById:function(req,res){
        commentModel.findById({_id:req.params.id}.exec(function(err,comment){
         if (err){
             res.json({message:'error' + err ,status:500,data:null})
         } 
         else {
             res.json({message:'livreur is found',status:200, data:comment})
         }  
        }))
    },
    update: function(req,res){
        commentModel.findByIdAndUpdate({_id:req.params.id},{
            $set:{
                text:req.body.text,
                
            }
        }
        ,{ runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
        function(err, comment) {
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'livreur updated:', statut: 200, data: comment })
            }

        })
    },
    delete:function(req,res){
        commentModel.findByIdAndDelete({_id:req.params.id},function(err){
            if (err){
                res.json({message:'error' + err , status:500 , data:null})
            }
            else {
                res.json({message:'comment is deleted',status:200})
            }
        })
    },
    pushClient: function(req, res) {
        commentModel.findByIdAndUpdate({ _id: req.params.id }, { $push: { client: req.body.client } },
            function(err, comment) {
                if (err) {
                    res.json({ message: 'error' + err, statut: 500, data: null })
                } else {
                    res.json({ message: 'client pushed', statut: 200, data: comment })
                }

            })
    },
  
}