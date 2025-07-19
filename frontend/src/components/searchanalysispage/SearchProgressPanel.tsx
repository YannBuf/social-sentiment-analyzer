import { Globe } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SearchProgressPanelProps {
  isSearching: boolean;
  searchProgress: number;
  selectedPlatforms: string[];
  platforms: { id: string; name: string }[];
}

export function SearchProgressPanel({
  isSearching,
  searchProgress,
  selectedPlatforms,
  platforms
}: SearchProgressPanelProps) {
  if (!isSearching) return null

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Globe className="mr-2 h-5 w-5" />
          Search Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-300">Searching for related content...</span>
            <span className="text-white">{searchProgress}%</span>
          </div>
          <Progress value={searchProgress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {selectedPlatforms.map((platformId) => {
            const platform = platforms.find((p) => p.id === platformId)
            return (
              <div key={platformId} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-gray-300">{platform?.name}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
