"use client";

import type React from "react";
import { useState, useEffect, use } from "react";
import { ChevronLeft, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiptapEditor } from "@/components/tiptap-editor";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface EditBlogProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditBlogPage({ params }: EditBlogProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [formData, setFormData] = useState({
    title: "",
    readingTime: "",
    description: "",
    image: null as File | null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load existing blog data
  useEffect(() => {
    // Mock loading existing blog data
    setFormData({
      title: "Choosing the Right Assisted Living",
      readingTime: "5 min read",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image: null,
    });
  }, [resolvedParams.id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.readingTime || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Blog updated successfully");
      router.push(`/blogs/${resolvedParams.id}`);
    } catch (error) {
      toast.error("Failed to update blog");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(`/blogs/${resolvedParams.id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href={`/blogs/${resolvedParams.id}`}>
          <Button variant="ghost" size="sm" className="p-1">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-green-600">Edit Blog</h1>
          <p className="text-gray-600 mt-1">
            Keep track of all your facilities, update details, and stay
            organized.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title and Reading Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Write Here"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="readingTime">Reading Time</Label>
              <Input
                id="readingTime"
                placeholder="Write time"
                value={formData.readingTime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    readingTime: e.target.value,
                  }))
                }
                className="h-12"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="border rounded-lg">
              <TiptapEditor
                content={formData.description}
                onChange={(content) =>
                  setFormData((prev) => ({ ...prev, description: content }))
                }
                placeholder="Description here"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Upload Photo */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Upload Photo</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-4">
              <div className="flex justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Browse and choose the files you want to upload from your
                  computer
                </p>
                <div className="flex justify-center">
                  <label htmlFor="image-upload">
                    <Button
                      type="button"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>
              {formData.image && (
                <p className="text-sm text-green-600 font-medium">
                  {formData.image.name}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
            >
              {isLoading ? "Updating..." : "Save"}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50 h-12 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
