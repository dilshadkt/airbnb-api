const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  hostid: {
    type: String,
    required: true,
  },
  propertType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pricePeNight: {
    type: Number,
    required: true,
  },
  availability: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
  },
  maxGuest: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  amenities: {
    type: Array,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
