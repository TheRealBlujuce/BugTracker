const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bugSchema = new Schema({
  // id: {type: mongoose.Schema.Types.ObjectId}, // Add ObjectId field
  title: { type: String, required: true },
  priority: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('BugPosts', bugSchema);