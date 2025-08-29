import { MapPin, Calendar, DollarSign, TrendingUp, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlacementStatsProps {
  totalPlacements: number
  completedPlacements: number
  pendingPlacements: number
  totalTours: number
  completedTours: number
  scheduledTours: number
  conversionRate: number
  totalRevenue: number
  placementsGrowth: number
  toursGrowth: number
  revenueGrowth: number
}

export function PlacementStats({
  totalPlacements,
  completedPlacements,
  pendingPlacements,
  totalTours,
  completedTours,
  scheduledTours,
  conversionRate,
  totalRevenue,
  placementsGrowth,
  toursGrowth,
  revenueGrowth,
}: PlacementStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Placements */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Placements</CardTitle>
          <MapPin className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPlacements.toLocaleString()}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500">+{placementsGrowth}%</span>
            <span className="ml-1">from last month</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {completedPlacements} completed, {pendingPlacements} pending
          </p>
        </CardContent>
      </Card>

      {/* Total Tours */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTours.toLocaleString()}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500">+{toursGrowth}%</span>
            <span className="ml-1">from last month</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {completedTours} completed, {scheduledTours} scheduled
          </p>
        </CardContent>
      </Card>

      {/* Conversion Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{conversionRate}%</div>
          <p className="text-xs text-muted-foreground">Tours to placements</p>
        </CardContent>
      </Card>

      {/* Total Revenue */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            <span className="text-green-500">+{revenueGrowth}%</span>
            <span className="ml-1">from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
