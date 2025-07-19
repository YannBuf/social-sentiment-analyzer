"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Globe } from "lucide-react"

const sentimentColors = {
  正面: "#8b5cf6", // 亮紫
  中性: "#64748b", // 柔灰
  负面: "#c084fc", // 粉紫
}

export default function PlatformAnalysis() {
  const [platformMentionData, setPlatformMentionData] = useState<
    { platform: string; mentions: number }[]
  >([])
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [sentimentData, setSentimentData] = useState<{ name: string; value: number }[] | null>(null)
  const [loadingSentiment, setLoadingSentiment] = useState(false)

  // 页面加载时拉取提及量数据
  useEffect(() => {
    fetch("http://localhost:8000/api/platforms/mentions")
      .then((res) => res.json())
      .then((data) => setPlatformMentionData(data))
      .catch(console.error)
  }, [])

  // 点击条形图时拉取情感数据
  const onBarClick = (platform: string) => {
    setSelectedPlatform(platform)
    setLoadingSentiment(true)
    fetch(`http://localhost:8000/api/platforms/${platform}/sentiment`)
      .then((res) => {
        if (!res.ok) throw new Error("获取情感数据失败")
        return res.json()
      })
      .then((data) => setSentimentData(data))
      .catch((err) => {
        console.error(err)
        setSentimentData(null)
      })
      .finally(() => setLoadingSentiment(false))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 各平台提及量条形图 */}
      <Card
        className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md lg:col-span-2 cursor-pointer"
      >
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Globe className="mr-2 h-5 w-5 text-purple-400" />
            各平台提及量（点击查看情感分布）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart
                data={platformMentionData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="platform" stroke="#bbb" />
                <YAxis stroke="#bbb" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#111", borderRadius: 6, border: "none" }}
                  labelStyle={{ color: "#ddd" }}
                  itemStyle={{ color: "#eee" }}
                />
                <Bar
                  dataKey="mentions"
                  fill="#a78bfa"
                  barSize={40}
                  cursor="pointer"
                  onClick={(data) => {
                    if (data && data.payload && data.payload.platform) {
                      onBarClick(data.payload.platform)
                    }
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 右侧情感饼图 */}
      {loadingSentiment ? (
        <Card className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md flex items-center justify-center text-gray-400">
          <p>加载中...</p>
        </Card>
      ) : sentimentData && selectedPlatform ? (
        <Card className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="mr-2 h-5 w-5 text-purple-400" />
              {selectedPlatform} 情感分布
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={sentimentData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label={({ name, value }) =>
                      `${name} (${(
                        (value / sentimentData.reduce((sum, cur) => sum + cur.value, 0)) *
                        100
                      ).toFixed(0)}%)`
                    }
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={sentimentColors[entry.name]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md flex items-center justify-center text-gray-400">
          <p className="text-center p-4">请点击左侧条形图查看对应平台的情感分布</p>
        </Card>
      )}
    </div>
  )
}
