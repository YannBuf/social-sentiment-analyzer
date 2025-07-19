"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Zap,
  Shield,
  BarChart3,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  MessageSquare,
  Heart,
  Target,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"
import { useAuth } from "./contexts/authcontext"
import { useContext } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()

  const handleStartClick = () => {
    if(!user) {
      router.push("/login")
    } else {
      router.push("/search-analysis?from=home")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar isAuthenticated={false} forceMode="public" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">
              🚀 	AI-powered Sentiment Analysis Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Intelligent Understand{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                 Social Sentiment
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
              Leverage cutting-edge AI to monitor social sentiment trends, Supports major social media platforms like Twitter, TikTok, Instagram.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                onClick={handleStartClick}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
              >
                  Start Analysis Now
                  <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 px-8 py-3"
                asChild
              >
                <Link href="/demo">View Demo</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Why Choose Our Platform?</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">	Integrated multi-platform data and insightful analytics</p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <Brain className="h-6 w-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-white">AI-powered Analysis</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Machine learning-based emotion recognition with up to 95% accuracy, supporting multi-language and complex context analysis
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <Globe className="h-6 w-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">	Multi-Platform Coverage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Supports major social media platforms like Twitter, TikTok, Instagram
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <Zap className="h-6 w-6 text-green-400" />
                    </div>
                    <CardTitle className="text-white">Real-time Monitoring</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    24/7 real-time data collection and analysis, the first time to find changes in public opinion, timely warning of risks
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-yellow-400" />
                    </div>
                    <CardTitle className="text-white">Visualized Reports</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Rich charts and data visualizations to visualize sentiment trends and key metrics
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-500/20 rounded-lg">
                      <Shield className="h-6 w-6 text-red-400" />
                    </div>
                    <CardTitle className="text-white">Data Security</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Enterprise-grade data encryption and privacy protection, compliant with international data protection standards such as GDPR
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-500/20 rounded-lg">
                      <Users className="h-6 w-6 text-pink-400" />
                    </div>
                    <CardTitle className="text-white">Team Collaboration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    Supports multi-user collaboration, permission management, team sharing of analytics and insight reports
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-32 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Data Speaks</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">Trusted by thousands of businesses</p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">10M+</div>
                <div className="mt-2 text-gray-300">Daily Processed Data Volume</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">95%</div>
                <div className="mt-2 text-gray-300">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">500+</div>
                <div className="mt-2 text-gray-300">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">24/7</div>
                <div className="mt-2 text-gray-300">Real-time Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Use Cases</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">Applicable to various business scenarios</p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Target className="h-8 w-8 text-purple-400" />
                    <CardTitle className="text-white text-xl">Brand Monitoring</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-300">
                    Monitor brand mentions and feedback in real time
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Brand mention tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Competitor benchmarking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Crisis alert system</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="h-8 w-8 text-blue-400" />
                    <CardTitle className="text-white text-xl">Product Feedback</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-300">
                    Analyze user feedback to optimize product development
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">User satisfaction analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Feature demand mining</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Issue identification</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-8 w-8 text-green-400" />
                    <CardTitle className="text-white text-xl">Marketing Performance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-300">
                    Evaluate campaign performance and optimize strategy
                  </CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Campaign performance evaluation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Content performance analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Audience sentiment insights</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-8 w-8 text-pink-400" />
                    <CardTitle className="text-white text-xl">Customer Service</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-300">Monitor and improve customer support</CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Service quality tracking</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Customer sentiment analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Complaint handling optimization</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Testimonials</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">See what our clients are saying</p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "This platform helped us detect a potential brand crisis early"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">D</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">David C. Bonnell</p>
                      <p className="text-gray-400 text-sm">A well-known e-commerce brand</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">
                    "Great data visualization and useful collaboration tools"
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">A</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Angel D. Shelley</p>
                      <p className="text-gray-400 text-sm">Internet technology company</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"Fast support response and reliable platform performance"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">Z</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">Mr. Zhang</p>
                      <p className="text-gray-400 text-sm">Traditional manufacturing companies</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Get Started?</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">Experience AI-powered sentiment insights for better decisions</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3"
                asChild
              >
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white/20 text-white hover:bg-white/10 px-8 py-3"
                asChild
              >
                <Link href="/contact-sales">Contact Sales Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
