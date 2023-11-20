const Property = require("../model/Property");
const Reserve = require("../model/Reservation");
const _ = require("lodash");
const { User } = require("../model/User");

//////// RESERVE  🧾🧾🧾 ///////////////

const postReserve = async (req, res) => {
  const reservation = new Reserve(
    _.pick(req.body, [
      "guestId",
      "listingId",
      "checkInDate",
      "checkoutDate",
      "totalPrice",
      "bookingDate",
    ])
  );

  const property = await Property.findById(req.body.listingId);

  const host = await User.findById(property.hostid);

  host.reservation.push(reservation._id);
  await host.save();
  await reservation.save();
  res.status(200).json("resrved succesfully");
};

/////// GET ALLL RESERVATION ///////////////
const GetAllReserve = async (req, res) => {
  const user = await User.findById(req.params.userId)
    .populate({
      path: "reservation",
      populate: { path: "listingId" },
    })
    .select({ reservation: 1 });
  res.send(user.reservation);
};
module.exports = { postReserve, GetAllReserve };
