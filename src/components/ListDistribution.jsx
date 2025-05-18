"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ListDistribution() {
  const [agents, setAgents] = useState([])
  const [distributions, setDistributions] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [uploadError, setUploadError] = useState("")
  const [uploadSuccess, setUploadSuccess] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedAgent, setSelectedAgent] = useState(null)

  useEffect(() => {
    fetchAgents()
    fetchDistributions()
  }, [])

  const fetchAgents = async () => {
    try {
      const response = await fetch("/api/agents", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch agents")
      }

      const data = await response.json()
      setAgents(data)

      if (data.length > 0) {
        setSelectedAgent(data[0]._id)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const fetchDistributions = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/distributions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch distributions")
      }

      const data = await response.json()

      // Organize distributions by agent
      const distributionsByAgent = {}
      data.forEach((item) => {
        if (!distributionsByAgent[item.agentId]) {
          distributionsByAgent[item.agentId] = []
        }
        distributionsByAgent[item.agentId].push(item)
      })

      setDistributions(distributionsByAgent)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file extension
      const fileExt = file.name.split(".").pop().toLowerCase()
      if (!["csv", "xlsx", "xls"].includes(fileExt)) {
        setUploadError("Invalid file format. Only CSV, XLSX, and XLS files are allowed.")
        e.target.value = null
        return
      }

      setSelectedFile(file)
      setUploadError("")
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a file to upload")
      return
    }

    if (agents.length === 0) {
      setUploadError("You need to add agents before uploading a list")
      return
    }

    setUploadError("")
    setUploadSuccess("")

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      const response = await fetch("/api/distributions/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload file")
      }

      setUploadSuccess("File uploaded and distributed successfully!")
      setSelectedFile(null)

      // Reset file input
      document.getElementById("file-upload").value = ""

      // Refresh distributions
      fetchDistributions()
    } catch (err) {
      setUploadError(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">List Distribution</h2>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Upload CSV File</CardTitle>
        </CardHeader>
        <CardContent>
          {uploadError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{uploadError}</AlertDescription>
            </Alert>
          )}

          {uploadSuccess && (
            <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
              <AlertDescription>{uploadSuccess}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                id="file-upload"
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary file:text-white
                  hover:file:bg-primary/90"
              />
              <Button onClick={handleUpload} disabled={!selectedFile}>
                <Upload className="h-4 w-4 mr-2" />
                Upload & Distribute
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload a CSV or Excel file with FirstName, Phone, and Notes columns. The system will distribute the
              entries equally among all agents.
            </p>
          </div>
        </CardContent>
      </Card>

      {agents.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Distributed Lists</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={agents[0]?._id}>
              <TabsList className="mb-4">
                {agents.map((agent) => (
                  <TabsTrigger key={agent._id} value={agent._id}>
                    {agent.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {agents.map((agent) => (
                <TabsContent key={agent._id} value={agent._id}>
                  {isLoading ? (
                    <div className="text-center py-4">Loading...</div>
                  ) : distributions[agent._id]?.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>First Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Notes</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {distributions[agent._id]?.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell>{item.firstName}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell>{item.notes}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground">
                      No items distributed to this agent yet.
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            You need to add agents before you can distribute lists.
          </CardContent>
        </Card>
      )}
    </div>
  )
}
