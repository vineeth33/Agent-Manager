import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Agent from "@/models/Agent"
import { verifyAuth } from "@/lib/auth"
import bcrypt from "bcryptjs"

// GET all agents
export async function GET(request) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    // Connect to the database
    await connectToDatabase()

    // Get all agents
    const agents = await Agent.find({}, { password: 0 }) // Exclude password field

    return NextResponse.json(agents)
  } catch (error) {
    console.error("Error fetching agents:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// POST create a new agent
export async function POST(request) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    // Connect to the database
    await connectToDatabase()

    // Get agent data from request
    const { name, email, mobile, password } = await request.json()

    // Validate required fields
    if (!name || !email || !mobile || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Check if agent with this email already exists
    const existingAgent = await Agent.findOne({ email })
    if (existingAgent) {
      return NextResponse.json({ message: "Agent with this email already exists" }, { status: 409 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new agent
    const newAgent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    })

    // Save the agent to the database
    await newAgent.save()

    // Return the created agent (without password)
    const agentResponse = newAgent.toObject()
    delete agentResponse.password

    return NextResponse.json(agentResponse, { status: 201 })
  } catch (error) {
    console.error("Error creating agent:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
