"use client"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Document } from "@/lib/types"

interface DocumentModalProps {
  document: Document | null
  isOpen: boolean
  onClose: () => void
}

export function DocumentModal({ document, isOpen, onClose }: DocumentModalProps) {
  if (!document) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle>{document.type}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {/* Document preview - showing vintage certificate as example */}
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lowready91__Client_File_.png-RfpH9lgqn8F168q81EaDpJhtMe975B.jpeg"
              alt={document.type}
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Format:</span> {document.format}
            </p>
            <p>
              <span className="font-medium">Size:</span> {document.size}
            </p>
            <p>
              <span className="font-medium">Uploaded:</span> {document.uploadedDate}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
