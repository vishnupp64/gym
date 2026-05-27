import api from './api';
import type { ApiResponse, AttendanceRecord, PaginatedResponse } from '../types';

export const attendanceService = {
  list: (params?: { page?: number; pageSize?: number; date?: string }) =>
    api.get<PaginatedResponse<AttendanceRecord>>('/attendance', { params }).then((r) => r.data),

  checkIn: (memberId: string) =>
    api
      .post<ApiResponse<AttendanceRecord>>('/attendance', { memberId })
      .then((r) => r.data),
};
