import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface QuickStatsCardProps {
  resultsCount: number;
  platformsCount: number;
  totalInteractions: number;
}

export function QuickStatsCard({
  resultsCount,
  platformsCount,
  totalInteractions
}: QuickStatsCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Quick Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Search Results</span>
          <span className="text-white font-bold">{resultsCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Platforms Covered</span>
          <span className="text-white font-bold">{platformsCount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Total Interactions</span>
          <span className="text-white font-bold">{totalInteractions}</span>
        </div>
      </CardContent>
    </Card>
  )
}
