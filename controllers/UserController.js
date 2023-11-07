const Property = require("../model/Property");

///////////  get all Listing ////////////////
const postList = async (req, res, next) => {
  const newList = new Property({
    hostid: "123",
    propertType: "room",
    title: "malappuram house",
    description: "small rent house",
    location: "munduparamba",
    address: "near governament college ",
    pricePeNight: 1233,
    availability: ["single room", "double room"],
    maxGuest: 4,
    bedrooms: 4,
    bathrooms: 2,
    amenities: ["play", "games"],
  });
  try {
    const savedList = await newList.save();
    res.status(200).json(savedList);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = postList;
