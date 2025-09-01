"use client";
import {
  useDeleteSubscriptionPlan,
  useSubscriptionPlan,
} from "@/hooks/useAlltSubscription";
import React, { useState } from "react";
import { Eye, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// use Dialog for the view modal
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

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
  const plans: SubscriptionPlan[] = (data?.data || []).map(
    (p: SubscriptionPlan) => ({
      ...p,
      // fallback demo amenities if API doesn't send them
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

  // Delete modal state
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // View details modal state
  const [selectedPlanDetails, setSelectedPlanDetails] =
    useState<SubscriptionPlan | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const openDeleteModal = (id: string) => {
    setSelectedPlanId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedPlanId) return;
    setDeletingId(selectedPlanId);
    try {
      await deleteSubscriptionPlanMutation.mutateAsync(selectedPlanId);
      toast.success("Subscription plan deleted successfully!");
      setIsDeleteModalOpen(false);
    } catch {
      toast.error("Failed to delete subscription plan.");
    } finally {
      setDeletingId(null);
      setSelectedPlanId(null);
    }
  };

  const openViewModal = (plan: SubscriptionPlan) => {
    setSelectedPlanDetails(plan);
    setIsViewModalOpen(true);
  };

  if (isLoading) return <p className="p-6">Loading...</p>;
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-green-100 text-left text-gray-700">
              <th className="px-4 py-3">Subscriptions Packages</th>
              <th className="px-4 py-3">Amenities</th>
              <th className="px-4 py-3">Subscription Type</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
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
                    <Eye size={18} className="cursor-pointer" />
                  </button>

                  {/* Delete */}
                  <AlertDialog
                    open={isDeleteModalOpen}
                    onOpenChange={setIsDeleteModalOpen}
                  >
                    <AlertDialogTrigger asChild>
                      <button
                        className="p-2 rounded-full hover:bg-red-100 text-red-600 cursor-pointer"
                        onClick={() => openDeleteModal(plan._id)}
                        disabled={deletingId === plan._id}
                      >
                        <Trash2 size={18} />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this subscription
                          plan? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          disabled={deletingId === plan._id}
                          className="cursor-pointer"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW MODAL — styled like the screenshot */}
      {selectedPlanDetails && (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="mx-auto container rounded-2xl p-0 ">
            <div className="relative p-6">
              <DialogHeader className="mb-2">
                <DialogTitle className="text-base text-gray-600">
                  Subscriptions Title
                </DialogTitle>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedPlanDetails.name}
                </p>
              </DialogHeader>

              {/* Message */}
              <div className="mb-5">
                <p className="text-sm font-semibold text-gray-700 mb-1">
                  Message
                </p>
                <DialogDescription className="text-[15px] leading-6 text-gray-700">
                  {selectedPlanDetails.description}
                </DialogDescription>
              </div>

              {/* Two-column: Type & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Secretions Type
                  </p>
                  <p className="text-gray-800">
                    {selectedPlanDetails.billingCycle}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Prices
                  </p>
                  <p className="text-gray-800">
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
                      className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm text-gray-700 cursor-pointer"
                    >
                      {tag}
                      <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 cursor-pointer">
                        <X className="h-3 w-3 cursor-pointer" />
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
