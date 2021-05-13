const reservationModel=require('../models/reservationModel')
module.exports={
    addReservation:function(req,res){
        new_reserv={
            nombrePersonne:req.body.nombrePersonne,
            date_reservation:req.body.date_reservation,
            // date_reservation:req.body.date_reservation,
            // temps:req.body.temps
        }
        reservationModel.create(new_reserv,function(err,reservation){
            if (err){res.json({message:'error'+err , status:500,data:null})}
            else {res.json({message:'reservation created succesfully',status:200,data:reservation})}
        })
    },
    getAll:function(req,res){
        reservationModel.find({}).exec(function(err,reservations){
            if (err){res.json({message:'error'+err , status:500,data:null})}
            else {res.json({message:'all reservations',status:200,data:reservations})}
        })
    },
    getById:function(req,res){
        reservationModel.findById({_id:req.params.id}.exec(function(err,reservation){
            if (err){
                res.json({message:'error' + err ,status:500,data:null})
            } 
            else {
                res.json({message:'reservation is found',status:200, data: reservation})
            } 
         }) 
         )

    },
    update:function(req,res){
        reservationModel.findByIdAndUpdate({_id:req.params.id},{$set:{
            nombrePersonne:req.body.nombrePersonne,
            date_reservation:req.body.date_reservation,
            temps:req.body.temps
        }},{ runValidators: true, upsert: true, setDefaultsOnInsert: true, new: true },
        function(err,reservation){
            if (err) {
                res.json({ message: 'error' + err, statut: 500, data: null })
            } else {
                res.json({ message: 'reservation updated:', statut: 200, data: reservation })
            }
        })
    },
    delete : function(req,res){
        reservationModel.findByIdAndDelete({_id:req.params.id},function(err){
            if (err){
                res.json({message:'error' + err , status:500 , data:null})
            }
            else {
                res.json({message:'reservation is deleted',status:200})
            }
         } 
         )
    },
    validateReservation:function(req,res){
        reservationModel.findByIdAndUpdate({_id:req.params.id},{$set:{validateReservation:true}})
    }

}