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
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  status: FacilityStatus;
  createdOn: string;
  totalPlacements: number;
  totalTours: number;
  totalEarnings: number;
  images: string[];
  amenities: string[];
  careServices: string[];
  availableTimes: string[];
  video?: {
    title: string;
    description: string;
    url: string;
  };
}

export interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  facility: {
    id: string;
    name: string;
    location: string;
    image: string;
  };
  serviceProvided: number;
  subscription: SubscriptionStatus;
  documents: Document[];
}

export interface Document {
  id: string;
  type:
    | "National ID Card"
    | "Business Registration Certificate"
    | "Professional & Qualification Documents"
    | "Health & Safety Documents";
  format: string;
  size: string;
  uploadedDate: string;
  url: string;
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
  id: string;
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
  value: number;
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
}

export interface FacilityAllData {
  data: FacilityResponse[];
  totalPages?: number;
}
