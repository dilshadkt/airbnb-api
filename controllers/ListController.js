const Property = require("../model/Property");

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

module.exports = { geAlltList };
