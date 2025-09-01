// Core data types for the healthcare dashboard
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  since?: string;
}

export interface Facility {
  _id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  availability: boolean;
  status: FacilityStatus;
  createdOn: string;
  totalPlacement: number;
  totalTour: number;
  totalEarnings: number;
  images: {
    public_id: string;
    url: string;
    _id: string;
  }[];
  amenities: string[];
  careServices: string[];
  availableTimes: string[];
  video?: {
    title: string;
    description: string;
    url: string;
  };
  createdAt?: string;
}

export interface ServiceProvider {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phoneNum: string;
  avatar?: {
    url: string;
  };
  facility: {
    id: string;
    name: string;
    location: string;
    image: string;
  };
  stree: string;
  onboardingStatus: boolean;
  subscriptionStatus: SubscriptionStatus;
  documents: Document[];
}

export interface NewDocument {
  _id: string;
  type: string; // Example: "Identity & Legal Documents"
  file: {
    url: string;
    public_id: string;
  };
  uploader: {
    avatar: {
      public_id: string;
      url: string;
    };
    verificationInfo: {
      token: string;
      verified: boolean;
    };
    subscriptionStatus: string;
    isSubscriptionActive: boolean;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    gender: string;
    avatars: string;
    bio: string;
    street: string;
    postCode: number;
    phoneNum: string;
    dateOfBirth: string; // ISO string
    password_reset_token: string;
    refresh_token: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    onboardingStatus: boolean;
    stripeAccountId: string;
    accountLink: string;
    totalPlacement: number;
    totalTour: number;
    __v: number;
  };
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
}

export interface Customer {
  bio: string;
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  location: string;
  totalTours: number;
  totalPlacements: number;
  joiningDate: string;
  tourHistory: Tour[];
  bookingHistory: Booking[];
}

export interface Tour {
  id: string;
  placeName: string;
  placeImage: string;
  location: string;
  scheduledDate: string;
  scheduledTime: string;
  status: TourStatus;
}

export interface Booking {
  id: string;
  placeName: string;
  placeImage: string;
  bookedDate: string;
  checkInTime: string;
  status: BookingStatus;
}

export interface Review {
  star: number;
  facility: {
    _id: string;
    name: string;
    address: string;
  };
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  _id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  location: string;
  date: string;
}

export interface DashboardStats {
  totalFacilities: number;
  totalServiceProviders: number;
  totalCustomers: number;
  totalPlacements: number;
  earnings: number;
  facilitiesGrowth: number;
  serviceProvidersGrowth: number;
  customersGrowth: number;
  placementsGrowth: number;
  earningsGrowth: number;
}

export interface ChartData {
  month: string;
  totalEarnings: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type:
    | "Properties Listing"
    | "Properties Booking"
    | "Tour Booking"
    | "Reviews & Ratings";
}

export interface PendingListing {
  id: string;
  facility: Facility;
  createdOn: string;
  status: "Pending";
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    email: string;
  };
  category: BlogCategory;
  tags: string[];
  status: BlogPostStatus;
  publishDate: string;
  createdDate: string;
  updatedDate: string;
  views: number;
  readTime: number;
  seoTitle?: string;
  seoDescription?: string;
  scheduledDate?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color: string;
  postCount: number;
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  totalViews: number;
  totalCategories: number;
  postsGrowth: number;
  viewsGrowth: number;
}

export interface Placement {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  facility: {
    id: string;
    name: string;
    location: string;
    image: string;
    price: number;
  };
  serviceProvider?: {
    id: string;
    name: string;
    email: string;
  };
  placementDate: string;
  moveInDate?: string;
  tourDate?: string;
  status: PlacementStatus;
  amount: number;
  commission: number;
  notes?: string;
  createdDate: string;
  updatedDate: string;
}

export interface TourBooking {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
  facility: {
    id: string;
    name: string;
    location: string;
    image: string;
  };
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in minutes
  tourType: "Virtual" | "In-Person" | "Self-Guided";
  status: TourBookingStatus;
  notes?: string;
  createdDate: string;
  updatedDate: string;
  followUpRequired: boolean;
  rating?: number;
  feedback?: string;
}

export interface PlacementStats {
  totalPlacements: number;
  completedPlacements: number;
  pendingPlacements: number;
  cancelledPlacements: number;
  totalTours: number;
  completedTours: number;
  scheduledTours: number;
  conversionRate: number;
  averageCommission: number;
  totalRevenue: number;
  placementsGrowth: number;
  toursGrowth: number;
  revenueGrowth: number;
}

export interface ReferralFee {
  id: string;
  referrer: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
  };
  customer: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  facility: {
    id: string;
    name: string;
    location: string;
    image: string;
  };
  referralDate: string;
  placementDate?: string;
  feeAmount: number;
  commission: string;
  status: ReferralStatus;
  paymentDate?: string;
  notes?: string;
  createdDate: string;
  updatedDate: string;
}

export interface ReferralStats {
  totalEarnings: number;
  pendingPayments: number;
  totalReferrals: number;
  successfulReferrals: number;
  successRate: number;
  averageFee: number;
  earningsGrowth: number;
  referralsGrowth: number;
}

// Generic utility types for better type safety
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface FormState<T> {
  data: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isDirty: boolean;
}

// Status enums for better type safety
export enum FacilityStatus {
  AVAILABLE = "Available",
  UNAVAILABLE = "Unavailable",
}

export enum SubscriptionStatus {
  SUBSCRIBED = "Subscribed",
  UNSUBSCRIBED = "Unsubscribed",
}

export enum TourStatus {
  UPCOMING = "Upcoming",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export enum BookingStatus {
  PAID = "Paid",
  CANCELLED = "Cancelled",
}

export enum BlogPostStatus {
  PUBLISHED = "Published",
  DRAFT = "Draft",
  SCHEDULED = "Scheduled",
}

export enum PlacementStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
}

export enum TourBookingStatus {
  SCHEDULED = "Scheduled",
  CONFIRMED = "Confirmed",
  COMPLETED = "Completed",
  CANCELLED = "Cancelled",
  NO_SHOW = "No-Show",
}

export enum ReferralStatus {
  PENDING = "Pending",
  PAID = "Paid",
  PROCESSING = "Processing",
  CANCELLED = "Cancelled",
}

export interface FacilityResponse {
  totalAdminShare?: string | number;
  facility?: Facility;
  _id: string;
  availability: boolean;
  name: string;
  location: string;
  description: string;
  price: number;
  userId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  images: {
    public_id: string;
    url: string;
    _id: string;
  }[];
  base: string;
  careServices: string[];
  amenities: string[];
  amenitiesServices: {
    image: { public_id: string; url: string };
    name: string;
  }[];
  about: string;
  videoTitle?: string;
  videoDescription?: string;
  uploadVideo?: string;
  availableTime?: string[];
  facilityLicenseNumber?: string;
  medicaidPrograms: {
    public_id: string;
    url: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  rating?: number;
  ratingCount?: number;
  address?: string;
  status?: string;
}

export interface FacilityAllData {
  data: FacilityResponse[];
  totalPages?: number;
}

// types/notification.ts
export interface INotification {
  _id: string;
  to: string;
  message: string;
  isViewed: boolean;
  type: string;
  id: string; // This seems to reference another entity
  createdAt: string;
  updatedAt: string;
}

// The response structure from your API
export interface NotificationsResponse {
  success: boolean;
  data: INotification[];
  message?: string;
}
