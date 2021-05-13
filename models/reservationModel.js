var mongoose=require('mongoose')

//Define Schema
var Schema=mongoose.Schema;
const ReservationSchema=new Schema({

  nombrePersonne :{
    type: Number,
    trim:true,
    required:true
  },
  // date_reservation :{
  //   // type: Date,
  //   // default: Date.now,
  //   type:String,
  //   trim:true,
  //   required: true

  // },
  // temps :
  //   {
  //     type:String,
  //     trim:true,
  //     required:true
  //   },
  // validation:{
  //   type:Boolean,
  //   default:false
  // },
  client:
    {type: mongoose.Schema.Types.ObjectId,
      ref: "client"},
});

//compile model from Schema
var ReservationTable=mongoose.model('reservationTable',ReservationSchema)
module.exports=ReservationTable