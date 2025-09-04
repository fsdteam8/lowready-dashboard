"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBlogs,
  deleteSingleBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "@/lib/api";

// Get All Blogs
export function useAllBlogs(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["blogs", page, limit],
    queryFn: () => getAllBlogs(page, limit),
  });
}

// Delete Blog Hook
export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSingleBlog(id),
    onSuccess: () => {
      // 🔥 Blogs cache invalidate করলে auto reload হবে
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Blog delete failed:", error);
    },
  });
}

// Get Single Blog
export function useSingleBlog(id: string) {
  return useQuery({
    queryKey: ["blogs", id],
    queryFn: () => getSingleBlog(id),
    enabled: !!id,
  });
}

// Create Blog
export function useBlogCrate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      image,
    }: {
      data: { title: string; description: string };
      image?: File;
    }) => createBlogs(data, image),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      console.error("Blog create failed:", error);
    },
  });
}

// Update Blog Hook
export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      blogId,
      data,
      image,
    }: {
      blogId: string;
      data: { title: string; description: string };
      image?: File;
    }) => updateBlog(blogId, data, image),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },

    onError: (error) => {
      console.error("Blog update failed:", error);
    },
  });
}
