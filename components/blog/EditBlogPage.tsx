// components/EditBlogComponent.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { ChevronLeft, Upload, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiptapEditor } from "@/components/tiptap-editor";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSingleBlog, useUpdateBlog } from "@/hooks/useBlogs";
import Image from "next/image";

interface EditBlogComponentProps {
  blogId: string;
}

export default function EditBlogComponent({ blogId }: EditBlogComponentProps) {
  const router = useRouter();

  const { mutate: updateBlog, isPending } = useUpdateBlog();
  const { data: blogData, isLoading } = useSingleBlog(blogId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null as File | null,
    imageUrl: "" as string,
  });

  useEffect(() => {
    if (blogData?.data) {
      setFormData({
        title: blogData.data.title || "",
        description: blogData.data.description || "",
        image: null,
        imageUrl: blogData.data.image?.url || "",
      });
    }
  }, [blogData]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file)
      setFormData((prev) => ({
        ...prev,
        image: file,
        imageUrl: URL.createObjectURL(file),
      }));
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null, imageUrl: "" }));
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    updateBlog(
      {
        blogId,
        data: {
          title: formData.title,
          description: formData.description,
        },
        image: formData.image ?? undefined,
      },
      {
        onSuccess: () => {
          toast.success("Blog updated successfully");
          router.push(`/blogs/${blogId}`);
        },
        onError: () => toast.error("Failed to update blog"),
      }
    );
  };

  if (isLoading) return <p className="p-6">Loading blog data...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href={`/blogs/${blogId}`}>
          <Button variant="ghost" size="sm" className="p-1">
            <ChevronLeft className="h-5 w-5 cursor-pointer" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-green-600">Edit Blog</h1>
          <p className="text-gray-600 mt-1">Update your blog details here.</p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter title"
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
                placeholder="Enter description"
              />
            </div>
          </div>
        </div>

        {/* Image Upload + Preview + Actions */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Upload Image</Label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              {!formData.imageUrl && (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                  <p className="text-sm text-gray-600">
                    Click to select an image file
                  </p>
                  <label htmlFor="image-upload" className="flex justify-center">
                    <Button
                      type="button"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </label>
                </div>
              )}

              {formData.imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={formData.imageUrl}
                    alt="Blog Image"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                    sizes="100vw"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Save / Cancel */}
          <div className="space-y-3">
            <Button
              onClick={handleSave}
              disabled={isPending}
              className="w-full bg-green-600 hover:bg-green-700 text-white h-12 cursor-pointer"
            >
              {isPending ? "Updating..." : "Save"}
            </Button>
            <Button
              onClick={() => router.push(`/blogs/${blogId}`)}
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50 h-12 cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
