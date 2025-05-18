"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import AgentManagement from "./AgentManagement"
import ListDistribution from "./ListDistribution"

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("agents")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Agent Management System</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, Admin</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="agents" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="agents">Agent Management</TabsTrigger>
            <TabsTrigger value="distribution">List Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="agents">
            <AgentManagement />
          </TabsContent>

          <TabsContent value="distribution">
            <ListDistribution />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
