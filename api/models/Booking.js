const mongoose = require('mongoose');
const { type } = require('os');

const bookingSchema = new mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    price: Number,
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;

