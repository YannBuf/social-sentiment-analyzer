import { Search, Loader2 } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DateRange } from "react-day-picker"
import { DateRangePicker } from "./DateRangePicker"

interface SearchConfigPanelProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedPlatforms: string[];
  platforms: { id: string; name: string; icon: React.ReactNode }[];
  handlePlatformToggle: (id: string) => void;
  handleSearch: () => void;
  isSearching: boolean;
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
}

export function SearchConfigPanel({
  searchQuery,
  setSearchQuery,
  selectedPlatforms,
  platforms,
  handlePlatformToggle,
  handleSearch,
  isSearching,
  dateRange,
  setDateRange
}: SearchConfigPanelProps) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <Search className="mr-2 h-5 w-5" />
        Search Configuration
      </CardTitle>
      <CardDescription className="text-gray-300">
        Enter keywords and select platforms to search. Our AI will automatically collect and analyze relevant content.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      {/* Search Keyword Input */}
      <div className="space-y-2">
        <Label htmlFor="search-query" className="text-white">Search Keywords *</Label>
        <Input
          id="search-query"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g. AI development trends, electric vehicles, metaverse technologies..."
          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
        />
        <p className="text-gray-400 text-sm">Supports both English and Chinese keywords. Using specific topics or product names is recommended.</p>
      </div>

      {/* Platform Selection */}
      <div className="space-y-2">
        <Label className="text-white">Select Platforms</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {platforms.map((platform) => (
            <label
              key={platform.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all ${
                selectedPlatforms.includes(platform.id)
                  ? "bg-purple-500/20 border-purple-500/50 text-white"
                  : "bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedPlatforms.includes(platform.id)}
                onChange={() => handlePlatformToggle(platform.id)}
                className="rounded"
              />
              <span className="text-lg">{platform.icon}</span>
              <span className="font-medium">{platform.name}</span>
            </label>
          ))}
        </div>
        <p className="text-gray-400 text-sm">
          {selectedPlatforms.length} platforms selected. For comprehensive insights, we recommend selecting 2 to 4 platforms.
        </p>
      </div>

      {/* Quantity & Date Range */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-white">Search Limit</Label>
          <select className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-gray-400">
            <option value="50">50 results</option>
            <option value="100">100 results</option>
            <option value="200">200 results</option>
            <option value="500">500 results</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label className="text-white">Date Range</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-white/5 border border-white/20 text-white",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "yyyy-MM-dd")} - {format(dateRange.to, "yyyy-MM-dd")}
                    </>
                  ) : (
                    format(dateRange.from, "yyyy-MM-dd")
                  )
                ) : (
                  <span>Select date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-white text-black p-0 rounded-md shadow-md">
              <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        disabled={!searchQuery.trim() || selectedPlatforms.length === 0 || isSearching}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        {isSearching ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Start Smart Search
          </>
        )}
      </Button>
    </CardContent>
  </Card>
  )
}
