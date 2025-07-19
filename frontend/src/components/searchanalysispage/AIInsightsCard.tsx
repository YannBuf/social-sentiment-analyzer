import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Brain, CheckCircle, TrendingUp } from "lucide-react"

interface AIInsightsCardProps {
  summary: string
  insights: string[]
  recommendations: string[]
}

export function AIInsightsCard({
  summary,
  insights,
  recommendations,
}: AIInsightsCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-white font-semibold mb-3">Summary</h3>
          <p className="text-gray-300 leading-relaxed">{summary}</p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Key Insights</h3>
          <div className="space-y-2">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{insight}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Action Recommendations</h3>
          <div className="space-y-2">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
