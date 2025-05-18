import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Distribution from "@/models/Distribution"
import { verifyAuth } from "@/lib/auth"

// GET all distributions
export async function GET(request) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    // Connect to the database
    await connectToDatabase()

    // Get all distributions
    const distributions = await Distribution.find({})

    return NextResponse.json(distributions)
  } catch (error) {
    console.error("Error fetching distributions:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
