const { User } = require("../model/User");
const { WhishList } = require("../model/Whishlist");

/////////ADD WHISH LIST  (✿◡‿◡) ////////////////////
const addwhishList = async (req, res, next) => {
  let user = await User.findById(req.params.userId);
  const IsExist = await WhishList.findOne({ user: user._id });
  if (IsExist) {
    IsExist.property.push(req.query.propertyId);
    await IsExist.save();

    res.send(IsExist.property);
  } else {
    const newWish = new WhishList({
      user: user._id,
      property: [req.query.propertyId],
    });
    user.whishList = newWish._id;
    await user.save();
    await newWish.save();
  }
  res.send(newWish.property);
};

//////////// GET WHISH LIST  ///////////////////
const GetWhishList = async (req, res) => {
  const whish = await WhishList.findOne({ user: req.params.userId }).populate(
    "property"
  );
  let user = await User.findById(req.params.userId)
    .populate("whishList")
    .select({ whishList: 1 });
  await user.whishList.populate("property");
  user = user.whishList.property.map((item) => ({
    propertyId: item._id,
    images: item.images,
  }));

  res.send(user);
};

///// DELETE WISHLIST  ////////////////////
const DeleteWhishList = async (req, res) => {
  let whislist = await WhishList.findOne({ user: req.params.userId });
  const result = whislist.property.filter(
    (item) => item.toString() !== req.query.propertyId
  );

  whislist.property = result;
  await whislist.populate("property");
  await whislist.save();
  whislist = whislist.property.map((item) => ({
    propertyId: item._id,
    images: item.images,
  }));

  res.send(whislist);
};
module.exports = { addwhishList, GetWhishList, DeleteWhishList };
