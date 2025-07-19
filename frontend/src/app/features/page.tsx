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
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">🚀 Comprehensive Features</Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Powerful AI-driven
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sentiment Analysis Platform
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            From data collection to deep analysis, trend forecasting to risk alerts — we provide a complete social media sentiment analysis solution.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Core Features</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Multi-Platform Data Collection</CardTitle>
                <CardDescription className="text-gray-300">
                  Supports real-time data collection from 20+ mainstream platforms like Twitter, TikTok, Instagram, Reddit — covering global social sentiments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Real-time data stream processing</li>
                  <li>• Multi-source data integration</li>
                  <li>• Automated deduplication and cleaning</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-white">AI Sentiment Detection</CardTitle>
                <CardDescription className="text-gray-300">
                  Deep learning models powered by BERT and GPT, supporting fine-grained sentiment analysis with up to 95% accuracy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Multi-dimensional sentiment analysis</li>
                  <li>• Sentiment intensity quantification</li>
                  <li>• Sarcasm and implicit sentiment detection</li>
                </ul>
              </CardContent>
            </Card>

 

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-white">Smart Keyword Monitoring</CardTitle>
                <CardDescription className="text-gray-300">
                  Custom keyword and topic monitoring with regex and semantic matching to track brand mentions in real-time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Intelligent keyword expansion</li>
                  <li>• Automatic synonym recognition</li>
                  <li>• Competitor monitoring & comparison</li>
                </ul>
              </CardContent>
            </Card>



            <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-cyan-400 mb-4" />
                <CardTitle className="text-white">Visual Reporting</CardTitle>
                <CardDescription className="text-gray-300">
                  Rich chart types and report templates, with customizable dashboards for instant data insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-400 space-y-2">
                  <li>• Interactive charts</li>
                  <li>• Automated report generation</li>
                  <li>• Multi-format export</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Advanced Features */}
          <h2 className="text-4xl font-bold text-white text-center mb-16">Advanced Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border-red-500/20 backdrop-blur-sm">
              <CardHeader>
                <AlertTriangle className="h-12 w-12 text-red-400 mb-4" />
                <CardTitle className="text-white">Sentiment Risk Alerts</CardTitle>
                <CardDescription className="text-gray-300">
                  Intelligent detection of negative sentiment with multi-level alerting via email, SMS, webhook, and more.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-400">
                    <div className="font-semibold text-white mb-2">Alert Levels</div>
                    <ul className="space-y-1">
                      <li>• Low risk reminder</li>
                      <li>• Medium risk warning</li>
                      <li>• High risk emergency</li>
                    </ul>
                  </div>
                  <div className="text-gray-400">
                    <div className="font-semibold text-white mb-2">Notification Channels</div>
                    <ul className="space-y-1">
                      <li>• Real-time email alerts</li>
                      <li>• SMS notifications</li>
                      <li>• API callbacks</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm">
              <CardHeader>
                <Database className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle className="text-white">Big Data Processing</CardTitle>
                <CardDescription className="text-gray-300">
                  Distributed architecture for massive data processing, with real-time computing engines for millisecond-level response.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-400">
                    <div className="font-semibold text-white mb-2">Processing Capacity</div>
                    <ul className="space-y-1">
                      <li>• 10M+ records per day</li>
                      <li>• Real-time stream processing</li>
                      <li>• Elastic scalability</li>
                    </ul>
                  </div>
                  <div className="text-gray-400">
                    <div className="font-semibold text-white mb-2">Technical Architecture</div>
                    <ul className="space-y-1">
                      <li>• Microservices architecture</li>
                      <li>• Containerized deployment</li>
                      <li>• High availability assurance</li>
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
              <div className="text-white font-semibold mb-1">Sentiment Accuracy</div>
              <div className="text-gray-400 text-sm">Trained on massive multilingual corpora</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-blue-400 mb-2">20+</div>
              <div className="text-white font-semibold mb-1">Supported Platforms</div>
              <div className="text-gray-400 text-sm">Covering mainstream social media</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-green-400 mb-2">10M+</div>
              <div className="text-white font-semibold mb-1">Daily Data Processed</div>
              <div className="text-gray-400 text-sm">Real-time massive data handling</div>
            </div>
            <div className="bg-white/5 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold text-yellow-400 mb-2">99.9%</div>
              <div className="text-white font-semibold mb-1">System Uptime</div>
              <div className="text-gray-400 text-sm">24/7 stable operations</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience the Power?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Sign up now for a free trial of all features — experience the AI-driven social sentiment analysis platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
