const ReservationModel = require('../models/reservation.model')
const sendVerifyEmailReservartion = require('../helpers/sendMailReservation');
const reservation_controller = {
    getAll: async (req, res) => {
        try {
            const reservations = await ReservationModel.find();
            if (reservations.length > 0) {
                res.status(200).send({ message: 'success', data: reservations });
            } else {
                res.send({ message: 'data is empty', data: null });
            }
        } catch (error) {
            res.status(500).send({ message: error.message, error: true });
        }
    },
    getOne: async (req, res) => {
        const { id } = req.params;
        try {
            const reservation = await ReservationModel.findById(id);
            if (reservation) {
                res.status(200).send({ message: 'success', data: reservation });
            } else {
                res.send({ message: 'data is empty', data: null });
            }
        } catch (error) {
            res.status(500).send({ message: error.message, error: true });
        }
    },
    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const response = await ReservationModel.findByIdAndDelete(id);
            const allReservations = await ReservationModel.find();
            res.send({ message: 'deleted', response, allReservations });
        } catch (error) {
            res.status(500).send({ message: error.message, error: true });
        }
    },
    update: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const updatedReservation = await ReservationModel.findByIdAndUpdate(id, req.body, { new: true });
            const message = status === 'accepted' ? `Hello ,\n\nYour Reservation has been Accepted.\n\nThank you for contacting us.` : 'Your Reservation has been Rejected.Thank you again for considering us';
            sendVerifyEmailReservartion(updatedReservation.email, message);

            res.send({
                message: 'updated',
                response: updatedReservation
            });
        } catch (error) {
            res.status(500).send({
              message: error.message,
              error: true
            });
          }
    },
    post: async (req, res) => {
        try {
            const newReservation = new ReservationModel(req.body);
            await newReservation.save();
            res.send({ message: 'posted', response: newReservation });
        } catch (error) {
            res.status(500).send({ message: error.message, error: true });
        }
    },
}
module.exports = reservation_controller;