// API service layer with mock data
import type {
  User,
  Facility,
  ServiceProvider,
  Customer,
  DashboardStats,
  ChartData,
  Review,
  Notification,

  BlogPost,
  BlogCategory,
  BlogStats,
  Placement,
  TourBooking,
  PlacementStats,
  ReferralFee,
  ReferralStats,

} from "./types";

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

const mockChartData: ChartData[] = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 120 },
  { month: "Mar", value: 140 },
  { month: "Apr", value: 110 },
  { month: "May", value: 160 },
  { month: "Jun", value: 180 },
  { month: "Jul", value: 150 },
  { month: "Aug", value: 170 },
  { month: "Sep", value: 190 },
  { month: "Oct", value: 200 },
  { month: "Nov", value: 180 },
  { month: "Dec", value: 220 },
];

const mockBlogCategories: BlogCategory[] = [
  {
    id: "1",
    name: "Senior Care Tips",
    slug: "senior-care-tips",
    description: "Helpful tips and advice for senior care",
    color: "#10B981",
    postCount: 8,
  },
  {
    id: "2",
    name: "Health & Wellness",
    slug: "health-wellness",
    description: "Health and wellness information for seniors",
    color: "#3B82F6",
    postCount: 6,
  },
  {
    id: "3",
    name: "Family Resources",
    slug: "family-resources",
    description: "Resources and guides for families",
    color: "#8B5CF6",
    postCount: 4,
  },
  {
    id: "4",
    name: "Industry News",
    slug: "industry-news",
    description: "Latest news in senior care industry",
    color: "#F59E0B",
    postCount: 3,
  },
];

const mockBlogPost: BlogPost = {
  id: "1",
  title: "Essential Guide to Choosing the Right Senior Care Facility",
  slug: "essential-guide-choosing-senior-care-facility",
  excerpt:
    "Learn the key factors to consider when selecting a senior care facility for your loved one, including location, services, and cost considerations.",
  content:
    "When it comes to choosing the right senior care facility for your loved one, there are many important factors to consider...",
  featuredImage: "/blog-senior-care-guide.png",
  author: {
    id: "1",
    name: "Dr. Sarah Johnson",
    avatar: "/professional-woman-diverse.png",
    email: "sarah.johnson@example.com",
  },
  category: mockBlogCategories[0],
  tags: ["senior care", "family guidance", "healthcare"],
  status: "Published",
  publishDate: "2024-01-15",
  createdDate: "2024-01-10",
  updatedDate: "2024-01-15",
  views: 1250,
  readTime: 8,
  seoTitle: "How to Choose the Right Senior Care Facility - Complete Guide",
  seoDescription:
    "Comprehensive guide to selecting the perfect senior care facility. Learn about costs, services, and key factors to consider.",
};

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
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      totalFacilities: 1234,
      totalServiceProviders: 1234,
      totalCustomers: 1234,
      totalPlacements: 1234,
      earnings: 1234,
      facilitiesGrowth: 30,
      serviceProvidersGrowth: 30,
      customersGrowth: 30,
      placementsGrowth: 30,
      earningsGrowth: 30,
    };
  },

  getChartData: async (): Promise<ChartData[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockChartData;
  },

  getFacility: async (id: string): Promise<Facility> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ...mockFacility, id };
  },

  // Service Providers
  getServiceProviders: async (
    page = 1,
    limit = 10
  ): Promise<{ providers: ServiceProvider[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const providers = Array.from({ length: 12 }, (_, i) => ({
      id: `provider-${i + 1}`,
      name: "Olivia Rhye",
      email: "olivia@untitledui.com",
      phone: `(${300 + i}) 555-01${i.toString().padStart(2, "0")}`,
      avatar: "/professional-person.png",
      facility: {
        id: "facility-1",
        name: "Sunny Hills Assisted Living",
        location: "Florida, USA",
        image: "/assisted-living-facility.png",
      },
      serviceProvided: 123,
      subscription:
        i % 3 === 0 ? ("Unsubscribed" as const) : ("Subscribed" as const),
      documents: [
        {
          id: "1",
          type: "National ID Card" as const,
          format: "PDF",
          size: "1.8 MB",
          uploadedDate: "1/10/2024",
          url: "#",
        },
      ],
    }));
    return {
      providers: providers.slice((page - 1) * limit, page * limit),
      total: providers.length,
    };
  },

  getServiceProvider: async (id: string): Promise<ServiceProvider> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id,
      name: "Olivia Rhye",
      email: "bessieedwards@gmail.com",
      phone: "+1 (555) 123-4567",
      avatar: "/professional-woman-with-red-flower.png",
      facility: {
        id: "facility-1",
        name: "Sunny Hills Assisted Living",
        location: "Florida, USA",
        image: "/assisted-living-facility.png",
      },
      serviceProvided: 123,
      subscription: "Subscribed",
      documents: [
        {
          id: "1",
          type: "National ID Card",
          format: "PDF",
          size: "1.8 MB",
          uploadedDate: "1/10/2024",
          url: "#",
        },
        {
          id: "2",
          type: "Business Registration Certificate",
          format: "PDF",
          size: "1.8 MB",
          uploadedDate: "1/10/2024",
          url: "#",
        },
        {
          id: "3",
          type: "Professional & Qualification Documents",
          format: "PDF",
          size: "1.8 MB",
          uploadedDate: "1/10/2024",
          url: "#",
        },
        {
          id: "4",
          type: "Health & Safety Documents",
          format: "PDF",
          size: "1.8 MB",
          uploadedDate: "1/10/2024",
          url: "#",
        },
      ],
    };
  },

  // Customers
  getCustomers: async (
    page = 1,
    limit = 10
  ): Promise<{ customers: Customer[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const customers = Array.from({ length: 12 }, (_, i) => ({
      id: `customer-${i + 1}`,
      name: "Olivia Rhye",
      email: "olivia@untitledui.com",
      phone:
        i % 3 === 0
          ? undefined
          : `(${200 + i}) 555-01${i.toString().padStart(2, "0")}`,
      avatar: "/diverse-group.png",
      location: "2972 Westheimer Rd, Santa Ana, Illinois",
      totalTours: 123,
      totalPlacements: 123,
      joiningDate: "Jan 06, 2025",
      tourHistory: [],
      bookingHistory: [],
    }));
    return {
      customers: customers.slice((page - 1) * limit, page * limit),
      total: customers.length,
    };
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

  // Notifications
  getNotifications: async (): Promise<Notification[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Array.from({ length: 9 }, (_, i) => ({
      id: `notification-${i + 1}`,
      title: "Notification Title",
      message: "Here's notification text.",
      time: "34m ago",
      type: "Properties Listing" as const,
    }));
  },


  declineListing: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  getCurrentUser: async (): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockUser;
  },

  // Blog Posts
  getBlogPosts: async (
    page = 1,
    limit = 10,
    status?: string,
    category?: string
  ): Promise<{ posts: BlogPost[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const posts = Array.from({ length: 21 }, (_, i) => ({
      ...mockBlogPost,
      id: `post-${i + 1}`,
      title: [
        "Essential Guide to Choosing the Right Senior Care Facility",
        "10 Warning Signs Your Loved One Needs Assisted Living",
        "Understanding Memory Care: What Families Need to Know",
        "The Complete Guide to Senior Care Costs and Insurance",
        "How to Prepare for the Transition to Senior Living",
        "Nutrition and Wellness Programs in Senior Care",
        "Technology in Senior Care: Improving Quality of Life",
        "Creating a Safe Home Environment for Aging Adults",
        "The Importance of Social Activities in Senior Communities",
        "Managing Medications: A Guide for Caregivers",
        "Physical Therapy Benefits for Senior Citizens",
        "Dealing with Dementia: Support for Families",
        "Senior Care During Holiday Seasons",
        "The Role of Family in Senior Care Decisions",
        "Understanding Different Levels of Senior Care",
        "Financial Planning for Long-term Senior Care",
        "Mental Health Support in Senior Living Communities",
        "Choosing Between In-home Care and Facility Care",
        "The Benefits of Pet Therapy for Seniors",
        "Emergency Preparedness in Senior Care Facilities",
        "Building Strong Relationships with Care Providers",
      ][i % 21],
      slug: `blog-post-${i + 1}`,
      category: mockBlogCategories[i % 4],
      status:
        i % 5 === 0
          ? ("Draft" as const)
          : i % 7 === 0
          ? ("Scheduled" as const)
          : ("Published" as const),
      views: Math.floor(Math.random() * 2000) + 100,
      readTime: Math.floor(Math.random() * 10) + 3,
      publishDate: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
    }));

    let filteredPosts = posts;
    if (status && status !== "all") {
      filteredPosts = posts.filter(
        (post) => post.status.toLowerCase() === status.toLowerCase()
      );
    }
    if (category && category !== "all") {
      filteredPosts = filteredPosts.filter(
        (post) => post.category.slug === category
      );
    }

    return {
      posts: filteredPosts.slice((page - 1) * limit, page * limit),
      total: filteredPosts.length,
    };
  },

  getBlogPost: async (id: string): Promise<BlogPost> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ...mockBlogPost, id };
  },

  createBlogPost: async (postData: Partial<BlogPost>): Promise<BlogPost> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...mockBlogPost,
      id: `post-${Date.now()}`,
      ...postData,
      createdDate: new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
    } as BlogPost;
  },

  updateBlogPost: async (
    id: string,
    postData: Partial<BlogPost>
  ): Promise<BlogPost> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...mockBlogPost,
      id,
      ...postData,
      updatedDate: new Date().toISOString().split("T")[0],
    } as BlogPost;
  },

  deleteBlogPost: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
  },

  // Blog Categories
  getBlogCategories: async (): Promise<BlogCategory[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return mockBlogCategories;
  },

  createBlogCategory: async (
    categoryData: Partial<BlogCategory>
  ): Promise<BlogCategory> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      id: `category-${Date.now()}`,
      postCount: 0,
      ...categoryData,
    } as BlogCategory;
  },

  // Blog Stats
  getBlogStats: async (): Promise<BlogStats> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      totalPosts: 21,
      publishedPosts: 15,
      draftPosts: 4,
      scheduledPosts: 2,
      totalViews: 25430,
      totalCategories: 4,
      postsGrowth: 12,
      viewsGrowth: 18,
    };
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

  // Tours
  getTourBookings: async (
    page = 1,
    limit = 10,
    status?: string
  ): Promise<{ tours: TourBooking[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const tours = Array.from({ length: 32 }, (_, i) => ({
      ...mockTourBooking,
      id: `tour-${i + 1}`,
      customer: {
        ...mockTourBooking.customer,
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
        ...mockTourBooking.facility,
        name: [
          "Sunny Hills Assisted Living",
          "Golden Years Care",
          "Comfort Living Center",
          "Peaceful Gardens",
          "Serenity Manor",
          "Harmony House",
        ][i % 6],
      },
      status: ["Scheduled", "Confirmed", "Completed", "Cancelled", "No-Show"][
        i % 5
      ] as TourBooking["status"],
      tourType: ["In-Person", "Virtual", "Self-Guided"][
        i % 3
      ] as TourBooking["tourType"],
      scheduledDate: new Date(
        Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
      scheduledTime: [
        "9:00 AM",
        "10:00 AM",
        "11:00 AM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
      ][i % 6],
      rating: i % 3 === 0 ? Math.floor(Math.random() * 2) + 4 : undefined,
    }));

    let filteredTours = tours;
    if (status && status !== "all") {
      filteredTours = tours.filter(
        (t) => t.status.toLowerCase() === status.toLowerCase()
      );
    }

    return {
      tours: filteredTours.slice((page - 1) * limit, page * limit),
      total: filteredTours.length,
    };
  },

  getTourBooking: async (id: string): Promise<TourBooking> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ...mockTourBooking, id };
  },

  createTourBooking: async (
    tourData: Partial<TourBooking>
  ): Promise<TourBooking> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...mockTourBooking,
      id: `tour-${Date.now()}`,
      ...tourData,
      createdDate: new Date().toISOString().split("T")[0],
      updatedDate: new Date().toISOString().split("T")[0],
    } as TourBooking;
  },

  updateTourBooking: async (
    id: string,
    tourData: Partial<TourBooking>
  ): Promise<TourBooking> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      ...mockTourBooking,
      id,
      ...tourData,
      updatedDate: new Date().toISOString().split("T")[0],
    } as TourBooking;
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

import axios from "axios";

import { getSession } from "next-auth/react";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// Create axios instance
const apiBase = axios.create({
  baseURL: API_BASE_URL,
});

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

// facilities api intigration

export async function getAllFacilityData(page: number, limit: number) {
  try {
    const res = await apiBase.get(`/facility/all?page=${page}&limit=${limit}`);
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

