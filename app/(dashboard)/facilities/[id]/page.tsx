"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, Play, Eye } from "lucide-react";
<<<<<<< HEAD


=======
>>>>>>> 0fbeab0ea4a92f641e0e4b0467afba90071e799f
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFacility } from "@/hooks/use-facilities";
import Link from "next/link";

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

  if (isLoading) {
    return <div className="flex h-screen"></div>;
  }

  if (error || !facility) {
    return <div className="flex h-screen"></div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">
          {/* Back button */}
          <div className="mb-6">
            <Link href="/facilities">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Facilities
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Images and Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Availability Badge */}
              <div className="flex items-center gap-2">
                <Badge className="bg-green-bg text-green-success">
                  Available
                </Badge>
              </div>

              {/* Main Image */}
              <div className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={
                    facility.images[selectedImageIndex] ||
                    "/assisted-living-facility.png"
                  }
                  alt={facility.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-5 gap-2">
                {facility.images.slice(0, 5).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? "border-green-primary"
                        : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image || "/assisted-living-facility.png"}
                      alt={`${facility.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Care Offering */}
              <Card>
                <CardHeader>
                  <CardTitle>Care Offering</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Care Services</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {facility.careServices.map((service, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-primary rounded-full"></div>
                            <span className="text-sm">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Amenities Services</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {facility.amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-primary rounded-full"></div>
                            <span className="text-sm">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* About Section */}
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-gray-600">
                        {facility.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">
                        Why Choose {facility.name}?
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-primary rounded-full mt-2"></div>
                          <span>
                            Comfortable Living Spaces - Modern rooms and cozy
                            common areas designed for relaxation.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-primary rounded-full mt-2"></div>
                          <span>
                            Personalized Care Plans - Tailored assistance to
                            meet individual health and lifestyle needs.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-primary rounded-full mt-2"></div>
                          <span>
                            Nutritious Dining - Fresh, chef-prepared meals
                            served daily.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-primary rounded-full mt-2"></div>
                          <span>
                            Engaging Activities - Social, cultural, and
                            recreational programs that keep residents active and
                            happy.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-primary rounded-full mt-2"></div>
                          <span>
                            24/7 Safety & Support - Secure environment with
                            round-the-clock professional staff.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-primary rounded-full mt-2"></div>
                          <span>
                            Family Connection - Open communication and regular
                            updates to keep families reassured.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Section */}
              {facility.video && (
                <Card>
                  <CardHeader>
                    <CardTitle>Video</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">{facility.video.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {facility.video.description}
                        </p>
                      </div>
                      <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={facility.video.url || "/placeholder.svg"}
                          alt={facility.video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            size="lg"
                            className="rounded-full bg-white/90 text-gray-900 hover:bg-white"
                          >
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Facility Info */}
            <div className="space-y-6">
              {/* Basic Info */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {facility.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{facility.location}</p>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span className="font-medium">{facility.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{facility.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-medium">${facility.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Booked:</span>
                      <span className="font-medium">Monthly</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Available Times */}
              <Card>
                <CardHeader>
                  <CardTitle>Available Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {facility.availableTimes.map((time, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="justify-center bg-transparent"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-green-primary hover:bg-green-secondary">
                  <Eye className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  className="w-full text-red-error border-red-error hover:bg-red-bg bg-transparent"
                >
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
