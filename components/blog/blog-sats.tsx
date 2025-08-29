import { FileText, Eye, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BlogStatsProps {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  scheduledPosts: number
  totalViews: number
  postsGrowth: number
  viewsGrowth: number
}

export function BlogStats({
  totalPosts,
  publishedPosts,
  draftPosts,
  scheduledPosts,
  totalViews,
  postsGrowth,
  viewsGrowth,
}: BlogStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPosts}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500">+{postsGrowth}%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>

      {/* Published Posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Published</CardTitle>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{publishedPosts}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((publishedPosts / totalPosts) * 100)}% of total posts
          </p>
        </CardContent>
      </Card>

      {/* Draft Posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Drafts</CardTitle>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{draftPosts}</div>
          <p className="text-xs text-muted-foreground">{scheduledPosts} scheduled posts</p>
        </CardContent>
      </Card>

      {/* Total Views */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500">+{viewsGrowth}%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
