const mongoose=require('mongoose')
const ReservationSchema=require('../schemas/reservation.schema')

const ReservationModel = mongoose.model('Reservations', ReservationSchema);

module.exports=ReservationModel;