const mongoose = require('mongoose');

const accomodationSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    addedPhotos: [String],
    description: String,
    perks: [String],
    additionalInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number
});

const AccomodationModel = mongoose.model('Accomodation', accomodationSchema);

module.exports = AccomodationModel;