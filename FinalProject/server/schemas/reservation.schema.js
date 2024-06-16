const mongoose=require('mongoose');

const ReservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    guest: { type: Number, required: true }
}, { timestamps: true, versionKey: false });

module.exports=ReservationSchema