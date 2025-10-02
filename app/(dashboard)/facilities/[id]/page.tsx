"use client";

import { useState } from "react";
import Image from "next/image";


import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  useApproveListing,
  useDeclineListing,
  useFacility,
} from "@/hooks/use-facilities";
import { Check, X } from "lucide-react";

interface FacilityDetailsPageProps {
  params: {
    id: string;
  };
}

export default function FacilityDetailsPage({
  params,
}: FacilityDetailsPageProps) {
  const { data: facility, isLoading, error } = useFacility(params.id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const approveMutation = useApproveListing();
  const declineMutation = useDeclineListing();

  const handleApprove = (id: string) => {
    approveMutation.mutate({ id, status: "approved" });
  };

  const handleDecline = (id: string) => {
    declineMutation.mutate({ id, status: "decline" });
  };

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (error || !facility)
    return (
      <div className="flex h-screen items-center justify-center">Not found</div>
    );

  const selectedImage = facility?.images?.[selectedImageIndex]?.url;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 pt-10 gap-6 relative">
      {/* Left Column → All Text */}
      <div className="space-y-6">
        {/* Availability + Title */}
        <div className="">
          <p className="text-[#343A40] text-[16px]">Availabilty</p>
          <Badge
            className={
              facility.availability
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          >
            {facility.availability ? "Available" : "Not Available"}
          </Badge>

          <h1 className="text-[16px] pt-[24px] font-semibold">Name</h1>
          <p className="text-[#6C757D] text-[16px] font-normal leading-[150%]">
            {facility.name}
          </p>
        </div>
        <div>
          <h2 className="text-[16px] font-semibold pt-[24px]">Location</h2>
          <p className="text-[#6C757D] text-[16px] font-normal leading-[150%]">
            {facility.location}
          </p>
        </div>
        <div>
          <h2 className="text-[16px] font-semibold pt-[24px]">Discription</h2>
          <p className="text-[#6C757D] text-[16px] font-normal leading-[150%]">
            {facility.description}
          </p>
        </div>
        <div>
          <h2 className="text-[16px] font-semibold pt-[24px]">Price</h2>
          <p className="text-[#6C757D] text-[16px] font-normal leading-[150%]">
            ${facility.price}
          </p>
        </div>
        <div>
          <h4 className="text-[16px] font-semibold pt-[24px]">Amenities</h4>
          <div className=" flex items-center gap-2 text-sm flex-wrap">
            {facility?.amenities?.map((amenity: string, i: number) => (
              <div key={i}>
                <p className="text-[#68706A] bg-[#E6E7E6] border-1 px-4 py-1">
                  {amenity}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Care Offering */}
        <div className="rounded-2xl ">
          <div>
            <h2 className="text-[#343A40] text-[24px] font-bold ">
              Care Offering
            </h2>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-6 ">
              <div>
                <h4 className="font-medium mb-2 pt-[24px]">Care Services</h4>
                <div className="flex items-center gap-2 text-sm flex-wrap">
                  {facility?.careServices?.map((service: string, i: number) => (
                    <div key={i} className="">
                      <p className="flex items-center gap-2 text-[#68706A] bg-[#E6E7E6] border-1 px-4 py-1">
                        <Check className="w-4 h-4 text-green-400" /> {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-2xl shadow-md p-4">
          <h2 className="text-xl  font-semibold">
            About{" "}
            <span className="text-green-300">Sunny Hills Assisted Living</span>
          </h2>
          <p className="mt-2  text-[16px] text-[#68706A]">
            Sunny Hills offers a vibrant community, dedicated caregivers, and a
            wide range of amenities designed to provide comfort and security.
            Residents enjoy social activities, wellness programs, and delicious
            meals while living in a welcoming environment.
          </p>

          <h2 className="text-[20px] pt-[32px]">
            Why Choose Sunny Hills Assisted Living?
          </h2>
          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>
              🏡 Comfortable Living Spaces – Modern rooms and cozy common areas
              designed for relaxation.
            </li>
            <li>
              👩‍⚕️ Personalized Care Plans – Tailored assistance to meet
              individual health and lifestyle needs.
            </li>
            <li>
              🍲 Nutritious Dining – Fresh, chef-prepared meals served daily.
            </li>
          </ul>
        </div>

        {/* Video Section */}
        {facility.uploadVideo && (
          <div className="rounded-2xl shadow-md p-4">
            <div>
              <h2 className="text-xl text-[32px] py-5 font-semibold">
                {facility?.videoTitle}{" "}
                <span className="text-green-400">Tour</span>
              </h2>

              {/* Video Description */}
              <p className="text-[16px] text-[#8E938F] py-3">
                {facility?.videoDescription}
              </p>
              <p className="py-3">Video</p>
            </div>

            <div className="relative h-56 rounded-xl overflow-hidden shadow-md bg-gray-100">
              <video
                src={facility.uploadVideo}
                controls
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <div>
          <ul className="flex flex-wrap gap-4">
            {facility.availableTime?.map((item: string, id: number) => (
              <li className="bg-[#E6E7E6] px-4 py-2 shadow-2xs hover:bg-green-300 hover:text-white cursor-pointer" key={id}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column → All Images */}
      <div className="space-y-4 sticky top-0 self-start">
        {/* Main Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden shadow-md">
          <Image
            src={selectedImage}
            alt={facility.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Image Gallery */}
        <div className="flex flex-wrap gap-2">
          {facility.images?.map(
            (img: { public_id: string; url: string }, index: number) => (
              <button
                key={img.public_id}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                  selectedImageIndex === index ? "" : ""
                }`}
              >
                <Image
                  src={img.url}
                  alt={`${facility.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            )
          )}
        </div>
        <div className="col-span-2 flex items-center justify-center gap-2">
          <Button
            size="sm"
            className="bg-green-primary w-1/2 cursor-pointer hover:bg-green-secondary hover:bg-green-900"
            onClick={() => handleApprove(facility._id)}
            disabled={approveMutation.isPending}
          >
            <Check className="h-4 w-4 mr-1" />
            Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-error w-1/2 border-red-error cursor-pointer hover:bg-red-bg bg-transparent hover:bg-green-400 hover:text-white"
            onClick={() => handleDecline(facility._id)}
            disabled={declineMutation.isPending}
          >
            <X className="h-4 w-4 mr-1" />
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}
