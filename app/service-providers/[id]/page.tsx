"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DocumentModal } from "@/components/document-modal"
import { useServiceProvider } from "@/hooks/use-service-providers"
import type { Document } from "@/lib/types"

interface ServiceProviderDetailsPageProps {
  params: {
    id: string
  }
}

export default function ServiceProviderDetailsPage({ params }: ServiceProviderDetailsPageProps) {
  const { data: provider, isLoading, error } = useServiceProvider(params.id)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedDocument(null)
  }

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header
            title="Service Providers Details"
            subtitle="Keep track of all your facilities, update details, and stay organized."
          />
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-primary mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading service provider details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !provider) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <Header
            title="Service Providers Details"
            subtitle="Keep track of all your facilities, update details, and stay organized."
          />
          <div className="flex items-center justify-center h-96">
            <div className="text-center text-red-600">
              <p>Error loading service provider details. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Service Providers Details"
          subtitle="Keep track of all your facilities, update details, and stay organized."
        />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/service-providers">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Service Providers
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-green-primary to-green-secondary text-white">
                <CardContent className="p-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20">
                    <Image
                      src={provider.avatar || "/professional-woman-with-red-flower.png"}
                      alt={provider.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">{provider.name}</h2>
                  <p className="text-white/80 mb-6">{provider.email}</p>

                  <div className="space-y-3 text-left">
                    <div>
                      <span className="text-white/80">Name:</span>
                      <p className="font-medium">{provider.name}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Bio:</span>
                      <p className="font-medium">
                        Fashion designer passionate about creating styles that celebrate individuality and comfort.
                      </p>
                    </div>
                    <div>
                      <span className="text-white/80">Email:</span>
                      <p className="font-medium">{provider.email}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Phone:</span>
                      <p className="font-medium">{provider.phone}</p>
                    </div>
                    <div>
                      <span className="text-white/80">Location:</span>
                      <p className="font-medium">1234 Oak Avenue, San Francisco, CA 94102A</p>
                    </div>
                    <div>
                      <span className="text-white/80">Since:</span>
                      <p className="font-medium">14 August, 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Documents */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <p className="text-sm text-gray-600">Manage your personal information and profile details.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {provider.documents.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{document.type}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{document.format}</span>
                          <span>{document.size}</span>
                          <span>Uploaded: {document.uploadedDate}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDocument(document)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Document Modal */}
      <DocumentModal document={selectedDocument} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  )
}
