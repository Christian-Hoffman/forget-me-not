const { Schema } = require("mongoose");

const noteSchema = new Schema({
  title: {
    type: String, 
    required: true,
    trim: true,
  },
  body:{
    type: String,
    trim: true,
  }
})


module.exports = noteSchema;