const mongoose = require('mongoose');

const collaborationSchema = new mongoose.Schema({
  senderNGO: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true
  },
  receiverNGO: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  message: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Collaboration', collaborationSchema);