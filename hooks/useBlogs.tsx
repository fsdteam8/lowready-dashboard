"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBlogs,
  deleteSingleBlog,
  getAllBlogs,
  getSingleBlog,
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
  return useMutation({
    mutationFn: (id: string) => deleteSingleBlog(id),
    onError: (error) => {
      console.error("Blog delete failed:", error);
    },
  });
}

// Get Single Blog
export function useSingleBlog(id: string) {
  return useQuery({
    queryKey: ["singleBlog", id],
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