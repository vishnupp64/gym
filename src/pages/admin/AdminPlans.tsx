import { Check, Plus, Sparkles } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency } from '../../utils/formatDate';
import { cn } from '../../utils/cn';
import type { MembershipPlan } from '../../types';

const plans: MembershipPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic',
    duration: 30,
    price: 39,
    features: ['Gym floor access', '1 group class / week', 'Locker access'],
  },
  {
    id: 'plan-standard',
    name: 'Standard',
    duration: 30,
    price: 59,
    features: ['All Basic features', 'Unlimited group classes', '1 PT session / month'],
    isPopular: true,
  },
  {
    id: 'plan-premium',
    name: 'Premium',
    duration: 30,
    price: 89,
    features: [
      'All Standard features',
      '4 PT sessions / month',
      'Sauna & recovery zone',
      'Nutrition consultations',
    ],
  },
];

export default function MembershipPlans() {
  return (
    <>
      <PageHeader
        title="Membership Plans"
        description="Configure pricing tiers offered to your members."
        actions={<Button leftIcon={<Plus size={16} />}>New Plan</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={cn(
              'relative flex flex-col',
              plan.isPopular && 'ring-2 ring-brand-500/40 border-brand-500/30',
            )}
          >
            {plan.isPopular && (
              <Badge tone="brand" className="absolute -top-3 left-6">
                <Sparkles size={12} /> Most popular
              </Badge>
            )}

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{plan.name}</h3>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Billed every {plan.duration} days
              </p>
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">{formatCurrency(plan.price)}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">/ month</span>
            </div>

            <ul className="mt-6 space-y-3 flex-1">
              {(plan.features ?? []).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-200">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                    <Check size={12} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-2">
              <Button variant="outline" className="flex-1">
                Edit
              </Button>
              <Button variant={plan.isPopular ? 'primary' : 'secondary'} className="flex-1">
                Assign
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
