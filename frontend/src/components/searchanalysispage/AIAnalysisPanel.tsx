import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, CheckCircle, Loader2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface AIAnalysisPanelProps {
  searchResultsLength: number;
  isAnalyzing: boolean;
  analysisProgress: number;
  onAnalyze: () => void;
}

export function AIAnalysisPanel({
  searchResultsLength,
  isAnalyzing,
  analysisProgress,
  onAnalyze
}: AIAnalysisPanelProps) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          AI Deep Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        {searchResultsLength === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Brain className="h-8 w-8 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Run a search to enable AI analysis</p>
          </div>
        ) : isAnalyzing ? (
          <div className="space-y-4">
            <div className="text-center">
              <Loader2 className="h-8 w-8 mx-auto mb-3 text-purple-400 animate-spin" />
              <p className="text-white font-semibold">AI is analyzing...</p>
              <p className="text-gray-400 text-sm">Powered by OpenAI for advanced sentiment analysis</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Progress</span>
                <span className="text-white">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-3 text-green-400" />
              <p className="text-white font-semibold">Ready to Analyze</p>
              <p className="text-gray-400 text-sm">Click below to start AI analysis</p>
            </div>
            <Button
              onClick={onAnalyze}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500"
            >
              <Brain className="mr-2 h-4 w-4" />
              Start AI Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
