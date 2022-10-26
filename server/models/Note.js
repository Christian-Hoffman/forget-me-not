const { Schema } = require("mongoose");
const format = require("../utils/dateFormat");

const noteSchema = new Schema({
  title: {
    type: String, 
    required: true,
    trim: true,
  },
  body:{
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now().format,
  }
})


module.exports = noteSchema;