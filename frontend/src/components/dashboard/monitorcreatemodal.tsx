"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface MonitorCreateModalProps {
  onClose: () => void
  onCreate: (data: { id?: number; name: string; frequency: string; keywords: string; platforms: string[] }) => void
  initialData?: {
    id: number
    name: string
    frequency: string
    keywords: string[]
    platforms: string[]
  }
}

const platformsList = ["Reddit", "X", "Facebook", "YouTube"]

export function MonitorCreateModal({ onClose, onCreate, initialData }: MonitorCreateModalProps) {
  const [name, setName] = useState(initialData?.name || "")
  const [frequency, setFrequency] = useState(initialData?.frequency || "realtime")
  const [keywords, setKeywords] = useState(initialData?.keywords?.join(", ") || "")
  const [platforms, setPlatforms] = useState<string[]>(initialData?.platforms || platformsList)

  const togglePlatform = (platform: string) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform))
    } else {
      setPlatforms([...platforms, platform])
    }
  }

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Please enter a monitor name")
      return
    }
    if (!keywords.trim()) {
      alert("Please enter keywords")
      return
    }

    onCreate({
      id: initialData?.id,
      name,
      frequency,
      keywords,
      platforms,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 flex justify-center items-start pt-20 z-50" onClick={onClose}>
      <div
        className="bg-slate-900 bg-opacity-90 rounded-md max-w-lg w-full p-6 shadow-lg border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="bg-transparent shadow-none border-none">
          <CardHeader>
            <CardTitle className="text-white">{initialData ? "Edit Keyword Monitor" : "Create Keyword Monitor"}</CardTitle>
            <CardDescription className="text-gray-400">Add and manage the keywords you want to monitor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="mb-1 block text-gray-300">Monitor Name</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Brand Mention Monitor"
                className="bg-gray-800 text-white border-gray-700"
              />
            </div>

            <div>
              <Label className="mb-1 block text-gray-300">Monitoring Frequency</Label>
              <select
                className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="realtime">Real-time</option>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
              </select>
            </div>

            <div>
              <Label className="mb-1 block text-gray-300">Keyword List</Label>
              <Input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="Enter keywords, separated by commas"
                className="bg-gray-800 text-white border-gray-700"
              />
              <p className="text-sm text-gray-500 mt-1">Supports regex and synonym expansion</p>
            </div>

            <div>
              <Label className="mb-1 block text-gray-300">Monitoring Platforms</Label>
              <div className="grid grid-cols-2 gap-2 max-h-32 overflow-auto">
                {platformsList.map((platform) => (
                  <label key={platform} className="inline-flex items-center space-x-2 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={platforms.includes(platform)}
                      onChange={() => togglePlatform(platform)}
                      className="rounded bg-gray-700 checked:bg-purple-600"
                    />
                    <span>{platform}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={handleSubmit}
            >
              {initialData ? "Save Changes" : "Create Keyword Monitor"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
