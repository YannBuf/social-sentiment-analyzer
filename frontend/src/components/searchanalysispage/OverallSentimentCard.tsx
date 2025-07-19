import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "../ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Download, Share2 } from "lucide-react"

interface OverallSentimentCardProps {
  label: string
  score: number // 0 ~ 1
  confidence: number // 0 ~ 1
}

export function OverallSentimentCard({
  label,
  score,
  confidence,
}: OverallSentimentCardProps) {
  const getBadgeClass = () => {
    switch (label) {
      case "积极":
        return "bg-green-500/20 text-green-400"
      case "消极":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="mr-2 h-5 w-5" />
            Overall sentiment analysis
          </div>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
              <Download className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="bg-transparent border-white/20 text-white">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-semibold">sentimental tendency</h3>
            <Badge className={getBadgeClass()}>{label}</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">sentiment score</span>
              <span className="text-white">{(score * 10).toFixed(1)}/10</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full"
                style={{ width: `${score * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Confidence</span>
              <span className="text-white">{(confidence * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
