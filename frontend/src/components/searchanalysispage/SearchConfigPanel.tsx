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
          搜索配置
        </CardTitle>
        <CardDescription className="text-gray-300">
          输入关键词并选择要搜索的平台，AI将自动抓取和分析相关内容
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 搜索关键词输入 */}
        <div className="space-y-2">
          <Label htmlFor="search-query" className="text-white">搜索关键词 *</Label>
          <Input
            id="search-query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="例如: 人工智能发展趋势、新能源汽车、元宇宙技术..."
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-400"
          />
          <p className="text-gray-400 text-sm">支持中英文关键词，建议使用具体的话题或产品名称</p>
        </div>

        {/* 选择平台 */}
        <div className="space-y-2">
          <Label className="text-white">选择搜索平台</Label>
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
            已选择 {selectedPlatforms.length} 个平台，建议选择2-4个平台以获得更全面的数据
          </p>
        </div>

        {/* 数量 & 时间限制 */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">搜索数量限制</Label>
            <select className="w-full p-2 bg-white/5 border border-white/20 rounded-md text-gray-400">
              <option value="50">50条内容</option>
              <option value="100">100条内容</option>
              <option value="200">200条内容</option>
              <option value="500">500条内容</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="text-white">时间范围</Label>
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
                    <span>选择日期范围</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto bg-white text-black p-0 rounded-md shadow-md">
                <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* 搜索按钮 */}
        <Button
          onClick={handleSearch}
          disabled={!searchQuery.trim() || selectedPlatforms.length === 0 || isSearching}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {isSearching ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              搜索中...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              开始智能搜索
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
