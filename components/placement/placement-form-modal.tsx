"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Placement } from "@/lib/types"

interface PlacementFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (placementData: Partial<Placement>) => void
  placement?: Placement | null
  mode: "create" | "edit"
}

export function PlacementFormModal({ isOpen, onClose, onSave, placement, mode }: PlacementFormModalProps) {
  const [formData, setFormData] = useState({
    customerName: placement?.customer.name || "",
    customerEmail: placement?.customer.email || "",
    customerPhone: placement?.customer.phone || "",
    facilityName: placement?.facility.name || "",
    facilityLocation: placement?.facility.location || "",
    placementDate: placement?.placementDate || "",
    moveInDate: placement?.moveInDate || "",
    amount: placement?.amount?.toString() || "",
    commission: placement?.commission?.toString() || "",
    status: placement?.status || "Pending",
    notes: placement?.notes || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const placementData: Partial<Placement> = {
      customer: {
        id: placement?.customer.id || `customer-${Date.now()}`,
        name: formData.customerName,
        email: formData.customerEmail,
        phone: formData.customerPhone,
      },
      facility: {
        id: placement?.facility.id || `facility-${Date.now()}`,
        name: formData.facilityName,
        location: formData.facilityLocation,
        image: placement?.facility.image || "/assisted-living-facility.png",
        price: Number.parseInt(formData.amount) || 0,
      },
      placementDate: formData.placementDate,
      moveInDate: formData.moveInDate,
      amount: Number.parseInt(formData.amount) || 0,
      commission: Number.parseInt(formData.commission) || 0,
      status: formData.status as Placement["status"],
      notes: formData.notes,
    }

    onSave(placementData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-semibold">
            {mode === "create" ? "Add Placement" : "Edit Placement"}
          </DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-auto">
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Customer Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="customerEmail">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="customerPhone">Phone</Label>
                  <Input
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Facility Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Facility Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facilityName">Facility Name</Label>
                  <Input
                    id="facilityName"
                    value={formData.facilityName}
                    onChange={(e) => handleInputChange("facilityName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="facilityLocation">Location</Label>
                  <Input
                    id="facilityLocation"
                    value={formData.facilityLocation}
                    onChange={(e) => handleInputChange("facilityLocation", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Placement Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Placement Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="placementDate">Placement Date</Label>
                  <Input
                    id="placementDate"
                    type="date"
                    value={formData.placementDate}
                    onChange={(e) => handleInputChange("placementDate", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="moveInDate">Move-in Date</Label>
                  <Input
                    id="moveInDate"
                    type="date"
                    value={formData.moveInDate}
                    onChange={(e) => handleInputChange("moveInDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="commission">Commission ($)</Label>
                  <Input
                    id="commission"
                    type="number"
                    value={formData.commission}
                    onChange={(e) => handleInputChange("commission", e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about the placement..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {mode === "create" ? "Create Placement" : "Update Placement"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
