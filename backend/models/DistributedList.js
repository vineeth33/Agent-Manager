// models/DistributedList.js
const mongoose = require('mongoose');

const distributedListSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true
  },
  data: [{
    type: mongoose.Schema.Types.Mixed,
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  strict: false
});

module.exports = mongoose.model('DistributedList', distributedListSchema);