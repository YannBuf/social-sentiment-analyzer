"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Brain, BarChart3, MessageSquare, TrendingUp, Heart, Users, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Navbar } from "@/components/navigation/navbar"
import { Footer } from "@/components/navigation/footer"

export default function DemoPage() {
  const [inputText, setInputText] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setResults(null);

    try {
      const response = await fetch("http://localhost:8000/sentence_analyze", {
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
      setResults(data);
    } catch (error) {
      console.error("Analysis error:", error);
      alert("Analysis failed, please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-purple-500/20 text-purple-300 border-purple-500/30">🎯 Live Demo</Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Experience the
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Powerful AI Sentiment Analysis</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Enter any text to instantly experience our AI sentiment analysis technology and see how it accurately detects sentiment and key information.
          </p>
        </div>
      </section>

      {/* Demo Interface */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Text Input
                </CardTitle>
                <CardDescription className="text-gray-300">Enter the text you want to analyze</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter text to analyze, e.g., This product has an excellent user experience, a clean and beautiful interface, and very practical features. Highly recommended!"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-32 bg-white/5 border-white/20 text-white placeholder:text-gray-400 resize-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{inputText.length}/500 characters</span>
                  <Button
                    onClick={handleAnalyze}
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
                        Start Analysis
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Analysis Results
                </CardTitle>
                <CardDescription className="text-gray-300">AI Sentiment Analysis Results</CardDescription>
              </CardHeader>
              <CardContent>
                {!results ? (
                  <div className="text-center py-12 text-gray-400">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Please enter text and click "Start Analysis" to see results</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Overall Sentiment */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-3">Overall Sentiment</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {results.sentiment === "positive" && <Heart className="h-6 w-6 text-green-400" />}
                          {results.sentiment === "negative" && <Heart className="h-6 w-6 text-red-400" />}
                          {results.sentiment === "neutral" && <Heart className="h-6 w-6 text-gray-400" />}

                          <div>
                            <p className="text-white font-semibold capitalize">{results.sentiment} sentiment</p>
                            <p className="text-gray-400 text-sm">
                              Confidence: {(results.confidence).toFixed(1)}%
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

                    {/* Emotion Breakdown */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-3">Emotion Breakdown</h3>
                      <div className="space-y-3">
                        {(() => {
                          const emotionLabels: { [key: string]: string } = {
                            joy: "Joy",
                            trust: "Trust",
                            anticipation: "Anticipation",
                            surprise: "Surprise",
                            anger: "Anger",
                            sadness: "Sadness",
                            fear: "Fear",
                            disgust: "Disgust",
                            calmness: "Calmness",
                            acceptance: "Acceptance",
                            boredom: "Boredom",
                            neutrality: "Neutrality"
                          }

                          return Object.entries(results.emotions).map(([emotionKey, value]) => (
                            <div key={emotionKey} className="flex items-center justify-between">
                              <span className="text-gray-300">{emotionLabels[emotionKey] || emotionKey}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-24 bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-purple-400 h-2 rounded-full"
                                    style={{ width: `${(value * 100).toFixed(0)}%` }}
                                  ></div>
                                </div>
                                <span className="text-white text-sm w-12">{(value * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          ));
                        })()}
                      </div>
                    </div>

                    {/* Keywords */}
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-3">Keyword Extraction</h3>
                      <div className="flex flex-wrap gap-2">
                        {results.keywords.map((keyword, index) => (
                          <Badge key={index} className="bg-purple-500/20 text-purple-300">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sample Texts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Try These Sample Texts</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card
                className="bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all"
                onClick={() =>
                  setInputText("This product has an excellent user experience, a clean and beautiful interface, and very practical features. Highly recommended!")
                }
              >
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-green-500/20 text-green-400">Positive Example</Badge>
                  <p className="text-gray-300 text-sm">
                    "This product has an excellent user experience, a clean and beautiful interface, and very practical features. Highly recommended!"
                  </p>
                </CardContent>
              </Card>

              <Card
                className="bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all"
                onClick={() => setInputText("The customer service attitude was poor, the problem could not be solved, and it wasted a lot of my time. Very disappointed.")}
              >
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-red-500/20 text-red-400">Negative Example</Badge>
                  <p className="text-gray-300 text-sm">"The customer service attitude was poor, the problem could not be solved, and it wasted a lot of my time. Very disappointed."</p>
                </CardContent>
              </Card>

              <Card
                className="bg-white/5 border-white/10 backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-all"
                onClick={() => setInputText("The report consists of five sections, each covering a different aspect of the study.")}
              >
                <CardContent className="p-4">
                  <Badge className="mb-2 bg-gray-500/20 text-gray-400">Neutral Example</Badge>
                  <p className="text-gray-300 text-sm">"The report consists of five sections, each covering a different aspect of the study."</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Demo Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Brain className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">AI Intelligent Analysis</h3>
                <p className="text-gray-300 text-sm">Deep learning-based sentiment recognition model with 95% accuracy</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Real-time Processing</h3>
                <p className="text-gray-300 text-sm">Millisecond response speed, supports large-scale real-time sentiment analysis</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Multi-dimensional Analysis</h3>
                <p className="text-gray-300 text-sm">Not only recognizes sentiment polarity, but also analyzes intensity and keywords</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Use Full Features?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            The demo is just the tip of the iceberg. Register an account to experience more powerful features including batch analysis, trend prediction, and public opinion monitoring.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Link href="/signup">Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
              <Link href="/features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
