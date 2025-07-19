import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/app/contexts/authcontext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SentimentAI - AI驱动的社交情感分析平台",
  description: "专业的社交媒体情感分析平台，通过AI技术实时分析情感趋势，洞察用户心声，助力品牌决策。",
  keywords: "情感分析,社交媒体,AI,人工智能,舆情监控,品牌分析",
  authors: [{ name: "SentimentAI Team" }],
  openGraph: {
    title: "SentimentAI - AI驱动的社交情感分析平台",
    description: "专业的社交媒体情感分析平台，通过AI技术实时分析情感趋势，洞察用户心声，助力品牌决策。",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SentimentAI - AI驱动的社交情感分析平台",
    description: "专业的社交媒体情感分析平台，通过AI技术实时分析情感趋势，洞察用户心声，助力品牌决策。",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}><AuthProvider>{children}</AuthProvider></body>
    </html>
  )
}
