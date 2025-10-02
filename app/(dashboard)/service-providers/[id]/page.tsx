"use client";

import { useState, use } from "react";
import { ArrowLeft, Eye, FilePlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DocumentModal } from "@/components/document-modal";
import { useDocumentByID } from "@/hooks/use-service-providers";
import type { NewDocument } from "@/lib/types";
import ProfileCard from "@/components/profile/ProfileCard";

interface ServiceProviderDetailsPageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

export default function ServiceProviderDetailsPage({
  params,
}: ServiceProviderDetailsPageProps) {
  const { id } = use(params); // <-- unwrap the promise

  const { data: documents, isLoading: isDocumentsLoading } =
    useDocumentByID(id);

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

  console.log(docs);

  // Profile skeleton component
  const ProfileSkeleton = () => (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Avatar skeleton */}
          <Skeleton className="h-24 w-24 rounded-full" />

          {/* Name skeleton */}
          <div className="text-center space-y-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Details skeleton */}
          <div className="w-full space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>

          {/* Action buttons skeleton */}
          <div className="flex space-x-2 w-full">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Documents skeleton component
  const DocumentsSkeleton = () => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-24" />
        </CardTitle>
        <Skeleton className="h-4 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(5)]?.map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 border rounded-lg min-w-0"
          >
            <div className="flex-1 min-w-0">
              <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-8 w-8 flex-shrink-0 ml-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/service-providers">
              <Button
                variant="ghost"
                className="flex items-center cursor-pointer gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Service Providers
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
            {/* Left Column - Profile */}
            <div className="2xl:col-span-1">
              {isDocumentsLoading ? (
                <ProfileSkeleton />
              ) : (
                <ProfileCard userId={id} />
              )}
            </div>

            {/* Right Column - Documents */}
            <div className="2xl:col-span-2 min-w-0">
              {isDocumentsLoading ? (
                <DocumentsSkeleton />
              ) : (
                <Card className="w-full ">
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      Manage uploaded documents.
                    </p>

                    {docs.length === 0 && (
                      <div className="flex flex-col items-center justify-center text-center py-6 text-gray-500">
                        <FilePlus className="h-20 w-20"/>
                        <p className="text-xl font-medium mt-6">
                          No documents available
                        </p>
                        <p className="text-xl text-gray-400">
                          You haven’t uploaded any documents yet.
                        </p>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {docs?.map((document) => (
                      <div
                        key={document._id}
                        className="flex items-center justify-between p-4 border rounded-lg min-w-0"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">
                            {document.type}
                          </h4>
                          <h4 className="text-base text-[#68706A] mt-1">
                            Uploaded:{" "}
                            {new Date(document.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </h4>
                        </div>
                        <Button
                          variant="ghost"
                          className="cursor-pointer flex-shrink-0 ml-2"
                          size="icon"
                          onClick={() => handleViewDocument(document)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
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
