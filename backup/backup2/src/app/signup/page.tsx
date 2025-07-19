import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Brain, Mail, Lock, User, Github } from 'lucide-react'
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Brain className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">SentimentAI</span>
          </div>
          <CardTitle className="text-2xl text-white">创建账户</CardTitle>
          <CardDescription className="text-gray-300">
            注册免费账户，开始您的情感分析之旅
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">姓名</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="您的姓名"
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">邮箱地址</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">密码</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="至少8个字符"
                className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="rounded" />
            <Label htmlFor="terms" className="text-sm text-gray-300">
              我同意{" "}
              <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                服务条款
              </Link>{" "}
              和{" "}
              <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                隐私政策
              </Link>
            </Label>
          </div>
          <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            创建账户
          </Button>
          
          <div className="relative">
            <Separator className="bg-white/20" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-sm text-gray-400">
              或者
            </span>
          </div>
          
          <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10">
            <Github className="mr-2 h-4 w-4" />
            使用 GitHub 注册
          </Button>
          
          <p className="text-center text-sm text-gray-300">
            已有账户？{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300">
              立即登录
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
