"use client";

import { useState } from "react";
import {   Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useAllBlogs, useDeleteBlog } from "@/hooks/useBlogs";
import BlogSkeleton from "./blogSkeloton";

// ✅ Blog Type Definition
interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: { url: string };
  createdAt: string;
  readingTime?: string;
}

interface Meta {
  page: number;
  totalPages: number;
  total: number;
}

interface BlogsResponse {
  data: Blog[];
  meta: Meta;
}

export default function BlogsPage() {
  // const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    blogId: string | null;
  }>({
    isOpen: false,
    blogId: null,
  });

const { data: blogsResponse, isLoading } = useAllBlogs(currentPage, 10) as {
  data: BlogsResponse | undefined;
  isLoading: boolean;
};
  const blogs: Blog[] = blogsResponse?.data || [];
  const meta: Meta | undefined = blogsResponse?.meta;

  const deleteBlogMutation = useDeleteBlog();

  // const handleSearch = () => {
  //   console.log("Searching for:", searchTerm);
  //   // চাইলে search API query param এ পাঠাতে পারো
  // };

  const handleDelete = async () => {
    if (!deleteModal.blogId) return;

    try {
      await deleteBlogMutation.mutateAsync(deleteModal.blogId);
      toast.success("Blog deleted successfully");
      setDeleteModal({ isOpen: false, blogId: null });
    } catch {
      toast.error("Failed to delete blog");
    }
  };

  const openDeleteModal = (blogId: string) =>
    setDeleteModal({ isOpen: true, blogId });
  const closeDeleteModal = () =>
    setDeleteModal({ isOpen: false, blogId: null });

  if(isLoading) return <><BlogSkeleton /></>
  return (
    <div className="p-6 space-y-6">
      {/* Search + Add Blog */}
      <div className="flex justify-end gap-4">
        {/* <div className="flex items-center gap-2 flex-1 max-w-md">
          <Input
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleSearch}
            className="bg-green-600 hover:bg-green-700 text-white px-6"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div> */}
        <Link href="/blogs/add">
          <Button className="bg-green-600 hover:bg-green-700 text-white cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Add Blog
          </Button>
        </Link>
      </div>
 
      {/* Table */}
      <div className="bg-white rounded-lg border">
        <div className="grid grid-cols-12 gap-4 p-4 bg-green-50 border-b font-medium text-gray-700">
          <div className="col-span-4">Blog</div>
          <div className="col-span-2">Created On</div>
          <div className="col-span-2">Reading Time</div>
          <div className="col-span-4 text-center">Action</div>
        </div>

        <div className="divide-y">
          {blogs.map((blog: Blog) => (
            <div
              key={blog._id}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50"
            >
              <div className="col-span-4 flex items-center gap-3">
                <Image
                  width={48}
                  height={48}
                  src={blog.image?.url }
                  alt={blog.title}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {blog.title}
                  </h3>
                  <p
                    className="text-sm text-gray-600 truncate"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                  ></p>
                </div>
              </div>

              <div className="col-span-2 text-gray-600">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>

              <div className="col-span-2 text-gray-600">
                {blog.readingTime || "12 min read"}
              </div>

              <div className="col-span-4 flex items-center justify-center gap-2">
                <Link href={`/blogs/${blog._id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="  hover:bg-green-50 cursor-pointer"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/blogs/${blog._id}/edit`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50 cursor-pointer"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                  onClick={() => openDeleteModal(blog._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {meta && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Page {meta.page} of {meta.totalPages} | Total {meta.total} blogs
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(meta.page - 1)}
              disabled={meta.page === 1}
            >
              &lt;
            </Button>

            {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={meta.page === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={
                    meta.page === page
                      ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                      : "hover:bg-gray-50 cursor-pointer"
                  }
                >
                  {page}
                </Button>
              )
            )}

            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => setCurrentPage(meta.page + 1)}
              disabled={meta.page === meta.totalPages}
            >
              &gt;
            </Button>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Are You Sure?"
        message="Are you sure you want to delete this blog?"
      />
    </div>
  );
}
