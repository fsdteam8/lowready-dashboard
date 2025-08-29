import type React from "react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  growth: number
  icon?: React.ReactNode
}

export function StatsCard({ title, value, growth, icon }: StatsCardProps) {
  const isPositive = growth > 0
  const formattedValue = typeof value === "number" ? value.toLocaleString() : value

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{formattedValue}</p>
          </div>
          {icon && <div className="text-gray-400">{icon}</div>}
        </div>
        <div className="mt-4 flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-green-success" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-error" />
          )}
          <span className={`text-sm font-medium ${isPositive ? "text-green-success" : "text-red-error"}`}>
            {Math.abs(growth)}% from the last month
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
