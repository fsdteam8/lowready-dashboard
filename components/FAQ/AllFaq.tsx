"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  useAllFaq,
  useCreateFaq,
  useDeleteFaq,
  useUpdateFaq,
  useUpdateFaqToggle,
} from "@/hooks/useAllFaq";

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  home: boolean;
  faq: boolean;
}

export default function AllFaqTable() {
  const { data: faq } = useAllFaq();
  const { mutate: createFaq, isPending } = useCreateFaq();
  const { mutate: removeFaq, isPending: isDeleting } = useDeleteFaq();
  const { mutate: updateFaqMutate, isPending: isUpdating } = useUpdateFaq();

  const [selectedFaq, setSelectedFaq] = useState<FaqItem | null>(null);
  const [deleteFaqItem, setDeleteFaqItem] = useState<FaqItem | null>(null);
  const [editFaqItem, setEditFaqItem] = useState<FaqItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toggleLoading, setToggleLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const { mutate: updateFaqToggle } = useUpdateFaqToggle();

  const truncateText = (text: string, wordCount: number) => {
    const words = text.split(" ");
    return words.length > wordCount
      ? words.slice(0, wordCount).join(" ") + " ..."
      : text;
  };

  // Create FAQ
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || !answer.trim()) {
      toast.error("⚠️ Question and Answer cannot be empty!");
      return;
    }

    createFaq(
      { question, answer },
      {
        onSuccess: () => {
          toast.success("🎉 New FAQ added successfully!");
          setQuestion("");
          setAnswer("");
          setIsAddModalOpen(false);
        },
        onError: (error) => {
          toast.error(
            (error as Error)?.message ||
              "❌ Failed to add FAQ. Please try again."
          );
        },
      }
    );
  };

  // Delete FAQ
  const handleDelete = () => {
    if (!deleteFaqItem) return;
    removeFaq(deleteFaqItem._id, {
      onSuccess: () => {
        toast.success("FAQ deleted successfully!");
        setDeleteFaqItem(null);
      },
      onError: (error) => {
        toast.error(
          (error as Error)?.message ||
            "❌ Failed to delete FAQ. Please try again."
        );
      },
    });
  };

  // Update FAQ
  const handleUpdate = () => {
    if (!editFaqItem) return;

    updateFaqMutate(
      {
        id: editFaqItem._id,
        payload: { question, answer },
      },
      {
        onSuccess: () => {
          toast.success("FAQ updated successfully!");
          setEditFaqItem(null);
        },
        onError: (error) => {
          toast.error(
            (error as Error)?.message ||
              "❌ Failed to update FAQ. Please try again."
          );
        },
      }
    );
  };

  // Fill edit modal with existing data when opening
  useEffect(() => {
    if (editFaqItem) {
      setQuestion(editFaqItem.question);
      setAnswer(editFaqItem.answer);
    } else {
      setQuestion("");
      setAnswer("");
    }
  }, [editFaqItem]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold  text-[#28A745]">
              FAQ Management
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage all frequently asked questions with ease 🚀
            </p>
          </div>
        </div>

        {/* Add FAQ Button */}
        <Button
          className="flex gap-2 cursor-pointer bg-[#28A745] hover:bg-[#48db6a]"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> Add FAQ
        </Button>
      </div>

      {/* FAQ Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Home</TableHead>
            <TableHead>FAQ</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faq?.data?.map((faqItem: FaqItem) => (
            <TableRow key={faqItem._id}>
              <TableCell>#{faqItem._id.slice(-4)}</TableCell>
              <TableCell>{truncateText(faqItem.question, 10)}</TableCell>
              <TableCell>{truncateText(faqItem.answer, 10)}</TableCell>
              <TableCell>
                {new Date(faqItem.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Switch
                  checked={faqItem.home}
                  disabled={!!toggleLoading[faqItem._id]}
                  onCheckedChange={() => {
                    setToggleLoading((prev) => ({
                      ...prev,
                      [faqItem._id]: true,
                    }));
                    updateFaqToggle(
                      { id: faqItem._id, type: "home" },
                      {
                        onSuccess: () => {
                          toast.success("Home status updated successfully!");
                          setToggleLoading((prev) => ({
                            ...prev,
                            [faqItem._id]: false,
                          }));
                        },
                        onError: (error) => {
                          toast.error(
                            error?.message || "❌ Failed to update Home status"
                          );
                          setToggleLoading((prev) => ({
                            ...prev,
                            [faqItem._id]: false,
                          }));
                        },
                      }
                    );
                  }}
                  className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                />
              </TableCell>

              <TableCell>
                <Switch
                  checked={faqItem.faq}
                  disabled={!!toggleLoading[faqItem._id]}
                  onCheckedChange={() => {
                    setToggleLoading((prev) => ({
                      ...prev,
                      [faqItem._id]: true,
                    }));
                    updateFaqToggle(
                      { id: faqItem._id, type: "faq" },
                      {
                        onSuccess: () => {
                          toast.success("FAQ status updated successfully!");
                          setToggleLoading((prev) => ({
                            ...prev,
                            [faqItem._id]: false,
                          }));
                        },
                        onError: (error) => {
                          toast.error(
                            error?.message || "❌ Failed to update FAQ status"
                          );
                          setToggleLoading((prev) => ({
                            ...prev,
                            [faqItem._id]: false,
                          }));
                        },
                      }
                    );
                  }}
                  className="cursor-pointer data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                />
              </TableCell>
              <TableCell className="flex gap-3">
                {/* View */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedFaq(faqItem)}
                  className="cursor-pointer"
                >
                  <Eye className="w-5 h-5" />
                </Button>

                {/* Edit */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditFaqItem(faqItem)}
                  className="cursor-pointer"
                >
                  <Pencil className="w-5 h-5" />
                </Button>

                {/* Delete */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeleteFaqItem(faqItem)}
                  className="cursor-pointer"
                >
                  <Trash className="w-5 h-5 text-red-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View Modal */}
      {selectedFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg sm:max-w-md w-full p-4">
            <h3 className="text-[22px] font-medium">{selectedFaq.question}</h3>
            <p className="mt-2 text-[15px] text-black/70">{selectedFaq.answer}</p>
            <div className="flex justify-end mt-4">
              <Button
                variant="secondary"
                onClick={() => setSelectedFaq(null)}
                className="cursor-pointer "
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteFaqItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg sm:max-w-xl w-full p-4">
            <h3 className="text-base font-semibold">Delete FAQ</h3>
            <p className="text-sm mt-2">
              Are you sure you want to delete this FAQ?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDeleteFaqItem(null)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="cursor-pointer"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Add Modal */}
      {(editFaqItem || isAddModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg sm:max-w-lg w-full p-4">
            <h3 className="text-lg font-medium">
              {editFaqItem ? "Edit FAQ" : "Add New FAQ"}
            </h3>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Question</label>
                <Input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter question"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Answer</label>
                <Textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter answer"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setEditFaqItem(null);
                    setIsAddModalOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={editFaqItem ? handleUpdate : handleCreate}
                  disabled={isUpdating || isPending}
                  className="cursor-pointer"
                >
                  {editFaqItem
                    ? isUpdating
                      ? "Updating..."
                      : "Update"
                    : isPending
                    ? "Creating..."
                    : "Create"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
