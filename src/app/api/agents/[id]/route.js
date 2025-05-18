import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Agent from "@/models/Agent"
import { verifyAuth } from "@/lib/auth"

// DELETE an agent by ID
export async function DELETE(request, { params }) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    const { id } = params

    // Connect to the database
    await connectToDatabase()

    // Find and delete the agent
    const deletedAgent = await Agent.findByIdAndDelete(id)

    if (!deletedAgent) {
      return NextResponse.json({ message: "Agent not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Agent deleted successfully" })
  } catch (error) {
    console.error("Error deleting agent:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
