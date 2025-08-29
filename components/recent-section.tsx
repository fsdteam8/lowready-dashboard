import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RecentSectionProps {
  title: string
  items: Array<{
    id: string
    name: string
    email?: string
    avatar?: string
    location?: string
    value?: string | number
    status?: string
    action?: string
  }>
  seeAllHref: string
}

export function RecentSection({ title, items, seeAllHref }: RecentSectionProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <Link href={seeAllHref}>
          <Button variant="ghost" size="sm" className="text-green-primary hover:text-green-secondary">
            See all
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={item.avatar || "/placeholder.svg"} alt={item.name} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                {item.email && <p className="text-sm text-gray-600">{item.email}</p>}
                {item.location && <p className="text-sm text-gray-600">{item.location}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {item.value && <span className="text-sm font-medium">{item.value}</span>}
              {item.status && (
                <Badge
                  variant={item.status === "Available" || item.status === "Subscribed" ? "default" : "secondary"}
                  className={
                    item.status === "Available" || item.status === "Subscribed"
                      ? "bg-green-bg text-green-success"
                      : "bg-gray-100 text-gray-600"
                  }
                >
                  {item.status}
                </Badge>
              )}
              {item.action && (
                <Button variant="ghost" size="sm" className="text-green-primary hover:text-green-secondary">
                  {item.action}
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
