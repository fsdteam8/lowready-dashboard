"use client";

import { useState } from "react";
import { ChevronLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { toast } from "sonner";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useSingleBlog, useDeleteBlog } from "@/hooks/useBlogs"; 

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params?.id as string;

  const { data, isLoading, isError } = useSingleBlog(blogId);
  const blog = data?.data;  

  const deleteBlogMutation = useDeleteBlog();  

  const [deleteModal, setDeleteModal] = useState(false);
  const [, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!blog?._id) return;

    setIsDeleting(true);
    try {
      await deleteBlogMutation.mutateAsync(blog._id);
      toast.success("Blog deleted successfully");
      router.push("/blogs");
    } catch {
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false);
      setDeleteModal(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !blog) return <p>Blog not found</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/blogs">
            <Button variant="ghost" size="sm" className="p-1">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-green-600">
              Blog Details
            </h1>
            <p className="text-gray-600 mt-1">
              Keep track of all your blogs, update details, and stay organized.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent cursor-pointer"
            onClick={() => setDeleteModal(true)}
          >
            Delete
          </Button>
          <Link href={`/blogs/${blog._id}/edit`}>
            <Button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {/* Blog Content */}
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="relative h-64 md:h-80">
          <Image
            src={blog.image?.url || "/placeholder.svg"}
            alt={blog.title}
            height={500}
            width={500}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{blog.author || "Admin"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blog.readingTime || "5 min read"}</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{blog.title}</h1>

          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        title="Are You Sure?"
        message="Are you sure you want to delete this blog?"
        // isLoading={isDeleting}
      />
    </div>
  );
}
