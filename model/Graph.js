const mongoose = require("mongoose");

const GraphShema = new mongoose.Schema({
  name: {
    type: String,
  },
  date: {
    type: Date,
  },
  location: {
    type: String,
  },
  data: [
    {
      depth: {
        type: Number,
      },
      plasticType: {
        type: String,
      },
      qty: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model("Graph", GraphShema);
