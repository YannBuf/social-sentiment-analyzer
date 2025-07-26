"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Brain, Mail, Lock, Github } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navigation/navbar"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAuth } from "../contexts/authcontext"
import React, { Suspense } from "react"
export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    /**
    try {
      const response = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      })
      console.log("登录成功:", response.data)
      // ✅ 这里你可以存储 token 到 localStorage / cookie
      localStorage.setItem("token", response.data.access_token)

      // ✅ 登录后跳转
      router.push("/dashboard") // 根据实际页面调整
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.detail || "登录失败")
    } finally {
      setLoading(false)
    }*/
    try {
      await login(email, password)
      console.log("✅ 登录成功，即将跳转至 /dashboard")
      // 登录成功，跳转主页
      router.replace("/dashboard")
    } catch (e: any) {
      setError(e.response?.data?.detail || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <>
      <div className="fixed top-0 left-0 w-full z-50">
      <Navbar />
      </div>
      <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/5 border-white/10 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">SentimentAI</span>
            </div>
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-300">Log in to your account to continue using the sentiment analysis service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                E-mail address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <Button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {loading ? "logging in..." : "log in"}
            </Button>

            <div className="relative">
              <Separator className="bg-white/20" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-sm text-gray-400">
                or
              </span>
            </div>

            <Button variant="outline" className="w-full bg-transparent border-white/20 text-white hover:bg-white/10">
              <Github className="mr-2 h-4 w-4" />
              Sign in with GitHub
            </Button>

            <p className="text-center text-sm text-gray-300">
              No account yet?{" "}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300">
                Sign Up Now
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
    </Suspense>
  )
}
