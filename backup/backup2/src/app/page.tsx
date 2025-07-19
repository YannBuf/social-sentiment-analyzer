import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Brain, Globe, Heart, MessageSquare, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">SentimentAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
                功能特性
              </Link>
              <Link href="#analytics" className="text-gray-300 hover:text-white transition-colors">
                数据分析
              </Link>
              <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                定价方案
              </Link>
              <Button
                variant="outline"
                className="bg-transparent border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
              >
                登录
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                免费试用
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
              🚀 AI驱动的情感分析平台
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              解锁社交媒体的
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                情感密码
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              通过先进的AI技术，实时分析社交媒体情感趋势，洞察用户心声，助力品牌决策和营销策略优化
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3"
              >
                <Zap className="mr-2 h-5 w-5" />
                立即开始分析
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3"
              >
                <BarChart3 className="mr-2 h-5 w-5" />
                查看演示
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">强大的功能特性</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">集成多平台数据源，提供全方位的情感分析解决方案</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">多平台监控</CardTitle>
                <CardDescription className="text-gray-300">
                  支持微博、抖音、小红书等主流社交平台的实时数据采集
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">AI情感识别</CardTitle>
                <CardDescription className="text-gray-300">
                  基于深度学习的中文情感分析模型，准确率高达95%
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">趋势预测</CardTitle>
                <CardDescription className="text-gray-300">智能预测情感趋势变化，提前洞察舆情风险</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">关键词追踪</CardTitle>
                <CardDescription className="text-gray-300">
                  自定义关键词监控，实时追踪品牌提及和话题讨论
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-pink-400 mb-4" />
                <CardTitle className="text-white">用户画像</CardTitle>
                <CardDescription className="text-gray-300">深度分析用户群体特征，构建精准的用户画像</CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-cyan-400 mb-4" />
                <CardTitle className="text-white">可视化报告</CardTitle>
                <CardDescription className="text-gray-300">丰富的图表和报告模板，数据洞察一目了然</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section id="analytics" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">实时数据分析</h2>
            <p className="text-gray-300 text-lg">直观的数据可视化，让情感分析结果一目了然</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Heart className="mr-2 h-5 w-5 text-red-400" />
                  情感分布统计
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400">正面情感</span>
                    <span className="text-white font-bold">68%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{ width: "68%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">中性情感</span>
                    <span className="text-white font-bold">22%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gray-400 h-2 rounded-full" style={{ width: "22%" }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-red-400">负面情感</span>
                    <span className="text-white font-bold">10%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-red-400 h-2 rounded-full" style={{ width: "10%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-blue-400" />
                  热门话题趋势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white">#新品发布</span>
                    <Badge className="bg-green-500/20 text-green-400">+15.2%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white">#用户体验</span>
                    <Badge className="bg-blue-500/20 text-blue-400">+8.7%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white">#品牌活动</span>
                    <Badge className="bg-purple-500/20 text-purple-400">+12.3%</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-white">#客服反馈</span>
                    <Badge className="bg-red-500/20 text-red-400">-3.1%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">准备开始你的情感分析之旅？</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                立即注册，获得7天免费试用，体验AI驱动的社交情感分析平台
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg px-8 py-3"
                >
                  免费开始试用
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3"
                >
                  联系销售团队
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6 text-purple-400" />
                <span className="text-xl font-bold text-white">SentimentAI</span>
              </div>
              <p className="text-gray-400">专业的社交媒体情感分析平台，助力企业洞察用户心声</p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">产品功能</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    情感分析
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    趋势预测
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    用户画像
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    数据报告
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">解决方案</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    品牌监控
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    舆情分析
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    竞品分析
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    危机预警
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">联系我们</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    技术支持
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    商务合作
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API文档
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    开发者社区
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SentimentAI. 保留所有权利。</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
