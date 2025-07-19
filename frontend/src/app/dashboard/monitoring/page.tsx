"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Settings,
  Play,
  Pause,
  Trash2,
  Eye,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Globe,
  Filter,
} from "lucide-react"
import { Navbar } from "@/components/navigation/navbar"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { useState } from "react"

export default function MonitoringPage() {
  const [monitors, setMonitors] = useState([
    {
      id: 1,
      name: "品牌提及监控",
      keywords: ["SentimentAI", "情感分析", "AI分析"],
      platforms: ["微博", "抖音", "小红书"],
      status: "active",
      sentiment: { positive: 68, neutral: 22, negative: 10 },
      mentions: 1247,
      trend: "up",
      lastUpdate: "2分钟前",
    },
    {
      id: 3,
      name: "行业热点",
      keywords: ["人工智能", "机器学习", "NLP"],
      platforms: ["微博", "抖音", "小红书", "知乎"],
      status: "paused",
      sentiment: { positive: 72, neutral: 18, negative: 10 },
      mentions: 2156,
      trend: "up",
      lastUpdate: "1小时前",
    },
  ])

  const user = {
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const handleCreateMonitor = () => {
    console.log("创建新监控...")
  }

  const toggleMonitor = (id: number) => {
    setMonitors((prev) =>
      prev.map((monitor) =>
        monitor.id === id ? { ...monitor, status: monitor.status === "active" ? "paused" : "active" } : monitor,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar isAuthenticated={true} user={user} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">监控中心</h1>
            <p className="text-gray-300">实时监控关键词、品牌提及和话题讨论</p>
          </div>
          <Button
            onClick={handleCreateMonitor}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            创建监控
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500/20">
              监控概览
            </TabsTrigger>
            <TabsTrigger value="keywords" className="data-[state=active]:bg-purple-500/20">
              关键词监控
            </TabsTrigger>
            <TabsTrigger value="brands" className="data-[state=active]:bg-purple-500/20">
              品牌监控
            </TabsTrigger>
          </TabsList>

          {/* 监控概览 */}
          <TabsContent value="overview" className="space-y-6">
            {/* 统计卡片 */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">活跃监控</p>
                      <p className="text-2xl font-bold text-white">8</p>
                    </div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">今日提及</p>
                      <p className="text-2xl font-bold text-white">4,295</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                        <span className="text-green-400 text-sm">+12.5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">正面情感</p>
                      <p className="text-2xl font-bold text-white">68.2%</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                        <span className="text-green-400 text-sm">+2.1%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">预警事件</p>
                      <p className="text-2xl font-bold text-white">3</p>
                      <div className="flex items-center mt-1">
                        <AlertTriangle className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-yellow-400 text-sm">需关注</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 监控列表 */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">监控任务</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="搜索监控任务..."
                        className="pl-10 w-64 bg-white/5 border-white/20 text-white"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
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
                              {monitor.status === "active" ? "运行中" : "已暂停"}
                            </Badge>
                            {monitor.trend === "up" ? (
                              <TrendingUp className="h-4 w-4 text-green-400" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-400" />
                            )}
                          </div>

                          <div className="grid md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">关键词</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {monitor.keywords.slice(0, 2).map((keyword, index) => (
                                  <Badge key={index} className="bg-blue-500/20 text-blue-300 text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                                {monitor.keywords.length > 2 && (
                                  <Badge className="bg-gray-500/20 text-gray-400 text-xs">
                                    +{monitor.keywords.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div>
                              <p className="text-gray-400">监控平台</p>
                              <div className="flex items-center space-x-1 mt-1">
                                <Globe className="h-3 w-3 text-gray-400" />
                                <span className="text-white">{monitor.platforms.length} 个平台</span>
                              </div>
                            </div>

                            <div>
                              <p className="text-gray-400">提及数量</p>
                              <p className="text-white font-semibold">{monitor.mentions.toLocaleString()}</p>
                            </div>

                            <div>
                              <p className="text-gray-400">情感分布</p>
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

                          <p className="text-gray-400 text-xs mt-2">最后更新: {monitor.lastUpdate}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleMonitor(monitor.id)}
                            className="bg-transparent border-white/20 text-white"
                          >
                            {monitor.status === "active" ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent border-red-500/20 text-red-400 hover:bg-red-500/10"
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
          </TabsContent>

          {/* 关键词监控 */}
          <TabsContent value="keywords" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">关键词监控设置</CardTitle>
                <CardDescription className="text-gray-300">添加和管理您想要监控的关键词</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-white">监控名称</Label>
                    <Input placeholder="例如: 品牌提及监控" className="bg-white/5 border-white/20 text-white" />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-white">监控频率</Label>
                    <select className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-white">
                      <option value="realtime">实时监控</option>
                      <option value="hourly">每小时</option>
                      <option value="daily">每日</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-white">关键词列表</Label>
                  <Input placeholder="输入关键词，用逗号分隔" className="bg-white/5 border-white/20 text-white" />
                  <p className="text-gray-400 text-sm">支持正则表达式和同义词扩展</p>
                </div>

                <div className="space-y-4">
                  <Label className="text-white">监控平台</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["微博", "抖音", "小红书", "知乎", "B站", "微信公众号", "今日头条", "百度贴吧"].map((platform) => (
                      <label key={platform} className="flex items-center space-x-2 text-white">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500">创建关键词监控</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 品牌监控 */}
          <TabsContent value="brands" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">品牌监控</CardTitle>
                <CardDescription className="text-gray-300">监控品牌提及、口碑和用户反馈</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-400">
                  <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>品牌监控功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
