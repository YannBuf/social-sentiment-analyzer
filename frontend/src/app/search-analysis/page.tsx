"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Brain, Download, Share2, MessageSquare, Heart, BarChart3, Zap } from "lucide-react"
import { Navbar } from "@/components/navigation/navbar"
import { Breadcrumb } from "@/components/navigation/breadcrumb"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/app/contexts/authcontext"



import { SearchConfigPanel } from "@/components/searchanalysispage/SearchConfigPanel"
import { SearchProgressPanel } from "@/components/searchanalysispage/SearchProgressPanel"
import { SearchResultsPreview } from "@/components/searchanalysispage/SearchResultsPreview"
import { AIAnalysisPanel } from "@/components/searchanalysispage/AIAnalysisPanel"
import { QuickStatsCard } from "@/components/searchanalysispage/QuickStatsCard"
import { SearchHistorySection } from "@/components/searchanalysispage/SearchHistorySection"
import { AIInsightsCard } from "@/components/searchanalysispage/AIInsightsCard"
import { OverallSentimentCard } from "@/components/searchanalysispage/OverallSentimentCard"
import SingleTextAnalysisPanel from "@/components/searchanalysispage/SingleTextAnalysisPanel"
import { DateRange } from "react-day-picker"
import { useEffect } from "react"





interface SearchResult {
  id: string
  platform: string
  content: string
  author: string
  publishTime: string
  likes: number
  comments: number
  shares: number
  url: string
}

interface AnalysisResult {
  overall_sentiment: {
    label: string
    confidence: number
    score: number
  }
  emotions: {
    joy: number
    anger: number
    fear: number
    sadness: number
    surprise: number
    trust: number
    anticipation: number
    disgust: number
  }
  keywords: string[]
  topics: string[]
  summary: string
  insights: string[]
  recommendations: string[]
}

// Only for single text analysis result
interface SingleAnalysisResult {
  sentiment: string;
  confidence: number; // 0~100
  emotions: Record<string, number>;
  keywords: string[];
}

interface SearchHistoryItem {
  id: string | number;
  query: string;
  timestamp: string;
  resultsCount: number;
  sentiment: string; // 这里是映射后的"positive"/"negative"/"neutral"
  platforms: string[];
  [key: string]: any; // 兼容其他字段
}

interface SearchHistoryStateItem {
  id: string | number;
  query: string;
  timestamp: string;
  resultsCount: number;
  sentiment: string;
  platforms: string[];
}


export default function SearchAnalysisPage() {
  const { user, logout } = useAuth()
  
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["reddit"]);
  const [isSearching, setIsSearching] = useState(false)
  const [searchProgress, setSearchProgress] = useState(0)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [searchHistory, setSearchHistory] = useState<SearchHistoryStateItem[]>([
    {
      id: 1,
      query: "人工智能发展趋势",
      timestamp: "2024-01-15 14:30:25",
      resultsCount: 156,
      sentiment: "positive",
      platforms: ["微博", "抖音"],
    },
    {
      id: 2,
      query: "新能源汽车市场",
      timestamp: "2024-01-15 13:45:10",
      resultsCount: 89,
      sentiment: "neutral",
      platforms: ["小红书", "知乎"],
    },
  ])
  const [inputText, setInputText] = useState("")
  const [selectedTab, setSelectedTab] = useState("search");
  const token = localStorage.getItem("token")

  // Only for single text analysis result
  const [singleAnalysisResult, setSingleAnalysisResult] = useState<SingleAnalysisResult | null>(null);

  // For time range selecting
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date(),
  })


  // 检测来源以确定导航栏模式
  const from = searchParams ? searchParams.get("from") : null
  const isFromDashboard = from === "dashboard"
  const isAuthenticated = true // 假设用户已登录，实际应该从认证状态获取
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

  const platforms = [
    { id: "reddit", name: "Reddit", icon: "👽" },
    { id: "facebook", name: "Facebook", icon: "📘" },
    { id: "youtube", name: "YouTube", icon: "📺" },
    { id: "twitter", name: "Twitter (X)", icon: "🐦" },
    { id: "instagram", name: "Instagram", icon: "📸" },
    { id: "tiktok", name: "TikTok", icon: "🎵" },
  ]

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }
  const displayUser = {
    name: user?.username || user?.email || "匿名用户",
    email: user?.email || "",
    avatar: "/placeholder.svg?height=32&width=32",
  }


const formatDate = (date: Date) => date.toISOString().split("T")[0];
const handleSearch = async () => {
  if (!searchQuery.trim() || selectedPlatforms.length === 0) return;

  console.log("✅ 当前选择的平台", selectedPlatforms);
  console.log("🧪 请求参数：", {
    query: searchQuery,
    platforms: selectedPlatforms,
    since: dateRange?.from ? formatDate(dateRange.from) : undefined,
    until: dateRange?.to ? formatDate(dateRange.to) : undefined,
  });

  setIsSearching(true);
  setSearchProgress(0);
  setSearchResults([]);     // 清空旧数据
  setAnalysisResult(null);  // 清空旧分析结果

  try {
    const res = await fetch(`${API_BASE}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: searchQuery,
        platforms: selectedPlatforms,
        limit: 50,
        since: dateRange?.from ? formatDate(dateRange.from) : undefined,
        until: dateRange?.to ? formatDate(dateRange.to) : undefined,
      }),
    });

    if (!res.ok) throw new Error("搜索接口调用失败");

    const data = await res.json();
    console.log("🔥 接口返回原始数据:", data);

    const mappedResults: SearchResult[] = data.results.map((item: any) => ({
      id: item.id ?? item.url ?? crypto.randomUUID(),
      platform: item.platform,
      content: item.content,
      author: item.author,
      publishTime: item.publish_time
        ? new Date(item.publish_time).toLocaleString("zh-CN", {
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "未知时间",
      likes: item.likes ?? 0,
      comments: item.comments ?? 0,
      shares: item.shares ?? 0,
      url: item.url ?? "",
    }));

    console.log("📦 映射后的结果:", mappedResults);
    setSearchResults(mappedResults); // ✅ 立刻设置搜索结果

  } catch (e) {
    console.error("搜索接口错误", e);
    alert("搜索失败，请稍后重试");
  }

  // 启动进度动画（可选）
  const interval = setInterval(() => {
    setSearchProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval);
        setIsSearching(false);
        return 100;
      }
      return prev + 10;
    });
  }, 200);
};

const fetchSearchHistory = async () => {
  const token = localStorage.getItem("token")
  const res = await fetch(`${API_BASE}/search_history`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const raw = await res.json()

  const data: SearchHistoryItem[] = (Array.isArray(raw) ? raw : raw.data || []).map((item: any) => ({
    ...item,
    sentiment:
      item.sentiment === "正面"
        ? "positive"
        : item.sentiment === "负面"
        ? "negative"
        : "neutral",
  }))

  setSearchHistory(data)
}

// 其他函数也加类型声明
const handleViewHistory = async (item: SearchHistoryItem) => {
  try {
    const res = await fetch(`${API_BASE}/search_history/${item.id}/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error("获取详情失败");
    const data = await res.json();

    setSearchQuery(data.search_history.query);
    setSearchResults(data.search_history.search_results || []);
    setAnalysisResult(data.analysis_result);
    setSelectedTab("results");
    console.log("历史详情数据", data);
  } catch (error) {
    console.error("加载历史详情失败", error);
    alert("加载历史详情失败，请稍后重试");
  }
};


const handleReanalyzeHistory = async (item: SearchHistoryItem) => {
  const res = await fetch(`${API_BASE}/search_history/${item.id}/reanalyze`, {
    method: "POST"
  })
  const data = await res.json()
  alert("重新分析已完成")
  fetchSearchHistory()
}


const handleDownloadHistory = async (item: SearchHistoryItem) => {
  const res = await fetch(`${API_BASE}/api/search_history/${item.id}/download`)
  const blob = await res.blob()
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `search_history_${item.id}.json`
  document.body.appendChild(link)
  link.click()
  link.remove()
}




// 监听 analysisResult 变化，方便调试打印
useEffect(() => {
  if (analysisResult) {
    console.log("analysisResult 发生变化：", analysisResult);
  }
}, [analysisResult]);

useEffect(() => {
  fetchSearchHistory()
}, [])


const handleAnalyze = async () => {
  if (searchResults.length === 0) return;

  setIsAnalyzing(true);
  setAnalysisProgress(0);

  try {
    const res = await fetch(`${API_BASE}/smart_search_analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: searchQuery,
        platforms: selectedPlatforms,
        searchResults: searchResults.map((item) => ({
          id: item.id,
          platform: item.platform,
          content: item.content,
          author: item.author,
          publishTime: new Date(item.publishTime).toISOString(),
          likes: item.likes,
          comments: item.comments,
          shares: item.shares,
          url: item.url,
        })),
      }),
    });

    if (!res.ok) throw new Error("分析接口调用失败");

    const fetchedAnalysis = await res.json();

    setAnalysisResult(fetchedAnalysis);

    // 保存到后端数据库
    const saveRes = await fetch(`${API_BASE}/search_history`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
       },
      body: JSON.stringify({
        user_id: user?.id,    // ✅ 需要确保 user 有 id
        query: searchQuery,
        results_count: searchResults.length,
        sentiment: fetchedAnalysis.overall_sentiment.label,
        platforms: selectedPlatforms,
        analysis_result: fetchedAnalysis,
        search_results: searchResults,
      }),
    });

    if (!saveRes.ok) {
      console.error("保存搜索历史失败");
    } else {
      console.log("✅ 搜索历史已保存");
      fetchSearchHistory();  // 刷新前端历史列表
    }

  } catch (error) {
    console.error("分析接口错误", error);
    alert("分析失败，请稍后重试");
  } finally {
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  }
};




const handleSingleAnalyze = async () => {
  if (!inputText.trim()) return;
  
  setIsAnalyzing(true);
  setSingleAnalysisResult(null);

  try {
    const response = await fetch(`${API_BASE}/sentence_analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Analysis failed");
    }

    const data = await response.json();
    setSingleAnalysisResult(data);

  } catch (error) {
    console.error("Analysis error:", error);
    alert("Analysis failed, please try again later.");
  } finally {
    setIsAnalyzing(false);
  }
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar
        isAuthenticated={!!user}
        user={user ? displayUser : undefined}
        onLogout={logout}
        forceMode="dashboard" // ✅ 加上这个
      />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Smart Search Analytics</h1>
          <p className="text-gray-300">Enter keywords and AI automatically searches to crawl relevant content and perform in-depth sentiment analysis</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
            <TabsTrigger value="single" className="data-[state=active]:bg-purple-500/20">
              Single Text Analysis
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-purple-500/20">
              Smart Search
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-purple-500/20">
              Search results
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-500/20">
              Search History
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
                    Text input
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Input the text you want to analyze
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Please enter the text content to be analyzed, for example: the user experience of this product is really great, the interface design is simple and beautiful, the function is also very practical, highly recommended to everyone!"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-40 bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{inputText.length}/5000 characters</span>
                    <Button
                      onClick={handleSingleAnalyze}
                      disabled={!inputText.trim() || isAnalyzing}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Zap className="mr-2 h-4 w-4" />
                          Start analysis
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 分析结果 */}
              <SingleTextAnalysisPanel results={singleAnalysisResult} />
            </div>

            {/* 示例文本 */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Try these sample texts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card
                    className="bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all"
                    onClick={() =>
                      setInputText("The user experience of this product is really great, the interface design is simple and beautiful, the function is also very practical, highly recommended to everyone!")
                    }
                  >
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-green-500/20 text-green-400">Postive example</Badge>
                      <p className="text-gray-300 text-sm">
                        "The user experience of this product is really great, the interface design is simple and beautiful, the function is also very practical, highly recommended to everyone!"
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className="bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all"
                    onClick={() => setInputText("Very poor customer service, problems can't be solved, wasted a lot of my time, very disappointed.")}
                  >
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-red-500/20 text-red-400">Negative examples</Badge>
                      <p className="text-gray-300 text-sm">
                        "Very poor customer service, problems can't be solved, wasted a lot of my time, very disappointed."
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className="bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all"
                    onClick={() => setInputText("The report consists of five sections, each covering a different aspect of the study.")}
                  >
                    <CardContent className="p-4">
                      <Badge className="mb-2 bg-gray-500/20 text-gray-400">Neutral example</Badge>
                      <p className="text-gray-300 text-sm">"The report consists of five sections, each covering a different aspect of the study."</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 其他标签页内容保持不变... */}
          {/* 智能搜索 */}
          <TabsContent value="search" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* SearchConfigPanel */}
              <div className="lg:col-span-2 space-y-6">
                <SearchConfigPanel
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedPlatforms={selectedPlatforms}
                  platforms={platforms}
                  handlePlatformToggle={handlePlatformToggle}
                  handleSearch={handleSearch}
                  isSearching={isSearching}
                  dateRange={dateRange}
                  setDateRange={setDateRange}       
                  
              />                

                {/* 搜索进度 */}
                <SearchProgressPanel
                  isSearching={isSearching}
                  searchProgress={searchProgress}
                  selectedPlatforms={selectedPlatforms}
                  platforms={platforms}
                />

                {/* 搜索结果预览 */}
                <SearchResultsPreview searchResults={searchResults} />

              </div>

              {/* 侧边栏 */}
              <div className="space-y-6">
                {/* AI分析 */}
                <AIAnalysisPanel
                  searchResultsLength={searchResults.length}
                  isAnalyzing={isAnalyzing}
                  analysisProgress={analysisProgress}
                  onAnalyze={handleAnalyze}
                />                

                {/* 快速统计 */}
                {searchResults.length > 0 && (
                  <QuickStatsCard
                    resultsCount={searchResults.length}
                    platformsCount={selectedPlatforms.length}
                    totalInteractions={searchResults.reduce(
                      (sum, result) => sum + result.likes + result.comments,
                      0
                    )}
                  />
                )}
              </div>
            </div>
          </TabsContent>

          {/* 搜索结果和分析 */}
          <TabsContent value="results" className="space-y-6">
            {analysisResult ? (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* 分析结果 */}
                <div className="lg:col-span-2 space-y-6">
                  {/* 总体情感 */}
                  <OverallSentimentCard
                  label={analysisResult.overall_sentiment.label}
                  score={analysisResult.overall_sentiment.score}
                  confidence={analysisResult.overall_sentiment.confidence}
                  />

                  {/* AI洞察 */}
                  <AIInsightsCard
                    summary={analysisResult.summary}
                    insights={analysisResult.insights}
                    recommendations={analysisResult.recommendations}
                  />                  
                </div>

                {/* 侧边栏 */}
                <div className="space-y-6">
                  {/* 关键词云 */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Keywords</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywords.map((keyword, index) => (
                          <Badge key={index} className="bg-blue-500/20 text-blue-300">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 话题分类 */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Topic Classification</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {analysisResult.topics.map((topic, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* 数据来源 */}
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Data sources</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Search Keywords</span>
                          <Badge className="bg-purple-500/20 text-purple-300">{searchQuery}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Number of Data Entries</span>
                          <span className="text-white font-bold">{searchResults.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Analysis time</span>
                          <span className="text-white text-sm">{new Date().toLocaleString("zh-CN")}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-12 text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400 opacity-50" />
                  <h3 className="text-white text-xl font-semibold mb-2">No analysis available</h3>
                  <p className="text-gray-300 mb-6">Please search and complete the AI analysis first</p>
                  <Button
                    onClick={() => (window.location.hash = "#search")}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    Start search analysis
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* 搜索历史 */}
          <TabsContent value="history" className="space-y-6">
            <SearchHistorySection 
              history={searchHistory} 
              onView={handleViewHistory}
              onReanalyze={handleReanalyzeHistory}
              onDownload={handleDownloadHistory}
            />
          </TabsContent>


        </Tabs>
      </div>
    </div>
  )
}
