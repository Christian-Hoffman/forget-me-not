const { Schema } = require("mongoose");
const format = require("../utils/dateFormat");

const listSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  listItems: [
    {
      type: String,
    }
  ],
  createdAt: {
    type: String, 
    default: format(Date.now()),
  },
  isPublic: {
    type: Boolean
  },
  isOrdered: {
    type: Boolean
  }

})

module.exports = listSchema