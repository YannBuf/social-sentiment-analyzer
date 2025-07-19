import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, Share2 } from "lucide-react"
import { useState } from "react"

interface SearchResult {
  id: string;
  platform: string;
  author: string;
  publishTime: string; // or Date, depending on your data
  content: string;
  likes?: number;
  comments?: number;
  shares?: number;
}

interface SearchResultsPreviewProps {
  searchResults: SearchResult[];
}

export function SearchResultsPreview({ searchResults }: SearchResultsPreviewProps) {
  const [showAll, setShowAll] = useState(false);

  if (searchResults.length === 0) return null;

  const resultsToShow = showAll ? searchResults : searchResults.slice(0, 3);

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Search Results Preview
          </CardTitle>
          <Badge className="bg-green-500/20 text-green-400">
            Found {searchResults.length} related results
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resultsToShow.map((result) => (
            <div key={result.id} className="bg-white/5 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-500/20 text-blue-400">{result.platform}</Badge>
                  <span className="text-gray-400 text-sm">@{result.author}</span>
                </div>
                <span className="text-gray-400 text-sm">{result.publishTime}</span>
              </div>
              <p className="text-white mb-3">{result.content}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <Heart className="mr-1 h-3 w-3" />
                  {result.likes}
                </span>
                <span className="flex items-center">
                  <MessageSquare className="mr-1 h-3 w-3" />
                  {result.comments}
                </span>
                <span className="flex items-center">
                  <Share2 className="mr-1 h-3 w-3" />
                  {result.shares}
                </span>
              </div>
            </div>
          ))}

          {searchResults.length > 3 && (
            <div className="text-center">
              <Button
                variant="outline"
                className="bg-transparent border-white/20 text-white"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : `View All ${searchResults.length} Results`}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
