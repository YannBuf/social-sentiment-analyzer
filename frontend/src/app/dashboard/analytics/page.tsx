"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Filter,
  Heart,
  MessageSquare,
  Users,
  Globe,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
} from "lucide-react"

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { Navbar } from "@/components/navigation/navbar"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import SentimentAnalysis from "@/components/analytics/SentimentAnalysis"
import TrendAnalysis from "@/components/analytics/TrendAnalysis"
import PlatformAnalysis from "@/components/analytics/PlatformAnalysis"
import KeywordAnalysis from "@/components/analytics/KeywordAnalysis"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react"

export default function AnalyticsPage() {
  const user = {
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const searchParams = useSearchParams()
  const monitorId = searchParams.get('monitorId')
  const [analysisData, setAnalysisData] = useState<any>(null)

  useEffect(() => {
    if (!monitorId) return

    const fetchAnalysis = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/monitor/${monitorId}/analysis`)
        if (res.ok) {
          const data = await res.json()
          setAnalysisData(data)
        }
      } catch (err) {
        console.error("获取分析数据失败", err)
      }
    }

    fetchAnalysis()
  }, [monitorId])

  const overview = analysisData?.overview || {}
  const sentimentDistribution = analysisData?.sentimentDistribution || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar isAuthenticated={true} user={user} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">数据分析报告</h1>
            <p className="text-gray-300">深度洞察情感趋势和用户行为</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="bg-transparent border-white/20 text-white">
              <Calendar className="mr-2 h-4 w-4" />
              时间范围
            </Button>
            <Button variant="outline" className="bg-transparent border-white/20 text-white">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Download className="mr-2 h-4 w-4" />
              导出报告
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/4 border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500/20">
              总览
            </TabsTrigger>
            <TabsTrigger value="sentiment" className="data-[state=active]:bg-purple-500/20">
              情感分析
            </TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-purple-500/20">
              平台分析
            </TabsTrigger>
            <TabsTrigger value="keywords" className="data-[state=active]:bg-purple-500/20">
              关键词分析
            </TabsTrigger>
          </TabsList>

          {/* 总览 */}
          <TabsContent value="overview" className="space-y-6">
            {/* 关键指标 */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">总提及量</p>
                      <p className="text-2xl font-bold text-white">{overview.totalMentions ?? "--"}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                        <span className="text-green-400 text-sm">
                          {overview.mentionChangePercent ? `+${overview.mentionChangePercent}%` : "--"}
                        </span>
                      </div>
                    </div>
                    <MessageSquare className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">情感得分</p>
                      <p className="text-2xl font-bold text-white">{overview.sentimentScore ?? "--"}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                        <span className="text-green-400 text-sm">
                          {overview.sentimentScoreChange ? `+${overview.sentimentScoreChange}` : "--"}
                        </span>
                      </div>
                    </div>
                    <Heart className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">活跃用户</p>
                      <p className="text-2xl font-bold text-white">{overview.activeUsers ?? "--"}</p>
                      <div className="flex items-center mt-1">
                        {overview.activeUsersChangePercent && overview.activeUsersChangePercent < 0 ? (
                          <>
                            <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                            <span className="text-red-400 text-sm">{overview.activeUsersChangePercent}%</span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                            <span className="text-green-400 text-sm">{overview.activeUsersChangePercent ?? "--"}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">覆盖平台</p>
                      <p className="text-2xl font-bold text-white">{overview.platformCount ?? "--"}</p>
                      <div className="flex items-center mt-1">
                        <Globe className="h-4 w-4 text-blue-400 mr-1" />
                        <span className="text-blue-400 text-sm">{overview.platformLabel ?? "--"}</span>
                      </div>
                    </div>
                    <Globe className="h-8 w-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 图表区域 */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <LineChartIcon className="mr-2 h-5 w-5" />
                    情感趋势图
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analysisData?.sentimentTrend ? (
                    <div style={{ width: "100%", height: 300 }}>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsLineChart
                          data={analysisData.sentimentTrend}
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
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <LineChartIcon className="h-12 w-12 mx-auto mb-4" />
                        <p>情感趋势图表</p>
                        <p className="text-sm">（集成图表库后显示）</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChartIcon className="mr-2 h-5 w-5" />
                    情感分布
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {sentimentDistribution ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <span className="text-gray-300">正面情感</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-green-400 h-2 rounded-full"
                              style={{ width: `${sentimentDistribution.positivePercent ?? 0}%` }}
                            ></div>
                          </div>
                          <span className="text-white font-bold w-12">{sentimentDistribution.positivePercent ?? 0}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                          <span className="text-gray-300">中性情感</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gray-400 h-2 rounded-full"
                              style={{ width: `${sentimentDistribution.neutralPercent ?? 0}%` }}
                            ></div>
                          </div>
                          <span className="text-white font-bold w-12">{sentimentDistribution.neutralPercent ?? 0}%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <span className="text-gray-300">负面情感</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-red-400 h-2 rounded-full"
                              style={{ width: `${sentimentDistribution.negativePercent ?? 0}%` }}
                            ></div>
                          </div>
                          <span className="text-white font-bold w-12">{sentimentDistribution.negativePercent ?? 0}%</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>暂无情感分布数据</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 其他标签页内容 */}
          <TabsContent value="sentiment" className="space-y-6">
            <SentimentAnalysis monitorId={monitorId} analysisData={analysisData} />
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <PlatformAnalysis />
          </TabsContent>

          <TabsContent value="keywords" className="space-y-6">
            <KeywordAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
