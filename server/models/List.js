const { Schema } = require("mongoose");
const format = require("../utils/dateFormat");
const Item = require("./Item");

const listSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  listItems: [Item],
  createdAt: {
    type: String, 
    default: format(Date.now()),
  },
  isPublic: {
    type: Boolean
  }

})

module.exports = listSchema