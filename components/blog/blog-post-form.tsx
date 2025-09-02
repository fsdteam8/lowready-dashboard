"use client"

import type React from "react"
import { useState } from "react"
import { Save, X, Calendar, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
// import { api } from "@/lib/api"
import type { BlogCategory, BlogPost } from "@/lib/types"

interface BlogPostFormProps {
  categories: BlogCategory[]
  post?: BlogPost
  onSubmit: () => void
  onCancel: () => void
}

export function BlogPostForm({ categories, post, onSubmit, onCancel }: BlogPostFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    categoryId: post?.category.id || "",
    tags: post?.tags.join(", ") || "",
    status: post?.status || "Draft",
    featuredImage: post?.featuredImage || "",
    seoTitle: post?.seoTitle || "",
    seoDescription: post?.seoDescription || "",
    scheduledDate: post?.scheduledDate || "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Auto-generate slug from title
    if (field === "title" && !post) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim() || !formData.categoryId) {
      toast.error("Validation Error", {
        description: "Please fill in all required fields (title, content, and category).",
      })
      return
    }

    setIsSubmitting(true)

    try {
 

      onSubmit()
    } catch   {
      toast.error("Error", {
        description: "Failed to save the blog post. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const estimatedReadTime = Math.ceil(formData.content.split(" ").length / 200)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>{post ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter blog post title..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">URL Slug *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="url-friendly-slug"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  placeholder="Brief description of the blog post..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Write your blog post content here..."
                  rows={12}
                  required
                />
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formData.content.split(" ").length} words</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />~{estimatedReadTime} min read
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.status === "Scheduled" && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate" className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Scheduled Date
                  </Label>
                  <Input
                    id="scheduledDate"
                    type="datetime-local"
                    value={formData.scheduledDate}
                    onChange={(e) => handleInputChange("scheduledDate", e.target.value)}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.categoryId} onValueChange={(value) => handleInputChange("categoryId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  placeholder="tag1, tag2, tag3"
                />
                <div className="flex flex-wrap gap-1">
                  {formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean)
                    .map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  value={formData.featuredImage}
                  onChange={(e) => handleInputChange("featuredImage", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* SEO Section */}
              <div className="border-t pt-4 space-y-4">
                <h4 className="font-medium text-sm">SEO Settings</h4>

                <div className="space-y-2">
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={formData.seoTitle}
                    onChange={(e) => handleInputChange("seoTitle", e.target.value)}
                    placeholder="SEO optimized title..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seoDescription">SEO Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={formData.seoDescription}
                    onChange={(e) => handleInputChange("seoDescription", e.target.value)}
                    placeholder="SEO meta description..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-green-primary hover:bg-green-secondary">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {post ? "Update Post" : "Create Post"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
