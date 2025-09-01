// API service layer with mock data
import type {
  ServiceProvider,
  ChartData,
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
    const res = await apiBase.get(`dashboard/admin-dashboard/total/earnings`);
    return res.data.data;
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
  },

  getServiceProvider: async (): Promise<ServiceProvider> => {
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
    console.log("hellos");

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

// all pending dataTagErrorSymbol
export async function getpendingallFacilityData() {
  try {
    const res = await apiBase.get(`/facility/all?status=pending`);
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

export async function reviewReting(page: number, limit: number) {
  try {
    const res = await apiBase.get(`/review-rating?page=${page}&limit=${limit}`);
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

  // Update Blog  API
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

// Create Subscription Plan
export async function createSubscriptionPlan(data: {
  name: string;
  description: string;
  price: number;
  currency: string;
  billingCycle: "monthly";
  isActive: boolean;
  features: string[];
}) {
  try {
    const response = await apiBase.post("/subscription/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error in createSubscriptionPlan API:", error);
    throw error;
  }
}
