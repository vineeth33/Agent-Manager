import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db"
import Agent from "@/models/Agent"
import Distribution from "@/models/Distribution"
import { verifyAuth } from "@/lib/auth"
import { parse } from "csv-parse/sync"
import xlsx from "xlsx"

export async function POST(request) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ message: authResult.message }, { status: authResult.status })
    }

    // Connect to the database
    await connectToDatabase()

    // Get all agents
    const agents = await Agent.find({})

    if (agents.length === 0) {
      return NextResponse.json({ message: "No agents found. Please add agents first." }, { status: 400 })
    }

    // Parse the form data
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 })
    }

    // Get file extension
    const fileName = file.name
    const fileExt = fileName.split(".").pop().toLowerCase()

    // Parse the file based on its extension
    let records = []

    if (fileExt === "csv") {
      // Parse CSV file
      const buffer = Buffer.from(await file.arrayBuffer())
      const content = buffer.toString()

      records = parse(content, {
        columns: true,
        skip_empty_lines: true,
      })
    } else if (fileExt === "xlsx" || fileExt === "xls") {
      // Parse Excel file
      const buffer = Buffer.from(await file.arrayBuffer())
      const workbook = xlsx.read(buffer, { type: "buffer" })
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]

      records = xlsx.utils.sheet_to_json(worksheet)
    } else {
      return NextResponse.json(
        { message: "Unsupported file format. Please upload a CSV, XLSX, or XLS file." },
        { status: 400 },
      )
    }

    // Validate records
    if (records.length === 0) {
      return NextResponse.json({ message: "The uploaded file is empty or has invalid format" }, { status: 400 })
    }

    // Check if records have the required fields
    const requiredFields = ["FirstName", "Phone", "Notes"]
    const firstRecord = records[0]

    const missingFields = requiredFields.filter(
      (field) => !Object.keys(firstRecord).some((key) => key.toLowerCase() === field.toLowerCase()),
    )

    if (missingFields.length > 0) {
      return NextResponse.json({ message: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    // Normalize field names (handle case sensitivity)
    const normalizedRecords = records.map((record) => {
      const normalized = {}

      Object.keys(record).forEach((key) => {
        if (key.toLowerCase() === "firstname") normalized.firstName = record[key]
        else if (key.toLowerCase() === "phone") normalized.phone = record[key]
        else if (key.toLowerCase() === "notes") normalized.notes = record[key]
      })

      return normalized
    })

    // Distribute records among agents
    const agentCount = agents.length
    const recordsPerAgent = Math.floor(normalizedRecords.length / agentCount)
    const remainingRecords = normalizedRecords.length % agentCount

    // Delete existing distributions
    await Distribution.deleteMany({})

    // Create new distributions
    const distributions = []

    for (let i = 0; i < agentCount; i++) {
      const startIndex = i * recordsPerAgent + Math.min(i, remainingRecords)
      const endIndex = startIndex + recordsPerAgent + (i < remainingRecords ? 1 : 0)

      const agentRecords = normalizedRecords.slice(startIndex, endIndex)

      for (const record of agentRecords) {
        distributions.push({
          agentId: agents[i]._id,
          firstName: record.firstName,
          phone: record.phone,
          notes: record.notes,
        })
      }
    }

    // Save distributions to database
    await Distribution.insertMany(distributions)

    return NextResponse.json({
      message: "File uploaded and distributed successfully",
      distributionCount: distributions.length,
    })
  } catch (error) {
    console.error("Error uploading and distributing file:", error)
    return NextResponse.json({ message: "Internal server error: " + error.message }, { status: 500 })
  }
}
