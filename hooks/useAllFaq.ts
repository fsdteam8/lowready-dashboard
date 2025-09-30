// hooks/useAllFaq.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllFaq,
  createFaq,
  deleteFaq,
  updateFaq,
  updateFaqAction,
} from "@/lib/api";

// get all faq
export function useAllFaq() {
  return useQuery({
    queryKey: ["faq"],
    queryFn: () => getAllFaq(),
  });
}

// create faq
export function useCreateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: { question: string; answer: string }) =>
      createFaq(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },
  });
}

// delete faq
export function useDeleteFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteFaq(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },
  });
}

// update faq
export function useUpdateFaq() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: { question?: string; answer?: string };
    }) => updateFaq(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },
  });
}

// Update FAQ for home or faq hook
type UpdateFaqParams = {
  id: string;
  type: "home" | "faq";
};

export const useUpdateFaqToggle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, type }: UpdateFaqParams) => updateFaqAction(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faq"] });
    },
    onError: (error) => {
      console.error("Failed to update FAQ:", error);
    },
  });
};
