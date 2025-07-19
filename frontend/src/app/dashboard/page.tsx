"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/contexts/authcontext"
import { RequireAuth } from "@/components/RequireAuth"
import { Navbar } from "@/components/navigation/navbar"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LogOut,
  Plus,
  Eye,
  Pause,
  Play,
  Settings,
  Trash2,
  TrendingUp,
  TrendingDown,
  Globe,
} from "lucide-react"
import { MonitorCreateModal } from "@/components/dashboard/monitorcreatemodal"
import {
  fetchMonitors,
  createMonitor,
  fetchMonitorStatus,
  pauseMonitor,
  resumeMonitor,
  deleteMonitor,
  updateMonitor,
} from "@/lib/api"

interface Monitor {
  id: number
  name: string
  keywords: string[]
  platforms: string[]
  frequency: string
  status: string
  sentiment: { positive: number; neutral: number; negative: number }
  mentions: number
  trend: "up" | "down"
  lastUpdate: string
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [monitors, setMonitors] = useState<Monitor[]>([])
  const [loading, setLoading] = useState(false)
  const [editModalData, setEditModalData] = useState<Monitor | null>(null)

  const displayUser = {
    name: user?.username || user?.email || "Anonymous User",
    email: user?.email || "",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  // Retrieve token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : ""

  // Fetch monitor list
  const loadMonitors = async () => {
    if (!token) return
    setLoading(true)
    try {
      const data = await fetchMonitors(token)
      console.log("Current monitor tasks:", data)
      setMonitors(data)
    } catch (error) {
      console.error("Failed to fetch monitors", error)
    } finally {
      setLoading(false)
    }
  }

  // Automatically load monitors when user is available
  useEffect(() => {
    if (user) {
      loadMonitors()
    }
  }, [user])

  // Pause monitor
  const handlePause = async (id: number) => {
    if (!token) return
    try {
      await pauseMonitor(token, id)
      setMonitors((prev) => prev.map((m) => (m.id === id ? { ...m, status: "paused" } : m)))
    } catch (err) {
      console.error("Failed to pause monitor", err)
    }
  }

  // Resume monitor
  const handleResume = async (id: number) => {
    if (!token) return
    try {
      await resumeMonitor(token, id)
      setMonitors((prev) => prev.map((m) => (m.id === id ? { ...m, status: "active" } : m)))
    } catch (err) {
      console.error("Failed to resume monitor", err)
    }
  }

  // Delete monitor
  const handleDelete = async (id: number) => {
    if (!token) return
    if (!confirm("Are you sure you want to delete this monitor?")) return
    try {
      await deleteMonitor(token, id)
      setMonitors((prev) => prev.filter((m) => m.id !== id))
    } catch (err) {
      console.error("Failed to delete monitor", err)
    }
  }

  interface MonitorCreateData {
    name: string
    frequency: string
    keywords: string
    platforms: string[]
  }

  // Create monitor
  const handleCreateMonitor = async (data: MonitorCreateData) => {
    if (!token) return
    try {
      const res = await createMonitor(token, data)
      const newMonitor: Monitor = {
        id: res.task_id,
        name: data.name,
        keywords: data.keywords.split(",").map((k) => k.trim()),
        platforms: data.platforms,
        status: "processing",
        sentiment: { positive: 0, neutral: 0, negative: 0 },
        mentions: 0,
        trend: "up",
        lastUpdate: "Pending analysis",
      }
      console.log("Monitor created:", res)
      setMonitors((prev) => [...prev, newMonitor])
      pollMonitorResult(res.task_id)
    } catch (error) {
      console.error("Failed to create monitor", error)
    } finally {
      setIsModalOpen(false)
    }
  }

  // Update monitor
  const handleUpdateMonitor = async (data: any) => {
    if (!token) return
    try {
      // Ensure keywords is an array
      const keywordsArray = Array.isArray(data.keywords)
        ? data.keywords
        : data.keywords.split(",").map((k: string) => k.trim())

      // Similarly handle platforms possibly as string or array
      const platformsArray = Array.isArray(data.platforms) ? data.platforms : [data.platforms]

      await updateMonitor(token, data.id, {
        ...data,
        keywords: keywordsArray,
        platforms: platformsArray,
      })

      setMonitors((prev) =>
        prev.map((m) =>
          m.id === data.id
            ? {
                ...m,
                name: data.name,
                frequency: data.frequency,
                keywords: keywordsArray,
                platforms: platformsArray,
              }
            : m
        )
      )
    } catch (err) {
      console.error("Failed to update monitor", err)
    } finally {
      setEditModalData(null)
    }
  }

  // Poll monitor status and update
  const pollMonitorResult = (monitorId: number) => {
    const intervalId = setInterval(async () => {
      try {
        const data = await fetchMonitorStatus(token, monitorId)
        if (data.status === "completed") {
          setMonitors((prev) =>
            prev.map((m) =>
              m.id === monitorId
                ? {
                    ...m,
                    sentiment: data.sentiment,
                    mentions: data.mentions,
                    trend: data.trend,
                    lastUpdate: new Date().toLocaleTimeString(),
                    status: "active",
                  }
                : m
            )
          )
          clearInterval(intervalId)
        }
      } catch (error) {
        console.error("Polling failed", error)
        clearInterval(intervalId)
      }
    }, 3000)
  }

  // Logout
  const handleLogout = () => {
    logout()
    router.replace("/login")
  }

  if (!user) {
    return (
      <RequireAuth>
        <div>Loading or not logged in...</div>
      </RequireAuth>
    )
  }

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navbar
          isAuthenticated={!!user}
          user={user ? displayUser : undefined}
          onLogout={logout}
          forceMode="dashboard"
        />
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb />
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
            <p className="text-gray-300">Here is an overview of your sentiment analysis data</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Monitoring Tasks</h2>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Monitor
                </Button>
              </div>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {monitors.map((monitor) => (
                      <div key={monitor.id} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-white font-semibold">{monitor.name}</h3>
                              <Badge
                                className={
                                  monitor.status === "active"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-gray-500/20 text-gray-400"
                                }
                              >
                                {monitor.status === "active" ? "Active" : "Paused"}
                              </Badge>
                              {monitor.trend === "up" ? (
                                <TrendingUp className="h-4 w-4 text-green-400" />
                              ) : (
                                <TrendingDown className="h-4 w-4 text-red-400" />
                              )}
                            </div>
                            <div className="grid md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">Keywords</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {monitor.keywords?.slice(0, 2).map((keyword, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-blue-500/20 text-blue-300 text-xs"
                                    >
                                      {keyword}
                                    </Badge>
                                  ))}
                                  {monitor.keywords?.length > 2 && (
                                    <Badge className="bg-gray-500/20 text-gray-400 text-xs">
                                      +{monitor.keywords.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-400">Platforms</p>
                                <div className="flex items-center space-x-1 mt-1">
                                  <Globe className="h-3 w-3 text-gray-400" />
                                  <span className="text-white">
                                    {monitor.platforms?.length ?? 0} platforms
                                  </span>
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-400">Mentions</p>
                                <p className="text-white font-semibold">
                                  {monitor.mentions.toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-400">Sentiment Distribution</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-xs text-white">{monitor.sentiment.positive}%</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span className="text-xs text-white">{monitor.sentiment.neutral}%</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                    <span className="text-xs text-white">{monitor.sentiment.negative}%</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-400 text-xs mt-2">Last updated: {monitor.lastUpdate}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent border-white/20 text-white"
                              onClick={() => router.push(`/dashboard/analytics?monitorId=${monitor.id}`)}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent border-white/20 text-white"
                              onClick={() =>
                                monitor.status === "active"
                                  ? handlePause(monitor.id)
                                  : handleResume(monitor.id)
                              }
                            >
                              {monitor.status === "active" ? (
                                <Pause className="h-3 w-3" />
                              ) : (
                                <Play className="h-3 w-3" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent border-white/20 text-white"
                              onClick={() => setEditModalData(monitor)}
                            >
                              <Settings className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-transparent border-red-500/20 text-red-400 hover:bg-red-500/10"
                              onClick={() => handleDelete(monitor.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Account Info</CardTitle>
                  <CardDescription className="text-gray-300">Your current login details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-white">
                  <div>
                    <p className="text-sm text-gray-400">Username</p>
                    <p>{user?.username || "Unnamed User"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p>{user?.email}</p>
                  </div>
                  <Button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 mt-4 text-white"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <MonitorCreateModal onClose={() => setIsModalOpen(false)} onCreate={handleCreateMonitor} />
        )}

        {editModalData && (
          <MonitorCreateModal
            initialData={editModalData}
            onClose={() => setEditModalData(null)}
            onCreate={handleUpdateMonitor}
          />
        )}
      </div>
    </RequireAuth>
  )
}
