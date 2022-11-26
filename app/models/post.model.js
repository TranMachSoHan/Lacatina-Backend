const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectId

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    owner: {
        type: ObjectID,
        ref: 'User'
    },
    addressPickUp: String,
    latPickUp: String,
    lngPickUp: String,
    typeOfWaste: String,
    weight: Number,
    assignTo: {
        type: ObjectID,
        ref: 'User'
    },
    status: Boolean, //true = pending, false = done 
  })
);

module.exports = Post;