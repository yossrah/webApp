const restoModel=require('../models/restoModel')
const reservController=require('./reservationController')
module.exports={
    addResto: function(req,res){
        new_resto={
            city:req.body.city,
            nom:req.body.nom,
            localisation :req.body.localisation,
            image:req.file.filename,
            openStatus:req.body.openStatus,
            openingTime:req.body.openingTime,
            closingTime:req.body.closingTime,
            etat:req.body.etat
        }
        restoModel.create(new_resto, function(err,resto){
            if (err){
                res.json({message:'error'+ err , status:500, data:null})
            }
            else {res.json({message:'resto is created' , status:200 ,data:resto})}

        })
    },
    getImage:function(req,res){
        file=req.params.file
        console.log('file',file)
        res.sendFile(__dirname+ '/uploads/'+file)
    },
    getAll : function(req,res){
        restoModel.find({}).populate('categorie').exec(function (err,restos){
            if (err){
                res.json({message:'error'+ err , status:500, data:null})
            }
            else {res.json({message:'all restos' , status:200 ,data:restos})}

        })
    },
    getById: function(req, res) {
        restoModel.findById({ _id: req.params.id }).exec(function(err, resto) {
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'resto By Id :', statut: 200, data: resto })
            }
        })

    },
    update : function(req,res){
        restoModel.findByIdAndUpdate({_id:req.params.id},{$set:{
            city:req.body.city,
            nom:req.body.nom,
            adresse: req.body.adresse,
            localisation:req.body.localisation,
            image:req.file.filename,
            openStatus:req.body.openStatus,
            openingTime:req.body.openingTime,
            closingTime:req.body.closingTime,
            etat:req.body.etat
        }},{ runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
        function(err,resto){
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'resto updated:', statut: 200, data: resto })
            }
        })
    },
    delete : function(req,res){
        restoModel.findByIdAndDelete({_id:req.params.id},function(err){
            if (err){
                res.json({message:'error' + err , status:500 , data:null})
            }
            else {
                res.json({message:'restaurateur is deleted',status:200})
            }
         } 
         )
    } ,
    pushCatégorie: function(req, res) {
        restoModel.findByIdAndUpdate({ _id: req.params.id }, { $push: {categorie : req.body.categorie } },
            function(err, Categorie) {
                if (err) {
                    res.json({ message: 'error' + err, statut: 500, data: null })
                } else {
                    res.json({ message: 'catégorie pushed', statut: 200, data: categorie })
                }

            })
    },
    pullCategorie: function(req, res) {
        restoModel.findByIdAndUpdate({ _id: req.params.id }, { $pull: { categorie: req.body.categorie } },
            function(err, categorie) {
                if (err) {
                    res.json({ message: 'error' + err, statut: 500, data: null })
                } else {
                    res.json({ message: 'categorie deleted', statut: 200, data: categorie })
                }

            })
    },
    // addReservation:function(req,res){
    //     restoModel.findByIdAndUpdate({_id:req.params.id}.exec(reservController.addReservation),{ runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
    //     function(err,restaurant){
    //         if (err){
    //             res.json({message:'error'+ err , status:500, data:null})
    //         }
    //         else {res.json({message:'all restos' , status:200 ,data:restos})}

    //     })
    // }      
}