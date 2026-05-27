import api from './api';
import type { ApiResponse, PaginatedResponse, Payment } from '../types';

export const paymentService = {
  list: (params?: { page?: number; pageSize?: number; status?: string }) =>
    api.get<PaginatedResponse<Payment>>('/payments', { params }).then((r) => r.data),

  listMine: () =>
    api.get<ApiResponse<Payment[]>>('/payments/me').then((r) => r.data),

  create: (payload: Partial<Payment>) =>
    api.post<ApiResponse<Payment>>('/payments', payload).then((r) => r.data),

  update: (id: string, payload: Partial<Payment>) =>
    api.put<ApiResponse<Payment>>(`/payments/${id}`, payload).then((r) => r.data),

  remove: (id: string) =>
    api.delete<ApiResponse<null>>(`/payments/${id}`).then((r) => r.data),
};
