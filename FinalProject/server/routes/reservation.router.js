const express = require('express')
const endpoints = require('../constants/endpoints')
const reservation_controller = require('../controllers/reservation.controller')


const reservation_router = express.Router();

reservation_router.get(endpoints.reservations.getAll, reservation_controller.getAll);
reservation_router.get(endpoints.reservations.getOne, reservation_controller.getOne);
reservation_router.delete(endpoints.reservations.delete, reservation_controller.delete);
reservation_router.patch(endpoints.reservations.update, reservation_controller.update);
reservation_router.post(endpoints.reservations.post, reservation_controller.post);

module.exports = reservation_router;