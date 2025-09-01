// API service layer with mock data
import type {
  User,
  Facility,
  ServiceProvider,
  Customer,
  ChartData,
  Review,
  Placement,
  TourBooking,
  PlacementStats,
  ReferralFee,
  ReferralStats,
  NotificationsResponse,
  INotification,
  NewDocument,
} from "./types";

import axios from "axios";
import { getSession } from "next-auth/react";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Create axios instance
const apiBase = axios.create({
  baseURL: API_BASE_URL,
});

// Mock data
const mockUser: User = {
  id: "1",
  name: "Olivia Rhye",
  email: "olivia@untitledui.com",
  avatar: "/professional-woman-diverse.png",
};

const mockFacility: Facility = {
  id: "1",
  name: "Sunny Hills Assisted Living",
  location: "Florida, USA",
  description:
    "Sunny Hills Assisted Living offers a warm and welcoming environment for seniors, providing personalized care, comfortable accommodations, and engaging activities.",
  price: 2200,
  status: "Available",
  createdOn: "06/01/2025",
  totalPlacements: 123,
  totalTours: 123,
  totalEarnings: 1234,
  images: [
    "/modern-assisted-living-facility-exterior.png",
    "/assisted-living-interior-room.png",
    "/assisted-living-dining-area.png",
    "/assisted-living-garden.png",
    "/assisted-living-common-area.png",
  ],
  amenities: [
    "Assisted Living",
    "Memory Care",
    "Medication Management",
    "ADT Tracking Support",
    "Nutritious Meals",
    "Housekeeping & Laundry",
    "Transportation Services",
    "Social & Recreational Activities",
    "Outdoor Garden",
    "Furnished",
    "Emergency Alert System",
    "Move-in coordination",
    "Meal preparation and service",
    "Community-sponsored activities",
    "Pet-friendly",
    "Faith-based",
    "Special dietary restrictions",
  ],
  careServices: ["Assisted Living", "Memory Care"],
  availableTimes: [
    "12:00 PM",
    "11:00 AM",
    "10:00 AM",
    "09:00 AM",
    "11:00 AM",
    "10:00 AM",
    "09:00 AM",
    "11:00 AM",
  ],
  video: {
    title: "Villa Tour",
    description:
      "Set apart from the main community building, our villas offer spacious 2-bedroom, 2-bathroom layouts complete with an attached parking garage and private enclosed patio designed for comfort, convenience, and independence.",
    url: "/assisted-living-villa-tour-video-thumbnail.png",
  },
};

// const mockChartData: ChartData[] = [
//   { month: "Jan", value: 100 },
//   { month: "Feb", value: 120 },
//   { month: "Mar", value: 140 },
//   { month: "Apr", value: 110 },
//   { month: "May", value: 160 },
//   { month: "Jun", value: 180 },
//   { month: "Jul", value: 150 },
//   { month: "Aug", value: 170 },
//   { month: "Sep", value: 190 },
//   { month: "Oct", value: 200 },
//   { month: "Nov", value: 180 },
//   { month: "Dec", value: 220 },
// ];

const mockPlacement: Placement = {
  id: "1",
  customer: {
    id: "1",
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    phone: "+1 (555) 123-4567",
    avatar: "/diverse-group.png",
  },
  facility: {
    id: "1",
    name: "Sunny Hills Assisted Living",
    location: "Florida, USA",
    image: "/assisted-living-facility.png",
    price: 2200,
  },
  serviceProvider: {
    id: "1",
    name: "CareGivers Plus",
    email: "contact@caregiversplus.com",
  },
  placementDate: "2024-01-15",
  moveInDate: "2024-02-01",
  tourDate: "2024-01-10",
  status: "Completed",
  amount: 2200,
  commission: 220,
  notes: "Customer was very satisfied with the facility tour and amenities.",
  createdDate: "2024-01-05",
  updatedDate: "2024-01-15",
};

const mockTourBooking: TourBooking = {
  id: "1",
  customer: {
    id: "1",
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    phone: "+1 (555) 123-4567",
    avatar: "/diverse-group.png",
  },
  facility: {
    id: "1",
    name: "Sunny Hills Assisted Living",
    location: "Florida, USA",
    image: "/assisted-living-facility.png",
  },
  scheduledDate: "2024-01-10",
  scheduledTime: "10:00 AM",
  duration: 60,
  tourType: "In-Person",
  status: "Completed",
  notes: "Customer interested in memory care services.",
  createdDate: "2024-01-05",
  updatedDate: "2024-01-10",
  followUpRequired: true,
  rating: 5,
  feedback:
    "Excellent facility with caring staff. Very impressed with the amenities.",
};

const mockReferralFee: ReferralFee = {
  id: "1",
  referrer: {
    id: "1",
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    avatar: "/diverse-group.png",
    phone: "+1 (555) 123-4567",
  },
  customer: {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 987-6543",
  },
  facility: {
    id: "1",
    name: "Sunny Hills Assisted Living",
    location: "Florida, USA",
    image: "/assisted-living-facility.png",
  },
  referralDate: "2024-01-15",
  placementDate: "2024-02-01",
  feeAmount: 350,
  commission: "5%",
  status: "Paid",
  paymentDate: "2024-02-15",
  notes: "Successful referral with quick placement",
  createdDate: "2024-01-15",
  updatedDate: "2024-02-15",
};

// API functions
export type ApiType = typeof api;

export const api = {
  // Dashboard
  getDashboardStats: async () => {
    try {
      const res = await apiBase.get(`/dashboard/admin-dashboard`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching facilities:", error);
      return { data: [], totalPages: 1 };
    }
  },

  getChartData: async (): Promise<ChartData[]> => {
    try {
      const res = await apiBase.get(`dashboard/admin-dashboard/total/earnings`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching facilities:", error);
      return { data: [], totalPages: 1 };
    }
  },

  // Facilities
  getFacilities: async (
    page = 1,
    limit = 10
  ): Promise<{ facilities: Facility[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const facilities = Array.from({ length: 12 }, (_, i) => ({
      ...mockFacility,
      id: `facility-${i + 1}`,
      status: i % 4 === 3 ? ("Unavailable" as const) : ("Available" as const),
    }));
    return {
      facilities: facilities.slice((page - 1) * limit, page * limit),
      total: facilities.length,
    };
  },

  // Service Providers
  getServiceProviders: async (
    page = 1,
    limit = 10,
    search?: string
  ): Promise<{ providers: ServiceProvider[]; total: number }> => {
    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = apiBase.get(
      `/user/organizations?page=${page}&limit=${limit}${searchParam}`
    );

    const result = (await response).data;

    return result.data;

    return result.data;
  },

  getServiceProvider: async (id: string): Promise<ServiceProvider> => {
    const response = await apiBase.get(`/user/organizations}`);

    // const response = await apiBase.get(`/user/organizations}`);

    const result = await response;

    return result.data;
  },

  getDocumentByID: async (id: string): Promise<NewDocument[]> => {
  const response = await apiBase.get(`/document/uploader/${id}`);
  // API response structure: { success: true, data: [...] }
  return Array.isArray(response.data.data) ? response.data.data : [];
},


  getCustomer: async (id: string): Promise<Customer> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      name: "Olivia Rhye",
      email: "bessieedwards@gmail.com",
      phone: "+1 (555) 123-4567",
      avatar: "/professional-woman-with-red-flower.png",
      location: "1234 Oak Avenue, San Francisco, CA 94102A",
      totalTours: 123,
      totalPlacements: 123,
      joiningDate: "14 August, 2025",
      bio: "Fashion designer passionate about creating styles that celebrate individuality and comfort.",
      tourHistory: Array.from({ length: 5 }, (_, i) => ({
        id: `tour-${i + 1}`,
        placeName: "Sunny Hills Assisted Living",
        placeImage: "/assisted-living-facility.png",
        location: "North Port, Florida",
        scheduledDate: "12/08/2025",
        scheduledTime: "11:00 AM",
        status:
          i === 0
            ? ("Upcoming" as const)
            : i === 2
            ? ("Cancelled" as const)
            : ("Completed" as const),
      })),
      bookingHistory: Array.from({ length: 5 }, (_, i) => ({
        id: `booking-${i + 1}`,
        placeName: "Sunny Hills Assisted Living",
        placeImage: "/assisted-living-facility.png",
        bookedDate: "06/01/2025",
        checkInTime: "12:00 PM",
        status: i === 3 ? ("Cancelled" as const) : ("Paid" as const),
      })),
    };
  },

  // Reviews
  getRecentReviews: async (): Promise<Review[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Array.from({ length: 2 }, (_, i) => ({
      id: `review-${i + 1}`,
      customerName: "Connect Directly",
      customerAvatar: "/diverse-group.png",
      rating: 4,
      comment:
        "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent.",
      location: "Portland, OR",
      date: "2 days ago",
    }));
  },

  declineListing: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  getCurrentUser: async (): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUser;
  },

  // Placements
  getPlacements: async (
    page = 1,
    limit = 10,
    status?: string
  ): Promise<{ placements: Placement[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const placements = Array.from({ length: 24 }, (_, i) => ({
      ...mockPlacement,
      id: `placement-${i + 1}`,
      customer: {
        ...mockPlacement.customer,
        name: [
          "Olivia Rhye",
          "Michael Chen",
          "Sarah Wilson",
          "David Thompson",
          "Lisa Anderson",
          "Robert Garcia",
          "Emily Davis",
          "James Rodriguez",
        ][i % 8],
        email: `customer${i + 1}@example.com`,
      },
      facility: {
        ...mockPlacement.facility,
        name: [
          "Sunny Hills Assisted Living",
          "Golden Years Care",
          "Comfort Living Center",
          "Peaceful Gardens",
          "Serenity Manor",
          "Harmony House",
        ][i % 6],
      },
      status: ["Pending", "Confirmed", "Completed", "Cancelled"][
        i % 4
      ] as Placement["status"],
      amount: Math.floor(Math.random() * 2000) + 1500,
      commission: Math.floor(Math.random() * 300) + 150,
      placementDate: new Date(
        Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
    }));

    let filteredPlacements = placements;
    if (status && status !== "all") {
      filteredPlacements = placements.filter(
        (p) => p.status.toLowerCase() === status.toLowerCase()
      );
    }

    return {
      placements: filteredPlacements.slice((page - 1) * limit, page * limit),
      total: filteredPlacements.length,
    };
  },

  getPlacement: async (id: string): Promise<Placement> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ...mockPlacement, id };
  },

  createPlacement: async (
    placementData: Partial<Placement>
  ): Promise<Placement> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...mockPlacement,
      id: `placement-${Date.now()}`,
      ...placementData,
      createdDate: new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
    } as Placement;
  },

  updatePlacement: async (
    id: string,
    placementData: Partial<Placement>
  ): Promise<Placement> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...mockPlacement,
      id,
      ...placementData,
      updatedDate: new Date().toISOString().split("T")[0],
    } as Placement;
  },

  // Placement Stats
  getPlacementStats: async (): Promise<PlacementStats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      totalPlacements: 1234,
      completedPlacements: 987,
      pendingPlacements: 123,
      cancelledPlacements: 124,
      totalTours: 1856,
      completedTours: 1456,
      scheduledTours: 234,
      conversionRate: 78.5,
      averageCommission: 285,
      totalRevenue: 2456789,
      placementsGrowth: 15,
      toursGrowth: 22,
      revenueGrowth: 18,
    };
  },

  // Referral Fees
  getReferralFees: async (
    page = 1,
    limit = 10,
    status?: string
  ): Promise<{ referrals: ReferralFee[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const referrals = Array.from({ length: 28 }, (_, i) => ({
      ...mockReferralFee,
      id: `referral-${i + 1}`,
      referrer: {
        ...mockReferralFee.referrer,
        name: [
          "Olivia Rhye",
          "Michael Chen",
          "Sarah Wilson",
          "David Thompson",
          "Lisa Anderson",
          "Robert Garcia",
          "Emily Davis",
          "James Rodriguez",
        ][i % 8],
        email: `referrer${i + 1}@example.com`,
      },
      customer: {
        ...mockReferralFee.customer,
        name: [
          "John Smith",
          "Mary Johnson",
          "Robert Brown",
          "Jennifer Davis",
          "William Wilson",
          "Patricia Miller",
          "Richard Moore",
          "Linda Taylor",
        ][i % 8],
        email: `customer${i + 1}@example.com`,
      },
      facility: {
        ...mockReferralFee.facility,
        name: [
          "Sunny Hills Assisted Living",
          "Golden Years Care",
          "Comfort Living Center",
          "Peaceful Gardens",
          "Serenity Manor",
          "Harmony House",
        ][i % 6],
      },
      status: ["Pending", "Paid", "Processing", "Cancelled"][
        i % 4
      ] as ReferralFee["status"],
      feeAmount: Math.floor(Math.random() * 500) + 200,
      referralDate: new Date(
        Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
      placementDate:
        i % 4 !== 3
          ? new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
          : undefined,
      paymentDate:
        i % 4 === 1
          ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
          : undefined,
    }));

    let filteredReferrals = referrals;
    if (status && status !== "all") {
      filteredReferrals = referrals.filter(
        (r) => r.status.toLowerCase() === status.toLowerCase()
      );
    }

    return {
      referrals: filteredReferrals.slice((page - 1) * limit, page * limit),
      total: filteredReferrals.length,
    };
  },

  getReferralFee: async (id: string): Promise<ReferralFee> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ...mockReferralFee, id };
  },

  createReferralFee: async (
    referralData: Partial<ReferralFee>
  ): Promise<ReferralFee> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...mockReferralFee,
      id: `referral-${Date.now()}`,
      ...referralData,
      createdDate: new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
    } as ReferralFee;
  },

  updateReferralFee: async (
    id: string,
    referralData: Partial<ReferralFee>
  ): Promise<ReferralFee> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...mockReferralFee,
      id,
      ...referralData,
      updatedDate: new Date().toISOString().split("T")[0],
    } as ReferralFee;
  },

  deleteReferralFee: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  // Referral Stats
  getReferralStats: async (): Promise<ReferralStats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      totalEarnings: 45680,
      pendingPayments: 8950,
      totalReferrals: 156,
      successfulReferrals: 124,
      successRate: 79.5,
      averageFee: 368,
      earningsGrowth: 12,
      referralsGrowth: 18,
    };
  },

  processReferralPayment: async (id: string): Promise<ReferralFee> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...mockReferralFee,
      id,
      status: "Paid",
      paymentDate: new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
    };
  },
};

// Add request interceptor to attach token from next-auth session
apiBase.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    } else {
      console.warn("No token in session");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User Related APIs

export async function getUserProfile(userId: string) {
  const response = await apiBase.get(`user/${userId}`);
  return response.data;
}

// get all customers
export async function getCustomers(page: number, limit: number) {
  const response = await apiBase.get(
    `/user/customers?page=${page}&limit=${limit}`
  );
  return response.data;
}

// get single customers data
export async function getSingleCustomer(id: string) {
  const res = await apiBase.get(`/user/${id}`);
  return res.data;
}

// get tour visit bokking detailes
export async function getVisitBooking(id: string) {
  const res = await apiBase.get(`/visit-booking/${id}`);
  return res.data;
}

// get Booking History
export async function getBookingHistory(
  userId: string,
  page: number,
  limit: number
) {
  try {
    const res = await apiBase.get(
      `/bookings/user/${userId}?page=${page}&limit=${limit}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching booking history:", error);
    return { data: [], totalPages: 1 };
  }
}

export async function getRecentBooking(page: number, limit: number) {
  try {
    const res = await apiBase.get(`/bookings?page=${page}&limit=${limit}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching recent bookings:", error);
    throw error;
  }
}
export async function getRecentCustomer(page: number, limit: number) {
  try {
    const res = await apiBase.get(`/bookings?page=${page}&limit=${limit}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching recent bookings:", error);
    throw error;
  }
}

// facilities api intigration

export async function getAllFacilityData() {
  try {
    const res = await apiBase.get(`/payment/all?type=booking`);
    return res.data;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return { data: [], totalPages: 1 };
  }
}

export async function getpendingFacilityData(page: number, limit: number) {
  try {
    const res = await apiBase.get(
      `/facility/all?page=${page}&limit=${limit}&status=pending`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return { data: [], totalPages: 1 };
  }
}

export async function approveListing(id: string, status: string) {
  try {
    const res = await apiBase.put(`/facility/update-status/${id}`, { status });
    return res.data;
  } catch (error) {
    console.error("Error updating facility status:", error);
    return { data: [], totalPages: 1 };
  }
}

//get single facility

export async function getSingleFacility(id: string) {
  try {
    const res = await apiBase.get(`/facility/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return { data: [], totalPages: 1 };
  }
}

export async function getreviewFacility(id: string) {
  try {
    const res = await apiBase.get(`/facility/summary/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return { data: [], totalPages: 1 };
  }
}

export async function getFacilitys() {
  try {
    const res = await apiBase.get(`/facility/all`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching facilities:", error);
    return { data: [] };
  }
}

// get all blogs
export async function getAllBlogs(page: number, limit: number) {
  const response = await apiBase.get(`/blog/all?page=${page}&limit=${limit}`);
  return response.data;
}

// Get single Blog
export async function getSingleBlog(id: string) {
  const res = await apiBase.get(`/blog/${id}`);
  return res.data;
}

// Delete single Blog
export async function deleteSingleBlog(id: string) {
  const res = await apiBase.delete(`/blog/delete/${id}`);
  return res.data;
}

// add blog
export async function createBlogs(
  data: { title: string; description: string },
  image?: File
) {
  try {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    if (image) {
      formData.append("image", image);
    }

    const response = await apiBase.post("/blog/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in createBlogs API:", error);
    throw error;
  }
}
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

// Notification
export async function getNotifications(
  userId: string
): Promise<INotification[]> {
  try {
    const res = await apiBase.get<NotificationsResponse>(
      `/notifications/${userId}`
    );
    if (res.data.success) {
      return res.data.data;
    }
    throw new Error(res.data.message || "Failed to fetch notifications");
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching notifications: ${error.message}`);
    }
    throw new Error("Unknown error occurred while fetching notifications");
  }
}
// lib/api.ts
export async function markNotificationAsRead(
  notificationId: string
): Promise<void> {
  try {
    const res = await apiBase.patch(`/notifications/${notificationId}/read`);
    if (!res.data.success) {
      throw new Error(
        res.data.message || "Failed to mark notification as read"
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error marking notification as read: ${error.message}`);
    }
    throw new Error("Unknown error occurred");
  }
}

export async function clearAllNotifications(userId: string): Promise<void> {
  try {
    const res = await apiBase.delete(`/notifications/${userId}/clear`);
    if (!res.data.success) {
      throw new Error(res.data.message || "Failed to clear notifications");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error clearing notifications: ${error.message}`);
    }
    throw new Error("Unknown error occurred");
  }
}

//review rating deleter

export async function reviewReting() {
  try {
    const res = await apiBase.get(`/review-rating`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching notifications: ${error.message}`);
    }
    throw error;
  }
}

// Update Blog API
export async function updateBlog(
  blogId: string,
  data: { title: string; description: string },
  image?: File
) {
  const formData = new FormData();

  // ✅ text fields append
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // ✅ image append (optional)
  if (image) {
    formData.append("image", image);
  }

  // ✅ API call
  const response = await apiBase.put(`/blog/update/${blogId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}
export async function DeleteReview(id: string) {
  try {
    const res = await apiBase.delete(`/review-rating/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error Deleted you Review: ${error.message}`);
    }
  }
}

// get all booking payment
export async function getAllPayment(type: string, page: number, limit: number) {
  try {
    const res = await apiBase.get(
      `/payment/all?type=${type}&page=${page}&limit=${limit}`
    );
    return res.data;
  } catch {
    throw new Error(`Failed All Booking Data`);
  }
}

// Get All Subscription plan
export async function getAllSubscriptionPlan() {
  try {
    const res = await apiBase.get(`/subscription/get`);
    return res.data;
  } catch {
    throw new Error(`Failed All Subscription Data`);
  }
}

// Delete subscription Plan
export async function deleteSubscriptionPlan(id: string) {
  try {
    const res = await apiBase.delete(`/subscription/delete/${id}`);
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error Deleted Subscription: ${error.message}`);
    }
  }
}
