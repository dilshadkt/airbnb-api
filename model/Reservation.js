const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
  guestId: {
    type: Number,
    required: true,
  },
  listingId: {
    type: Number,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },

  checkoutDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
  },
  guestMessage: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: Date,
  },
});

module.exports = mongoose.model("Reservation", reserveSchema);
