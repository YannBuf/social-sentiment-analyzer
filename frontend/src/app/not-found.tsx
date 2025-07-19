"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Home, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white/5 border-white/10 backdrop-blur-sm text-center">
        <CardContent className="p-12">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Brain className="h-12 w-12 text-purple-400" />
            <span className="text-3xl font-bold text-white">SentimentAI</span>
          </div>

          {/* 404 Error */}
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-4">
              404
            </h1>
            <h2 className="text-3xl font-bold text-white mb-4">页面未找到</h2>
            <p className="text-gray-300 text-lg max-w-md mx-auto">
              抱歉，您访问的页面不存在或已被移动。请检查URL是否正确，或返回首页继续浏览。
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              asChild
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                返回首页
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white/10"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              返回上页
            </Button>
          </div>

          {/* Quick Links */}
          <div className="border-t border-white/10 pt-8">
            <h3 className="text-white font-semibold mb-4">您可能在寻找：</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/features"
                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
              >
                <div className="text-sm font-medium">功能特性</div>
                <div className="text-xs text-gray-400">了解产品功能</div>
              </Link>
              <Link
                href="/demo"
                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
              >
                <div className="text-sm font-medium">在线演示</div>
                <div className="text-xs text-gray-400">体验AI分析</div>
              </Link>
              <Link
                href="/pricing"
                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
              >
                <div className="text-sm font-medium">定价方案</div>
                <div className="text-xs text-gray-400">选择合适套餐</div>
              </Link>
              <Link
                href="/support"
                className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
              >
                <div className="text-sm font-medium">技术支持</div>
                <div className="text-xs text-gray-400">获取帮助</div>
              </Link>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-blue-400 mb-2">
              <Search className="h-4 w-4" />
              <span className="text-sm font-medium">搜索建议</span>
            </div>
            <p className="text-gray-300 text-sm">
              如果您无法找到所需内容，请尝试使用不同的关键词搜索，或
              <Link href="/support" className="text-blue-400 hover:text-blue-300 ml-1">
                联系我们的技术支持团队
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
