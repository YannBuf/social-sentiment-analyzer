// components/searchanalysispage/SingleTextAnalysisPanel.tsx
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart3, Brain, Download, Share2, Heart } from "lucide-react"

interface SingleAnalysisResult {
  sentiment: string
  confidence: number // 0~100
  emotions: Record<string, number>
  keywords: string[]
}

export default function SingleTextAnalysisPanel({ results }: { results: SingleAnalysisResult | null }) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="mr-2 h-5 w-5" />
            Analysis Result
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
            <p>Please enter the text and click “Start Analysis” to view the results.</p>
          </div>
        ) : (
          <div className="space-y-6">
          {/* 整体情感 */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Heart className="mr-2 h-4 w-4" />
              Overall sentimental tendencies
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {results.sentiment === "positive" && <Heart className="h-6 w-6 text-green-400" />}
                {results.sentiment === "negative" && <Heart className="h-6 w-6 text-red-400" />}
                {results.sentiment === "neutral" && <Heart className="h-6 w-6 text-gray-400" />}

                <div>
                  <p className="text-white font-semibold capitalize">{results.sentiment} sentiment</p>
                  <p className="text-gray-400 text-sm">
                    confidence: {results.confidence.toFixed(1)}%
                  </p>
                </div>
              </div>

              {results.sentiment === "positive" && (
                <Badge className="bg-green-500/20 text-green-400">Positive</Badge>
              )}
              {results.sentiment === "negative" && (
                <Badge className="bg-red-500/20 text-red-400">Negative</Badge>
              )}
              {results.sentiment === "neutral" && (
                <Badge className="bg-gray-500/20 text-gray-400">Neutral</Badge>
              )}
            </div>
          </div>

            {/* 情感细分 */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">Sentiment Breakdown</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(results.emotions).map(([emotion, value]) => (
                  <div key={emotion} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm capitalize">{emotion}</span>
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

            {/* 关键词 */}
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {results.keywords.map((keyword, index) => (
                  <Badge key={index} className="bg-blue-500/20 text-blue-300">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
