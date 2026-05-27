import { useEffect, useMemo, useState } from 'react';
import { AxiosError } from 'axios';
import { Plus, Download, CreditCard, Wallet, Receipt } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, type Column } from '../../components/ui/Table';
import { SearchBar } from '../../components/common/SearchBar';
import { FilterDropdown } from '../../components/common/FilterDropdown';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Dropdown, DropdownItem } from '../../components/ui/Dropdown';
import { MoreVertical } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils/formatDate';
import { paymentService } from '../../services/paymentService';
import { memberService } from '../../services/memberService';
import type { Member, Payment, PaymentMethod, PaymentStatus } from '../../types';

const statusTone: Record<PaymentStatus, 'success' | 'warning' | 'danger' | 'neutral'> = {
  PAID: 'success',
  PENDING: 'warning',
  FAILED: 'danger',
  REFUNDED: 'neutral',
};

type FormState = {
  memberId: string;
  amount: string;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  paymentDate: string;
};

const emptyForm: FormState = {
  memberId: '',
  amount: '',
  paymentMethod: 'CARD',
  status: 'PAID',
  paymentDate: new Date().toISOString().slice(0, 10),
};

function extractError(err: unknown, fallback: string): string {
  if (err instanceof AxiosError) {
    const data = err.response?.data as { message?: string } | undefined;
    return data?.message || err.message || fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const [pRes, mRes] = await Promise.all([paymentService.list(), memberService.list()]);
      setPayments(pRes.data);
      setMembers(mRes.data);
    } catch (err) {
      setLoadError(extractError(err, 'Failed to load payments'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(
    () =>
      payments.filter((p) => {
        if (status !== 'all' && p.status !== status) return false;
        if (search && !p.memberName.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      }),
    [payments, status, search],
  );

  const totals = useMemo(() => {
    const now = new Date();
    const thisMonth = payments.filter((p) => {
      if (p.status !== 'PAID') return false;
      const d = new Date(p.paymentDate);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });
    const collected = thisMonth.reduce((sum, p) => sum + Number(p.amount), 0);
    const pending = payments.filter((p) => p.status === 'PENDING').length;
    const failed = payments.filter((p) => p.status === 'FAILED').length;
    return { collected, pending, failed };
  }, [payments]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
    setFormOpen(true);
  };

  const openEdit = (p: Payment) => {
    setEditingId(p.id);
    setForm({
      memberId: p.memberId,
      amount: String(p.amount),
      paymentMethod: p.paymentMethod,
      status: p.status,
      paymentDate: p.paymentDate,
    });
    setFormError(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!form.memberId || !form.amount) {
      setFormError('Member and amount are required');
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      if (editingId) {
        const res = await paymentService.update(editingId, {
          amount: Number(form.amount),
          paymentMethod: form.paymentMethod,
          status: form.status,
          paymentDate: form.paymentDate,
        });
        setPayments((prev) => prev.map((p) => (p.id === editingId ? res.data : p)));
      } else {
        const res = await paymentService.create({
          memberId: form.memberId,
          amount: Number(form.amount),
          paymentMethod: form.paymentMethod,
          status: form.status,
          paymentDate: form.paymentDate,
        });
        setPayments((prev) => [res.data, ...prev]);
      }
      closeForm();
    } catch (err) {
      setFormError(extractError(err, 'Failed to save payment'));
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Payment>[] = [
    {
      key: 'invoice',
      header: 'Invoice',
      render: (p) => (
        <span className="font-mono text-xs text-slate-500">INV-{p.id.toUpperCase().slice(0, 8)}</span>
      ),
    },
    {
      key: 'member',
      header: 'Member',
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-sm font-semibold">
            {p.memberName[0]}
          </div>
          <span className="font-medium text-slate-800 dark:text-slate-100">{p.memberName}</span>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (p) => (
        <span className="font-semibold tabular-nums">{formatCurrency(Number(p.amount))}</span>
      ),
    },
    {
      key: 'method',
      header: 'Method',
      render: (p) => <Badge tone="neutral">{p.paymentMethod}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => <Badge tone={statusTone[p.status]}>{p.status}</Badge>,
    },
    { key: 'paymentDate', header: 'Date', render: (p) => formatDate(p.paymentDate) },
    {
      key: 'actions',
      header: '',
      className: 'text-right',
      render: (p) => (
        <Dropdown
          trigger={
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
              <MoreVertical size={16} />
            </span>
          }
        >
          <DropdownItem onClick={() => openEdit(p)}>Edit</DropdownItem>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Payments"
        description="Invoices, dues, and revenue collected from members."
        actions={
          <>
            <Button variant="outline" leftIcon={<Download size={16} />}>
              Export
            </Button>
            <Button leftIcon={<Plus size={16} />} onClick={openAdd}>
              Record Payment
            </Button>
          </>
        }
      />

      {loadError && (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
          {loadError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Collected this month</p>
              <p className="text-2xl font-bold tracking-tight">{formatCurrency(totals.collected)}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-300">
              <Receipt size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Pending invoices</p>
              <p className="text-2xl font-bold tracking-tight">{totals.pending}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-300">
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Failed payments</p>
              <p className="text-2xl font-bold tracking-tight">{totals.failed}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} placeholder="Search member..." />
        <FilterDropdown
          label="Status"
          value={status}
          onChange={setStatus}
          options={[
            { label: 'All', value: 'all' },
            { label: 'Paid', value: 'PAID' },
            { label: 'Pending', value: 'PENDING' },
            { label: 'Failed', value: 'FAILED' },
            { label: 'Refunded', value: 'REFUNDED' },
          ]}
        />
      </div>

      <Table columns={columns} data={filtered} rowKey={(p) => p.id} />
      {loading && (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Loading payments…</p>
      )}

      <Modal
        open={formOpen}
        onClose={closeForm}
        title={editingId ? 'Edit payment' : 'Record payment'}
        description={
          editingId ? 'Update this payment record.' : 'Add a new fee/payment entry for a member.'
        }
        size="lg"
        footer={
          <>
            <Button variant="ghost" onClick={closeForm} disabled={submitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} type="submit" isLoading={submitting}>
              {editingId ? 'Save changes' : 'Record payment'}
            </Button>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {formError && (
            <div className="sm:col-span-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900/40 dark:bg-rose-950/30 dark:text-rose-300">
              {formError}
            </div>
          )}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Member
            </label>
            <select
              className="input-base"
              value={form.memberId}
              onChange={(e) => setForm({ ...form, memberId: e.target.value })}
              disabled={!!editingId}
              required
            >
              <option value="">Select a member…</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.fullName} — {m.email}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Amount (₹)"
            type="number"
            min={0}
            step="0.01"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
          <Input
            label="Payment date"
            type="date"
            value={form.paymentDate}
            onChange={(e) => setForm({ ...form, paymentDate: e.target.value })}
          />
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Method
            </label>
            <select
              className="input-base"
              value={form.paymentMethod}
              onChange={(e) =>
                setForm({ ...form, paymentMethod: e.target.value as PaymentMethod })
              }
            >
              <option value="CARD">Card</option>
              <option value="CASH">Cash</option>
              <option value="BANK_TRANSFER">Bank transfer</option>
              <option value="UPI">UPI</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Status
            </label>
            <select
              className="input-base"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as PaymentStatus })}
            >
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>
          <button type="submit" hidden />
        </form>
      </Modal>
    </>
  );
}
