"use client";
import {
  useDeleteSubscriptionPlan,
  useSubscriptionPlan,
} from "@/hooks/useAlltSubscription";
import React, { useState } from "react";
import { Eye, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SubscriptionsSkeleton from "./SubscriptionsSkeleton";

interface SubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  billingCycle: string;
  price: number;
  currency: string;
  amenities?: string[];
}

export default function Subscriptions() {
  const { data, isLoading, isError } = useSubscriptionPlan();
  const plans: SubscriptionPlan[] = (data?.data || [])?.map(
    (p: SubscriptionPlan) => ({
      ...p,
      amenities: p.amenities ?? [
        "Assisted Living",
        "Memory Care",
        "Medication Management",
        "24/7 Nursing Support",
        "Nutritious Meals",
      ],
    })
  );

  const deleteSubscriptionPlanMutation = useDeleteSubscriptionPlan();

  // ✅ Delete Modal State
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    planId: string | null;
  }>({
    isOpen: false,
    planId: null,
  });
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ✅ View Modal State
  const [selectedPlanDetails, setSelectedPlanDetails] =
    useState<SubscriptionPlan | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const openDeleteModal = (id: string) =>
    setDeleteModal({ isOpen: true, planId: id });
  const closeDeleteModal = () =>
    setDeleteModal({ isOpen: false, planId: null });

  const handleDelete = async () => {
    if (!deleteModal.planId) return;
    setDeletingId(deleteModal.planId);

    try {
      await deleteSubscriptionPlanMutation.mutateAsync(deleteModal.planId);
      toast.success("Subscription plan deleted successfully!");
      closeDeleteModal();
    } catch {
      toast.error("Failed to delete subscription plan.");
    } finally {
      setDeletingId(null);
    }
  };

  const openViewModal = (plan: SubscriptionPlan) => {
    setSelectedPlanDetails(plan);
    setIsViewModalOpen(true);
  };

  if (isLoading) return <div><SubscriptionsSkeleton /></div>;
  if (isError) return <p className="p-6 text-red-500">Something went wrong</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold">Subscription Plans</p>
        <Link href={`/subscriptions/add-subscriptions`}>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
            + Add
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[#E6E7E6] bg-[#FFF] rounded-xl">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-green-100 text-left text-[#343A40]">
              <th className="px-4 py-3">Subscriptions Packages</th>
              <th className="px-4 py-3">Amenities</th>
              <th className="px-4 py-3">Subscription Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans?.map((plan) => (
              <tr key={plan._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{plan.name}</td>
                <td className="px-4 py-3 text-sm text-gray-600 truncate max-w-xs">
                  {plan.description}
                </td>
                <td className="px-4 py-3 capitalize">{plan.billingCycle}</td>
                <td className="px-4 py-3 font-medium">
                  ${plan.price} {plan.currency}
                </td>
                <td className="px-4 py-3 flex items-center gap-3">
                  {/* View */}
                  <button
                    className="p-2 rounded-full hover:bg-green-100 text-green-600 cursor-pointer"
                    onClick={() => openViewModal(plan)}
                  >
                    <Eye size={18} />
                  </button>

                  {/* Delete */}
                  <button
                    className="p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer"
                    onClick={() => openDeleteModal(plan._id)}
                    disabled={deletingId === plan._id}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Delete Modal */}
      <Dialog open={deleteModal.isOpen} onOpenChange={closeDeleteModal}>
        <DialogContent className="max-w-md p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Confirm Delete
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Are you sure you want to delete this subscription plan? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3 mt-6 ">
            <Button variant="outline" onClick={closeDeleteModal} className="cursor-pointer">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deletingId === deleteModal.planId}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              {deletingId === deleteModal.planId ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* VIEW MODAL */}
      {selectedPlanDetails && (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="h-auto w-full rounded-2xl p-4 max-w-4xl">
            <div className="relative p-6">
              <DialogHeader className="mb-2">
                <DialogTitle className="text-base font-medium text-[#343A40]">
                  Subscriptions Title
                </DialogTitle>
                <p className="text-base font-normal text-[#6C757D]">
                  {selectedPlanDetails.name}
                </p>
              </DialogHeader>

              {/* Message */}
              <div className="mb-5">
                <p className="text-base font-semibold text-[#343A40] mb-1">
                  Message
                </p>
                <DialogDescription className="text-[16px] leading-6 text-[#6C757D]">
                  {selectedPlanDetails.description}
                </DialogDescription>
              </div>

              {/* Two-column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm font-semibold text-[#343A40] mb-1">
                    Subscription Type
                  </p>
                  <p className="text-[#6C757D] text-base">
                    {selectedPlanDetails.billingCycle}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#343A40] mb-1">
                    Price
                  </p>
                  <p className="text-[#6C757D] text-sm">
                    ${selectedPlanDetails.price} {selectedPlanDetails.currency}
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Amenities
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedPlanDetails.amenities?.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm bg-[#F7F8F8] text-[#6C757D]"
                    >
                      {tag}
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200">
                        <X className="h-3 w-3 text-red-500" />
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
