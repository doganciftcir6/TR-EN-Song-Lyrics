const mongoose = require("mongoose");

const CheckIsValidMongoID = (id) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  return true;
};

module.exports = CheckIsValidMongoID;
