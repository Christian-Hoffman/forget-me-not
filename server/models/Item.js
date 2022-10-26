const { Schema } = require("mongoose");

const itemSchema = new Schema({
  body: {
    type: String,
    require: true,
  }
})

module.exports = itemSchema;