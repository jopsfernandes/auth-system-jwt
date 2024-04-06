const  mongoose = require("mongoose")

const StoragedLink = mongoose.model('StoragedLink', {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    link: String,
    description: String,
    expiryTime: Date,
  });

module.exports = StoragedLink