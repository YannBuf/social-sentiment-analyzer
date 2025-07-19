"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Upload,
  FileText,
  Zap,
  Download,
  Share2,
  BarChart3,
  TrendingUp,
  Heart,
  MessageSquare,
  Users,
  Clock,
  Target,
} from "lucide-react"
import { Navbar } from "@/components/navigation/navbar"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { useState } from "react"

export default function AnalyzePage() {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [analysisHistory, setAnalysisHistory] = useState([
    {
      id: 1,
      text: "这个产品的用户体验真的很棒...",
      sentiment: "positive",
      confidence: 0.87,
      timestamp: "2024-01-15 14:30:25",
    },
    {
      id: 2,
      text: "客服态度很差，问题解决不了...",
      sentiment: "negative",
      confidence: 0.92,
      timestamp: "2024-01-15 14:25:10",
    },
  ])

  const user = {
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  }

  const handleAnalyze = () => {
    if (!inputText.trim()) return

    setIsAnalyzing(true)
    setTimeout(() => {
      const newResult = {
        id: Date.now(),
        text: inputText,
        sentiment: "positive",
        confidence: 0.87,
        emotions: {
          joy: 0.65,
          trust: 0.72,
          anticipation: 0.45,
          surprise: 0.23,
          fear: 0.12,
          anger: 0.08,
          sadness: 0.15,
          disgust: 0.05,
        },
        keywords: ["产品", "体验", "满意", "推荐"],
        entities: ["产品", "用户体验", "界面设计"],
        timestamp: new Date().toLocaleString("zh-CN"),
      }
      setResults(newResult)
      setAnalysisHistory((prev) => [newResult, ...prev])
      setIsAnalyzing(false)
    }, 2000)
  }

  const handleBatchAnalyze = () => {
    // 模拟批量分析
    console.log("开始批量分析...")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar isAuthenticated={true} user={user} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">情感分析工作台</h1>
          <p className="text-gray-300">强大的AI驱动文本情感分析工具</p>
        </div>

        <Tabs defaultValue="single" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/5 border-white/10">
            <TabsTrigger value="single" className="data-[state=active]:bg-purple-500/20">
              单文本分析
            </TabsTrigger>
            <TabsTrigger value="batch" className="data-[state=active]:bg-purple-500/20">
              批量分析
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-500/20">
              分析历史
            </TabsTrigger>
          </TabsList>

          {/* 单文本分析 */}
          <TabsContent value="single" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 输入区域 */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    文本输入
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    输入您想要分析的文本内容，支持中文、英文等多种语言
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="请输入要分析的文本内容..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-40 bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{inputText.length}/5000 字符</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="bg-transparent border-white/20 text-white">
                        <Upload className="mr-2 h-4 w-4" />
                        上传文件
                      </Button>
                      <Button
                        onClick={handleAnalyze}
                        disabled={!inputText.trim() || isAnalyzing}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            分析中...
                          </>
                        ) : (
                          <>
                            <Zap className="mr-2 h-4 w-4" />
                            开始分析
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 分析结果 */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <div className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      分析结果
                    </div>
                    {results && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!results ? (
                    <div className="text-center py-12 text-gray-400">
                      <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>请输入文本并点击"开始分析"查看结果</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* 整体情感 */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-3 flex items-center">
                          <Heart className="mr-2 h-4 w-4" />
                          整体情感倾向
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                            <div>
                              <p className="text-white font-semibold">正面情感</p>
                              <p className="text-gray-400 text-sm">置信度: {(results.confidence * 100).toFixed(1)}%</p>
                            </div>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400">积极</Badge>
                        </div>
                      </div>

                      {/* 情感细分 */}
                      <div className="bg-white/5 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-3">情感细分分析</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(results.emotions).map(([emotion, value]) => (
                            <div key={emotion} className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm">{emotion}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-700 rounded-full h-1.5">
                                  <div
                                    className="bg-purple-400 h-1.5 rounded-full"
                                    style={{ width: `${value * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-white text-xs w-8">{(value * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 关键词和实体 */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-3">关键词</h3>
                          <div className="flex flex-wrap gap-2">
                            {results.keywords.map((keyword, index) => (
                              <Badge key={index} className="bg-blue-500/20 text-blue-300">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <h3 className="text-white font-semibold mb-3">实体识别</h3>
                          <div className="flex flex-wrap gap-2">
                            {results.entities.map((entity, index) => (
                              <Badge key={index} className="bg-purple-500/20 text-purple-300">
                                {entity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 批量分析 */}
          <TabsContent value="batch" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  批量文本分析
                </CardTitle>
                <CardDescription className="text-gray-300">上传CSV、Excel或TXT文件进行批量情感分析</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 文件上传区域 */}
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-white mb-2">拖拽文件到此处或点击上传</p>
                  <p className="text-gray-400 text-sm mb-4">支持 CSV, Excel, TXT 格式，最大 10MB</p>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500">选择文件</Button>
                </div>

                {/* 分析设置 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <Label className="text-white">文本列名</Label>
                    <Input
                      placeholder="例如: content, text, message"
                      className="bg-white/5 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-white">分析模式</Label>
                    <select className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-white">
                      <option value="standard">标准分析</option>
                      <option value="detailed">详细分析</option>
                      <option value="fast">快速分析</option>
                    </select>
                  </div>
                </div>

                <Button onClick={handleBatchAnalyze} className="w-full bg-gradient-to-r from-purple-500 to-pink-500">
                  开始批量分析
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 分析历史 */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    分析历史
                  </div>
                  <Button variant="outline" className="bg-transparent border-white/20 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    导出全部
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisHistory.map((item) => (
                    <div key={item.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-white mb-2">{item.text.substring(0, 100)}...</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {item.timestamp}
                            </span>
                            <Badge
                              className={
                                item.sentiment === "positive"
                                  ? "bg-green-500/20 text-green-400"
                                  : item.sentiment === "negative"
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-gray-500/20 text-gray-400"
                              }
                            >
                              {item.sentiment === "positive" ? "正面" : item.sentiment === "negative" ? "负面" : "中性"}
                            </Badge>
                            <span>置信度: {(item.confidence * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            查看详情
                          </Button>
                          <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* 快速统计 */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-gray-400 text-sm">今日分析量</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">68.2%</p>
              <p className="text-gray-400 text-sm">正面情感占比</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">94.5%</p>
              <p className="text-gray-400 text-sm">平均准确率</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">15,892</p>
              <p className="text-gray-400 text-sm">累计分析量</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
