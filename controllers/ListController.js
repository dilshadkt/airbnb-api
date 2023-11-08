const Property = require("../model/Property");

//////// get all list of property /////////
const geAlltList = async (req, res, next) => {
  try {
    const properties = req.query.id
      ? await Property.findById(req.query.id)
      : await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(400).json(err);
  }
};

///////////////// get a property  //////////
const getList = async (req, res, next) => {
  const id = req.query.id;
  try {
    const property = await Property.findById(id);
    res.status(200).json(property);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = { geAlltList };
