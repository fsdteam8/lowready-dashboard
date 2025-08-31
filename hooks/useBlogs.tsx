"use client";

import { useMutation, useQuery} from "@tanstack/react-query";
import { deleteSingleBlog, getAllBlogs, getSingleBlog } from "@/lib/api";

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

// get single blog
export function useSingleBlog(id: string) {
  return useQuery({
    queryKey: ["singleBlog", id],
    queryFn: () => getSingleBlog(id),
    enabled: !!id,
  });
}

// create Blogs
// export function useBlogCrate() {
//   const queryClient = useQueryClient();

//   return useMutation(
//     ({
//       data,
//       image,
//     }: {
//       data: { blogTitle: string; readingTime: string; blogDescription: string };
//       image?: File;
//     }) => createBlogs(data, image),
//     {
//       onSuccess: () => {
//         // নতুন ব্লগ create হলে blog list auto-refresh
//         queryClient.invalidateQueries(["blogs"]);
//       },
//     }
//   );
// }