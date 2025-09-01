"use client";

import { useState, use } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentModal } from "@/components/document-modal";
import {
  useDocumentByID,
  useServiceProvider,
} from "@/hooks/use-service-providers";
import type { NewDocument } from "@/lib/types";
import ProfileCard from "@/components/profile/ProfileCard";

interface ServiceProviderDetailsPageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

export default function ServiceProviderDetailsPage({
  params,
}: ServiceProviderDetailsPageProps) {
  const { id } = use(params); // <-- unwrap the promise

  const { data: provider, isLoading: isProviderLoading } =
    useServiceProvider(id);
  const { data: documents } = useDocumentByID(id);

  const [selectedDocument, setSelectedDocument] = useState<NewDocument | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDocument = (document: NewDocument) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  const docs: NewDocument[] = documents ?? [];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/service-providers">
              <Button variant="ghost" className="flex items-center cursor-pointer gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Service Providers
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile */}
            <div className="lg:col-span-1">
              {isProviderLoading ? (
                <div className="w-96 mx-auto h-[400px] rounded-lg bg-gray-300 animate-pulse"></div>
              ) : (
                <ProfileCard userId={id} />
              )}
            </div>

            {/* Right Column - Documents */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Manage uploaded documents.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {docs.map((document) => (
                    <div
                      key={document._id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{document.type}</h4>
                      </div>
                      <Button
                        variant="ghost"
                        className="cursor-pointer"
                        size="icon"
                        onClick={() => handleViewDocument(document)}
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
      <DocumentModal
        document={selectedDocument}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
