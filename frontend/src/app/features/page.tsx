import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Globe, TrendingUp, MessageSquare, Users, BarChart3, AlertTriangle, Database } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">🚀 全面的功能特性</Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            强大的AI驱动
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              情感分析平台
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            从数据采集到深度分析，从趋势预测到风险预警，我们提供完整的社交媒体情感分析解决方案
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">核心功能</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">多平台数据采集</CardTitle>
                <CardDescription className="text-gray-300">
                  支持微博、抖音、小红书、知乎等20+主流社交平台的实时数据采集，覆盖全网舆情
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 实时数据流处理</li>
                  <li>• 多源数据整合</li>
                  <li>• 自动去重和清洗</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">AI情感识别</CardTitle>
                <CardDescription className="text-gray-300">
                  基于BERT和GPT的深度学习模型，支持中文情感细粒度分析，准确率高达95%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 多维度情感分析</li>
                  <li>• 情感强度量化</li>
                  <li>• 讽刺和隐含情感识别</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-white">趋势预测分析</CardTitle>
                <CardDescription className="text-gray-300">
                  基于时间序列分析和机器学习算法，预测情感趋势变化，提前洞察舆情风险
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 7天趋势预测</li>
                  <li>• 异常检测算法</li>
                  <li>• 季节性分析</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">智能关键词监控</CardTitle>
                <CardDescription className="text-gray-300">
                  自定义关键词和话题监控，支持正则表达式和语义匹配，实时追踪品牌提及
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 智能关键词扩展</li>
                  <li>• 同义词自动识别</li>
                  <li>• 竞品监控对比</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-pink-400 mb-4" />
                <CardTitle className="text-white">用户画像分析</CardTitle>
                <CardDescription className="text-gray-300">
                  深度分析用户群体特征，构建多维度用户画像，洞察目标受众偏好
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 人口统计学分析</li>
                  <li>• 兴趣偏好挖掘</li>
                  <li>• 行为模式识别</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-cyan-400 mb-4" />
                <CardTitle className="text-white">可视化报告</CardTitle>
                <CardDescription className="text-gray-300">
                  丰富的图表类型和报告模板，支持自定义仪表板，数据洞察一目了然
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• 交互式图表</li>
                  <li>• 自动报告生成</li>
                  <li>• 多格式导出</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Features */}
          <h2 className="text-4xl font-bold text-white text-center mb-16">高级功能</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20 backdrop-blur-sm">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
                <CardTitle className="text-white">舆情预警系统</CardTitle>
                <CardDescription className="text-gray-300">
                  智能识别负面舆情，多级预警机制，支持邮件、短信、webhook等多种通知方式
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-400">
                    <div className="font-semibold text-white mb-2">预警级别</div>
                    <ul className="space-y-1">
                      <li>• 低风险提醒</li>
                      <li>• 中风险警告</li>
                      <li>• 高风险紧急</li>
                    </ul>
                  </div>
                  <div className="text-gray-400">
                    <div className="font-semibold text-white mb-2">通知方式</div>
                    <ul className="space-y-1">
                      <li>• 实时邮件通知</li>
                      <li>• 短信预警</li>
                      <li>• API回调</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm">
              <CardHeader>
                <Database className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">大数据处理</CardTitle>
                <CardDescription className="text-gray-300">
                  分布式架构支持海量数据处理，实时计算引擎确保毫秒级响应
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-400">
                    <div className="font-semibold text-white mb-2">处理能力</div>
                    <ul className="space-y-1">
                      <li>• 千万级数据/天</li>
                      <li>• 实时流处理</li>
                      <li>• 弹性扩容</li>
                    </ul>
                  </div>
                  <div className="text-gray-400">
                    <div className="font-semibold text-white mb-2">技术架构</div>
                    <ul className="space-y-1">
                      <li>• 微服务架构</li>
                      <li>• 容器化部署</li>
                      <li>• 高可用保障</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-purple-400 mb-2">95%</div>
              <div className="text-white font-semibold mb-1">情感识别准确率</div>
              <div className="text-gray-400 text-sm">基于大规模中文语料训练</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-blue-400 mb-2">20+</div>
              <div className="text-white font-semibold mb-1">支持平台数量</div>
              <div className="text-gray-400 text-sm">覆盖主流社交媒体</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-green-400 mb-2">1000万+</div>
              <div className="text-white font-semibold mb-1">日处理数据量</div>
              <div className="text-gray-400 text-sm">实时处理海量数据</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-yellow-400 mb-2">99.9%</div>
              <div className="text-white font-semibold mb-1">系统可用性</div>
              <div className="text-gray-400 text-sm">7x24小时稳定运行</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">准备体验强大的功能？</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            立即注册，免费试用所有功能，体验AI驱动的社交情感分析平台
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Link href="/signup">免费开始试用</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
              <Link href="/demo">查看产品演示</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
