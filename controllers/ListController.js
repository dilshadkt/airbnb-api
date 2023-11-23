const Property = require("../model/Property");
const _ = require("lodash");
const { uploader } = require("../config/Couldinary");
const { User } = require("../model/User");

//////// get all list of property /////////
const geAlltList = async (req, res, next) => {
  try {
    const properties = req.query.id
      ? await Property.findById(req.query.id)
      : await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    next(err);
  }
};

//// GET ALL LIST OF USER //////////////////////
const getAllListUser = async (req, res) => {
  const property = await Property.find({ hostid: req.params.userId });
  res.send(property);
};

///////// POST A LIST (PROPERTY) ☆*: .｡. o(≧▽≦)o .｡.:*☆ ////////
const postList = async (req, res, next) => {
  console.log(req.query.userId);
  try {
    let Files = req.files;
    if (!Files)
      return res.status(400).json({ message: "No picture attached!" });

    let multiplePicturePromise = Files.map((picture) =>
      uploader.upload(picture.path)
    );
    // await all the cloudinary upload functions in promise.all, exactly where the magic happens
    let imageResponses = await Promise.all(multiplePicturePromise);

    const property = new Property(
      _.pick(req.body, [
        "houseType",
        "propertyType",
        "place",
        "aboutPlace",
        "propertyOffer",
        "image",
        "title",
        "description",
        "pricePeNight",
        "discount",
        "security",
      ])
    );
    property.hostid = req.query.userId;
    property.isVefied = false;
    property.images = imageResponses.map((item) => item.url);

    const user = await User.findById(req.query.userId);

    user.userType = "host";
    await user.save();
    const NewProperty = await property.save();
    res.status(200).json(NewProperty);
  } catch (err) {
    res.status(500).json({
      messageyup: err.message,
    });
  }
};

///  GET NEW PROPERTY THAT'S NOT VERIFIED （づ￣3￣）づ╭❤️～ ////
const getNewProperty = async (req, res) => {
  const property = await Property.find({ isVefied: false });
  if (!property) return res.status(400).send("no new property ");
  res.send(property);
};

/// UPDATE PROPERTY  TO VERIFIED PROPERTY ////////
const AcceptProperty = async (req, res) => {
  const property = await Property.findById(req.params.propertyId);
  property.isVefied = true;
  await property.save();
  res.status(200).send(" is verified by admin");
};
module.exports = {
  geAlltList,
  postList,
  getNewProperty,
  AcceptProperty,
  getAllListUser,
};
