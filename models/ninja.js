const mongoose = require('mongoose');

const GeoSchema = new mongoose.Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
})

const NinjaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    rank: {
        type: String,
        required: [true, 'Rank field is required']
    },
    available: {
        type: Boolean,
        default: false
    },
    geometry: GeoSchema

});

const Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;
