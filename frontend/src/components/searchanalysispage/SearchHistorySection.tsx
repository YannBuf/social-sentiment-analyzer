import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  MessageSquare,
  Globe,
  Eye,
  RefreshCw,
  Download,
  Filter,
} from "lucide-react"

interface SearchHistoryItem {
  id: string | number
  query: string
  sentiment: "positive" | "negative" | "neutral" | string 
  timestamp: string
  resultsCount: number
  platforms: string[]
  analysisResult?: any
  searchResults?: any
}

interface SearchHistorySectionProps {
  history: SearchHistoryItem[]
  onView: (item: SearchHistoryItem) => void
  onReanalyze: (item: SearchHistoryItem) => void
  onDownload: (item: SearchHistoryItem) => void
}

export function SearchHistorySection({
  history,
  onView,
  onReanalyze,
  onDownload,
}: SearchHistorySectionProps) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">搜索历史</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {(history ?? []).map((item) => (
            <div key={item.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-white font-semibold">{item.query}</h3>
                    <Badge
                      className={
                        item.sentiment === "positive"
                          ? "bg-green-500/20 text-green-400"
                          : item.sentiment === "negative"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-gray-500/20 text-gray-400"
                      }
                    >
                      {item.sentiment === "positive"
                        ? "正面"
                        : item.sentiment === "negative"
                        ? "负面"
                        : "中性"}
                    </Badge>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {item.timestamp}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="mr-1 h-3 w-3" />
                      {item.resultsCount} 条结果
                    </div>
                    <div className="flex items-center">
                      <Globe className="mr-1 h-3 w-3" />
                      {item.platforms.join(", ")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-white/20 text-white"
                    onClick={() => onView(item)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-white/20 text-white"
                    onClick={() => onReanalyze(item)}
                  >
                    <RefreshCw className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent border-white/20 text-white"
                    onClick={() => onDownload(item)}
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
