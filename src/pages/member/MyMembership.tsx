import { Check, CreditCard, Calendar, RefreshCw } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatDate, formatCurrency } from '../../utils/formatDate';

export default function MyMembership() {
  const plan = {
    name: 'Premium',
    price: 89,
    durationDays: 30,
    features: [
      'Unlimited gym access',
      'Unlimited group classes',
      '4 PT sessions / month',
      'Sauna & recovery zone',
      'Nutrition consultation',
    ],
  };

  const joined = '2025-09-12';
  const expires = '2026-09-12';

  return (
    <>
      <PageHeader title="My Membership" description="Your current plan, status, and billing." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-slate-400 font-medium">Current plan</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">{plan.name}</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {formatCurrency(plan.price)} every {plan.durationDays} days
              </p>
            </div>
            <Badge tone="success">Active</Badge>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-4">
              <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Calendar size={12} /> Joined
              </p>
              <p className="mt-1 font-semibold">{formatDate(joined)}</p>
            </div>
            <div className="rounded-xl border border-slate-100 dark:border-slate-800 p-4">
              <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Calendar size={12} /> Expires
              </p>
              <p className="mt-1 font-semibold">{formatDate(expires)}</p>
            </div>
          </div>

          <ul className="mt-6 space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 mt-0.5">
                  <Check size={12} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="flex flex-col">
          <h3 className="text-base font-semibold">Quick actions</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your subscription and payment.
          </p>
          <div className="mt-5 space-y-2 flex-1">
            <Button className="w-full" leftIcon={<RefreshCw size={16} />}>
              Renew membership
            </Button>
            <Button variant="outline" className="w-full" leftIcon={<CreditCard size={16} />}>
              Update payment method
            </Button>
            <Button variant="ghost" className="w-full text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10">
              Pause membership
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
