"use client";

import { useState, use } from "react";
import { ChevronLeft, Calendar, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteConfirmModal } from "@/components/delete-confirm-modal";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface BlogDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailProps) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mock blog data
  const blog = {
    id: resolvedParams.id,
    title: "Choosing the Right Assisted Living",
    author: "A. Crist",
    date: "23 August 2025",
    readingTime: "5 min read",
    image: "/assisted-living-interior-room.png",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ultrices, viverra velit rutrum, sagittis erat. Fusce nec lacus nec enim ornare volutpat. Phasellus vitae ullamcorper felis. Proin venenatis, velit a maximus suscipit, justo nulla blandit tellus, ut vestibulum magna diam vitae tellus. Aliquam lobortis orci quis lacinia hendrerit. Donec rutrum orci eu aliquam tristique. Morbi ac rhoncus nunc. Mauris rhoncus hendrerit ornare. Donec sed justo ornare, scelerisque nulla ut, tincidunt turpis. Ut eget dolor eu sapien pulvinar facilisis scelerisque in tortor. Quisque vehicula finibus placerat. Sed tempus molestie purus, a rutrum justo dapibus ut. Donec eget est ut sem volutpat facilisis. Vestibulum accumsan neque orcu, ut porttitor ex facilisis elementum.</p>

      <h3>What is assisted living?</h3>
      <p>Assisted living is designed for seniors who value independence but may need extra help with daily activities such as bathing, dressing, medication management, or meal preparation. Unlike nursing homes, assisted living focuses more on lifestyle and community, offering social activities, dining, wellness programs, and personalized care plans.</p>

      <h3>1. Location and Accessibility</h3>
      <ul>
        <li>Is the community close to family and friends?</li>
        <li>Is it easily accessible for visits and medical care?</li>
      </ul>

      <h3>2. Level of Care Provided</h3>
      <ul>
        <li>Does the facility offer help with personal care, memory support, or advanced medical needs?</li>
        <li>Are care plans personalized to each resident?</li>
      </ul>

      <h3>3. Community Environment</h3>
      <ul>
        <li>Is the atmosphere warm and welcoming?</li>
        <li>Are residents engaged in activities, events, and social programs?</li>
      </ul>

      <h3>4. Staff and Caregivers</h3>
      <ul>
        <li>What is the staff-to-resident ratio?</li>
        <li>Are caregivers trained, friendly, and available 24/7?</li>
      </ul>

      <h3>5. Amenities and Services</h3>
      <ul>
        <li>Dining options and nutrition</li>
        <li>Housekeeping and laundry services</li>
        <li>Wellness and fitness programs</li>
        <li>Transportation services</li>
      </ul>

      <h3>6. Costs and Contracts</h3>
      <ul>
        <li>What is included in the monthly fee?</li>
        <li>Are there additional costs for specialized care?</li>
        <li>Is the contract flexible if needs change?</li>
      </ul>

      <h3>When visiting an assisted living facility, prepare a list of questions, such as:</h3>
      <ul>
        <li>What is your approach to resident care?</li>
        <li>What activities are available daily/weekly?</li>
        <li>How do you handle emergencies?</li>
        <li>Can families be involved in care planning?</li>
      </ul>

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at libero ultrices, viverra velit rutrum, sagittis erat. Fusce nec lacus nec enim ornare volutpat. Phasellus vitae ullamcorper felis. Proin venenatis, velit a maximus suscipit, justo nulla blandit tellus, ut vestibulum magna diam vitae tellus. Aliquam lobortis orci quis lacinia hendrerit. Donec rutrum orci eu aliquam tristique. Morbi ac rhoncus nunc. Mauris rhoncus hendrerit ornare. Donec sed justo ornare, scelerisque nulla ut, tincidunt turpis. Ut eget dolor eu sapien pulvinar facilisis scelerisque in tortor. Quisque vehicula finibus placerat. Sed tempus molestie purus, a rutrum justo dapibus ut. Donec eget est ut sem volutpat facilisis. Vestibulum accumsan neque orcu, ut porttitor ex facilisis elementum.</p>
    `,
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Blog deleted successfully");
      router.push("/blogs");
    } catch (error) {
      toast.error("Failed to delete blog");
    } finally {
      setIsDeleting(false);
      setDeleteModal(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/blogs">
            <Button variant="ghost" size="sm" className="p-1">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-green-600">
              Blog Details
            </h1>
            <p className="text-gray-600 mt-1">
              Keep track of all your facilities, update details, and stay
              organized.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
            onClick={() => setDeleteModal(true)}
          >
            Delete
          </Button>
          <Link href={`/blogs/${resolvedParams.id}/edit`}>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Edit
            </Button>
          </Link>
        </div>
      </div>

      {/* Blog Content */}
      <div className="bg-white rounded-lg overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80">
          <Image
            width={800}
            height={600}
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Meta Information */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{blog.readingTime}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {blog.title}
          </h1>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        title="Are You Sure?"
        message="Are you sure you want to delete this blog?"
      />
    </div>
  );
}
