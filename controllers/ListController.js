const Property = require("../model/Property");

const getList = async (req, res, next) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = getList;
