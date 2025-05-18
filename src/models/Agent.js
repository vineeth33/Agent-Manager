import mongoose from "mongoose"

// Define the Agent schema
const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: [true, "Mobile number is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Check if the model already exists to prevent overwriting
const Agent = mongoose.models.Agent || mongoose.model("Agent", agentSchema)

export default Agent
