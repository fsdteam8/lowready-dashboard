"use client";

import type React from "react";
import { useState } from "react";
import { ChevronLeft, Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiptapEditor } from "@/components/tiptap-editor";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBlogCrate } from "@/hooks/useBlogs";
import Image from "next/image";

export default function AddBlogPage() {
  const router = useRouter();
  const { mutate } = useBlogCrate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // optional: 5MB validation
        toast.error("File size must be less than 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      toast.warning("Please fill in all required fields");
      return;
    }

    if (!formData.image) {
      toast.error("Please upload an image");
      return;
    }

    setIsLoading(true); // loading start

    mutate(
      {
        data: {
          title: formData.title,
          description: formData.description,
        },
        image: formData.image,
      },
      {
        onSuccess: () => {
          toast.success("Blog created successfully!");
          setFormData({
            title: "",
            description: "",
            image: null,
          });
          setIsLoading(false); // loading end
          router.push("/blogs");
        },
        onError: () => {
          toast.error("Failed to create blog");
          setIsLoading(false); // loading end
        },
      }
    );
  };
  const handleCancel = () => {
    router.push("/blogs");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/blogs">
          <Button variant="ghost" size="sm" className="p-1">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-green-600">Add Blog</h1>
          <p className="text-gray-600 mt-1">
            Keep track of all your blogs, update details, and stay organized.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
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
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-4 cursor-pointer"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {!formData.image && (
                <>
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
                </>
              )}

              {formData.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={URL.createObjectURL(formData.image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                    width={200}
                    height={200}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, image: null }))
                    }
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50 h-12 bg-transparent cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
