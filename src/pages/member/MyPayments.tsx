import { useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { Download } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, type Column } from '../../components/ui/Table';
import { formatDate, formatCurrency } from '../../utils/formatDate';
import { paymentService } from '../../services/paymentService';
import type { Payment, PaymentStatus } from '../../types';

const tone: Record<PaymentStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  PAID: 'success',
  PENDING: 'warning',
  FAILED: 'danger',
  REFUNDED: 'neutral',
};

function extractError(err: unknown, fallback: string): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as { message?: string } | undefined;
    return data?.message || err.message || fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

export default function MyPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await paymentService.listMine();
        if (!cancelled) setPayments(res.data);
      } catch (err) {
        if (!cancelled) setError(extractError(err, 'Failed to load payments'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const paid = payments.filter((p) => p.status === 'PAID');
    const lifetime = paid.reduce((sum, p) => sum + Number(p.amount), 0);
    const lastPaid = paid[0];
    const planAmount = lastPaid ? Number(lastPaid.amount) : 0;
    return { lifetime, planAmount };
  }, [payments]);

  const columns: Column<Payment>[] = [
    {
      key: 'inv',
      header: 'Invoice',
      render: (p) => (
        <span className="font-mono text-xs text-slate-500">INV-{p.id.toUpperCase().slice(0, 8)}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (p) => (
        <span className="font-semibold tabular-nums">{formatCurrency(Number(p.amount))}</span>
      ),
    },
    { key: 'method', header: 'Method', render: (p) => <Badge tone="neutral">{p.paymentMethod}</Badge> },
    { key: 'status', header: 'Status', render: (p) => <Badge tone={tone[p.status]}>{p.status}</Badge> },
    { key: 'date', header: 'Date', render: (p) => formatDate(p.paymentDate) },
    {
      key: 'action',
      header: '',
      className: 'text-right',
      render: () => (
        <Button variant="ghost" size="sm" leftIcon={<Download size={14} />}>
          Receipt
        </Button>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Payment History" description="Your invoices and billing." />

      {error && (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Lifetime spend</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{formatCurrency(stats.lifetime)}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Payments recorded</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{payments.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Last paid amount</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{formatCurrency(stats.planAmount)}</p>
        </Card>
      </div>

      <Table columns={columns} data={payments} rowKey={(p) => p.id} />
      {loading && (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Loading payments…</p>
      )}
      {!loading && payments.length === 0 && !error && (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">No payments yet.</p>
      )}
    </>
  );
}
