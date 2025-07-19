"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"
import { Heart } from "lucide-react"

interface SentimentAnalysisProps {
  monitorId: string | null
}

export default function SentimentAnalysis({ monitorId }: SentimentAnalysisProps) {
  const [sentimentTrendData, setSentimentTrendData] = useState([])
  const [sentimentIntensityData, setSentimentIntensityData] = useState([])

  useEffect(() => {
    if (!monitorId) return

    fetch(`http://localhost:8000/api/sentiment/trend?monitorId=${monitorId}`)
      .then((res) => res.json())
      .then((data) => setSentimentTrendData(data))
      .catch(console.error)

    fetch(`http://localhost:8000/api/sentiment/intensity?monitorId=${monitorId}`)
      .then((res) => res.json())
      .then((data) => setSentimentIntensityData(data))
      .catch(console.error)
  }, [monitorId])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 情绪趋势折线图 */}
      <Card className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Heart className="mr-2 h-5 w-5 text-purple-400" />
            情绪趋势（最近7天）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <LineChart
                data={sentimentTrendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#bbb" />
                <YAxis stroke="#bbb" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", borderRadius: 6, border: "none" }}
                  labelStyle={{ color: "#ddd" }}
                  itemStyle={{ color: "#eee" }}
                />
                <Legend wrapperStyle={{ color: "#ccc" }} />
                <Line
                  type="monotone"
                  dataKey="positive"
                  stroke="#a3e635"
                  strokeWidth={2}
                  name="正面"
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="neutral"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="中性"
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="negative"
                  stroke="#f43f5e"
                  strokeWidth={2}
                  name="负面"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 情感强度分布 */}
      <Card className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Heart className="mr-2 h-5 w-5 text-purple-400" />
            情感强度分布
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-w-md mx-auto">
            {sentimentIntensityData.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between text-gray-300">
                <span>{label}</span>
                <div className="flex-1 mx-4 bg-gray-700 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${
                      label.includes("正面")
                        ? "bg-green-400"
                        : label.includes("负面")
                        ? "bg-red-400"
                        : "bg-purple-400"
                    }`}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <span className="w-10 text-right font-semibold">{value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
