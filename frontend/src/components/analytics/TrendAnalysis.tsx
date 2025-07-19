"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts"
import { TrendingUp } from "lucide-react"

const keywordTrendData = [
  { date: "2025-06-25", keywordA: 240, keywordB: 130, keywordC: 100 },
  { date: "2025-06-26", keywordA: 300, keywordB: 165, keywordC: 140 },
  { date: "2025-06-27", keywordA: 350, keywordB: 190, keywordC: 170 },
  { date: "2025-06-28", keywordA: 320, keywordB: 210, keywordC: 180 },
  { date: "2025-06-29", keywordA: 400, keywordB: 240, keywordC: 220 },
  { date: "2025-06-30", keywordA: 420, keywordB: 260, keywordC: 230 },
  { date: "2025-07-01", keywordA: 450, keywordB: 280, keywordC: 260 },
]

const contentTypeData = [
  { type: "Text", count: 1200 },
  { type: "Image", count: 900 },
  { type: "Video", count: 600 },
]

export default function TrendAnalysis() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Keyword Trend Line Chart */}
      <Card className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
            Keyword Popularity Trend (Last 7 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart data={keywordTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#bbb" />
                <YAxis stroke="#bbb" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", borderRadius: 6, border: "none" }}
                  labelStyle={{ color: "#ddd" }}
                  itemStyle={{ color: "#eee" }}
                />
                <Legend wrapperStyle={{ color: "#ccc" }} />
                <Line type="monotone" dataKey="keywordA" stroke="#a78bfa" strokeWidth={2} name="#NewProductLaunch" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="keywordB" stroke="#8b5cf6" strokeWidth={2} name="#UserExperienceOptimization" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="keywordC" stroke="#c084fc" strokeWidth={2} name="#CustomerServiceResponseTime" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Content Type Bar Chart */}
      <Card className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
            Content Type Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={contentTypeData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="type" stroke="#bbb" />
                <YAxis stroke="#bbb" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", borderRadius: 6, border: "none" }}
                  labelStyle={{ color: "#ddd" }}
                  itemStyle={{ color: "#eee" }}
                />
                <Bar dataKey="count" fill="#a78bfa" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
