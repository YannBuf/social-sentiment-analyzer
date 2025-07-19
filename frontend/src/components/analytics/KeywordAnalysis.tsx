"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { MessageSquare } from "lucide-react"

const colorSentiment = {
  正面: "#22c55e",
  中性: "#9ca3af",
  负面: "#ef4444",
}

export default function KeywordAnalysis() {
  const [wordCloudData, setWordCloudData] = useState<{ word: string; size: number }[]>([])
  const [keywordTrendData, setKeywordTrendData] = useState<any[]>([])
  const [keywordSentimentRanking, setKeywordSentimentRanking] = useState<
    { keyword: string; sentiment: string; score: number }[]
  >([])

  useEffect(() => {
    // 拉取词云数据
    fetch("http://localhost:8000/api/keywords/wordcloud")
      .then((res) => res.json())
      .then(setWordCloudData)
      .catch(console.error)

    // 拉取关键词热度趋势数据
    fetch("http://localhost:8000/api/keywords/trend")
      .then((res) => res.json())
      .then(setKeywordTrendData)
      .catch(console.error)

    // 拉取关键词情感排行
    fetch("http://localhost:8000/api/keywords/sentiment-ranking")
      .then((res) => res.json())
      .then(setKeywordSentimentRanking)
      .catch(console.error)
  }, [])

  // 获取趋势图中所有关键词的key（除了date）
  const trendKeys = keywordTrendData.length > 0 ? Object.keys(keywordTrendData[0]).filter(k => k !== "date") : []

  // 给趋势图的每条折线选不同颜色
  const trendColors = ["#a78bfa", "#8b5cf6", "#c084fc", "#22c55e", "#ef4444"]

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 关键词词云 */}
        <Card className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md col-span-1">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-purple-400" />
              关键词词云
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 justify-center select-none">
              {wordCloudData.map(({ word, size }) => (
                <span
                  key={word}
                  style={{ fontSize: `${size}px` }}
                  className="text-purple-300 opacity-80 cursor-default hover:text-purple-400 transition"
                >
                  {word}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 关键词热度趋势折线图 */}
        <Card className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-purple-400" />
              关键词热度趋势（最近7天）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <LineChart data={keywordTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#bbb" />
                  <YAxis stroke="#bbb" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111", borderRadius: 6, border: "none" }}
                    labelStyle={{ color: "#ddd" }}
                    itemStyle={{ color: "#eee" }}
                  />
                  {trendKeys.map((key, index) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={trendColors[index % trendColors.length]}
                      strokeWidth={3}
                      dot={{ r: 3 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 关键词情感排行表格 */}
      <Card className="bg-black/40 border border-white/10 backdrop-blur-lg shadow-md">
        <CardHeader>
          <CardTitle className="text-white">关键词情感排行</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left text-gray-300 border-collapse">
            <thead>
              <tr>
                <th className="pb-2 border-b border-gray-600">关键词</th>
                <th className="pb-2 border-b border-gray-600">情感</th>
                <th className="pb-2 border-b border-gray-600">得分</th>
              </tr>
            </thead>
            <tbody>
              {keywordSentimentRanking.map(({ keyword, sentiment, score }) => (
                <tr key={keyword} className="border-b border-gray-700 hover:bg-white/5 transition">
                  <td className="py-2">{keyword}</td>
                  <td
                    className={`py-2 font-semibold text-opacity-90`}
                    style={{ color: colorSentiment[sentiment] || "#aaa" }}
                  >
                    {sentiment}
                  </td>
                  <td className="py-2">{score.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
