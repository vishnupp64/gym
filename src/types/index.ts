export type Role = 'ADMIN' | 'TRAINER' | 'MEMBER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
  avatarUrl?: string;
}

export type MembershipStatus = 'ACTIVE' | 'EXPIRED' | 'PENDING' | 'FROZEN' | 'CANCELLED';

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  duration: number;
  description?: string | null;
  features?: string[];
  isActive?: boolean;
  isPopular?: boolean;
}

export interface Member {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  plan: string;
  status: MembershipStatus;
  joinDate: string;
  expiryDate: string;
  emergencyContact?: string;
  address?: string;
  avatarUrl?: string;
}

export interface Trainer {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  phone: string;
  specialization: string;
  yearsOfExperience: number;
  salary?: number;
  rating?: number;
  avatarUrl?: string;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  checkInTime: string;
  checkOutTime?: string;
  date: string;
}

export type PaymentStatus =
  | 'PAID'
  | 'PENDING'
  | 'PENDING_VERIFICATION'
  | 'APPROVED'
  | 'REJECTED'
  | 'FAILED'
  | 'REFUNDED';
export type PaymentMethod = 'CARD' | 'CASH' | 'BANK_TRANSFER' | 'UPI';

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail?: string;
  membershipPlanId?: string | null;
  planName?: string | null;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  paymentDate: string;
  transactionId?: string | null;
  screenshotUrl?: string | null;
  rejectionReason?: string | null;
  reviewedAt?: string | null;
}

export type TrainerPaymentStatus = 'PAID' | 'PENDING';

export interface TrainerPayment {
  id: string;
  trainerId: string;
  trainerName: string;
  trainerEmail?: string;
  amount: number;
  status: TrainerPaymentStatus;
  paymentDate: string;
  notes?: string | null;
}

export interface WorkoutPlan {
  id: string;
  memberId: string;
  memberName?: string;
  trainerId?: string | null;
  trainerName?: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface DietPlan {
  id: string;
  memberId: string;
  memberName?: string;
  trainerId?: string | null;
  trainerName?: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface LoginResponse {
  user: User;
  token: string;
}
