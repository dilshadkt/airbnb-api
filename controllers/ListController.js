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
module.exports = { geAlltList, postList };
