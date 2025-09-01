"use client";
import { useDeleteSubscriptionPlan, useSubscriptionPlan } from "@/hooks/useAlltSubscription";
import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
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

interface SubscriptionPlan {
  _id: string;
  name: string;
  description: string;
  billingCycle: string;
  price: number;
  currency: string;
}

export default function Subscriptions() {
  const { data, isLoading, isError } = useSubscriptionPlan();
  const plans: SubscriptionPlan[] = data?.data || [];
  const deleteSubscriptionPlanMutation = useDeleteSubscriptionPlan();

  // Delete modal state
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // View details modal state
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<SubscriptionPlan | null>(null);
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
        <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 cursor-pointer">
          + Add
        </button>
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
                  {/* Eye button */}
                  <button
                    className="p-2 rounded-full hover:bg-green-100 text-green-600"
                    onClick={() => openViewModal(plan)}
                  >
                    <Eye size={18} />
                  </button>

                  {/* Delete modal */}
                  <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
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
                          Are you sure you want to delete this subscription plan? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
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

      {/* View Modal */}
      {selectedPlanDetails && (
        <AlertDialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{selectedPlanDetails.name}</AlertDialogTitle>
              <AlertDialogDescription>
                <p><strong>Description:</strong> {selectedPlanDetails.description}</p>
                <p><strong>Billing Cycle:</strong> {selectedPlanDetails.billingCycle}</p>
                <p><strong>Price:</strong> ${selectedPlanDetails.price} {selectedPlanDetails.currency}</p>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
