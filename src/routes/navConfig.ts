import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CreditCard,
  Dumbbell,
  Layers,
  BarChart3,
  Settings,
  ClipboardList,
  Salad,
  Calendar,
  TrendingUp,
  Bell,
  UserCircle,
  type LucideIcon,
} from 'lucide-react';
import type { Role } from '../types';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  end?: boolean;
}

const adminNav: NavItem[] = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/members', label: 'Members', icon: Users },
  { to: '/admin/trainers', label: 'Trainers', icon: Dumbbell },
  { to: '/admin/plans', label: 'Membership Plans', icon: Layers },
  { to: '/admin/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/admin/payments', label: 'Payments', icon: CreditCard },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const trainerNav: NavItem[] = [
  { to: '/trainer', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/trainer/members', label: 'Assigned Members', icon: Users },
  { to: '/trainer/workouts', label: 'Workout Plans', icon: ClipboardList },
  { to: '/trainer/diets', label: 'Diet Plans', icon: Salad },
  { to: '/trainer/schedule', label: 'Schedule', icon: Calendar },
  { to: '/trainer/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/trainer/progress', label: 'Member Progress', icon: TrendingUp },
  { to: '/trainer/payments', label: 'Member Fees', icon: CreditCard },
  { to: '/trainer/settings', label: 'Settings', icon: Settings },
];

const memberNav: NavItem[] = [
  { to: '/member', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/member/membership', label: 'My Membership', icon: Layers },
  { to: '/member/attendance', label: 'My Attendance', icon: CalendarCheck },
  { to: '/member/workouts', label: 'Workout Plans', icon: ClipboardList },
  { to: '/member/diets', label: 'Diet Plans', icon: Salad },
  { to: '/member/payments', label: 'Payment History', icon: CreditCard },
  { to: '/member/notifications', label: 'Notifications', icon: Bell },
  { to: '/member/profile', label: 'Profile', icon: UserCircle },
];

export const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  ADMIN: adminNav,
  TRAINER: trainerNav,
  MEMBER: memberNav,
};
