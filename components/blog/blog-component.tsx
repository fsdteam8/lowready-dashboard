"use client";

import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

// Mock data matching the screenshot
const mockBlogs = Array.from({ length: 10 }, (_, i) => ({
  id: `blog-${i + 1}`,
  title: "Blog Name Here",
  description: "Lorem ipsum dolor sit amet, cons...",
  image: "/assisted-living-interior-room.png",
  createdOn: "06/01/2025",
  readingTime: "12 min read",
}));

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    blogId: string | null;
  }>({
    isOpen: false,
    blogId: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 5;
  const totalItems = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleSearch = () => {
    // Implement search functionality
    console.log("Searching for:", searchTerm);
  };

  const handleDelete = async () => {
    if (!deleteModal.blogId) return;

    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Blog deleted successfully");
      setDeleteModal({ isOpen: false, blogId: null });
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteModal = (blogId: string) => {
    setDeleteModal({ isOpen: true, blogId });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, blogId: null });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-green-600">
          Blogs Management
        </h1>
        <p className="text-gray-600 mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your app today.
        </p>
      </div>

      {/* Search and Add Blog */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1 max-w-md">
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
        </div>
        <Link href="/blogs/add">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Blog
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 p-4 bg-green-50 border-b font-medium text-gray-700">
          <div className="col-span-4">Facility</div>
          <div className="col-span-2">Created On</div>
          <div className="col-span-2">Reading Time</div>
          <div className="col-span-4 text-center">Action</div>
        </div>

        {/* Table Body */}
        <div className="divide-y">
          {mockBlogs.slice(0, itemsPerPage).map((blog) => (
            <div
              key={blog.id}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50"
            >
              {/* Facility Column */}
              <div className="col-span-4 flex items-center gap-3">
                <Image
                  width={48}
                  height={48}
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {blog.description}
                  </p>
                </div>
              </div>

              {/* Created On */}
              <div className="col-span-2 text-gray-600">{blog.createdOn}</div>

              {/* Reading Time */}
              <div className="col-span-2 text-gray-600">{blog.readingTime}</div>

              {/* Actions */}
              <div className="col-span-4 flex items-center justify-center gap-2">
                <Link href={`/blogs/${blog.id}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/blogs/${blog.id}/edit`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => openDeleteModal(blog.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {startItem} to {endItem} of {totalItems} results
        </p>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "hover:bg-gray-50"
              }
            >
              {page}
            </Button>
          ))}
          {totalPages > 5 && <span className="px-2 text-gray-400">...</span>}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        title="Are You Sure?"
        description="Are you sure you want to delete this blog?"
        isLoading={isDeleting}
      />
    </div>
  );
}
