import mongoose from "mongoose"

// Define the Distribution schema
const distributionSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
    required: [true, "Agent ID is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Check if the model already exists to prevent overwriting
const Distribution = mongoose.models.Distribution || mongoose.model("Distribution", distributionSchema)

export default Distribution
