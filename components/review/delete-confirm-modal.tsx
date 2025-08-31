"use client"

import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-red-100">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <DialogTitle className="text-lg font-semibold text-gray-900">
            {title}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            {message}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-50 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
