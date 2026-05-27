import { CalendarCheck, ClipboardList, Salad, Flame } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/dashboard/StatCard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatDate';

const weeklyVisits = [
  { day: 'Mon', value: 1 },
  { day: 'Tue', value: 1 },
  { day: 'Wed', value: 0 },
  { day: 'Thu', value: 1 },
  { day: 'Fri', value: 1 },
  { day: 'Sat', value: 1 },
  { day: 'Sun', value: 0 },
];

export default function MemberDashboard() {
  const { user } = useAuth();
  const expiryDate = '2026-09-12';

  return (
    <>
      <PageHeader
        title={`Hello, ${user?.name?.split(' ')[0] ?? 'there'}`}
        description="Your training week at a glance."
      />

      <div className="mb-6 rounded-2xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-800 p-6 text-white relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-brand-100">Active membership</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">Premium Plan</h2>
            <p className="mt-1 text-sm text-brand-100/90">
              Active until {formatDate(expiryDate)} &mdash; 113 days remaining
            </p>
          </div>
          <Button variant="secondary" className="bg-white/15 text-white hover:bg-white/25 border-0">
            Renew plan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="Visits this month" value="18" delta={12.5} icon={CalendarCheck} tone="brand" />
        <StatCard label="Workout streak" value="6 days" delta={20} icon={Flame} tone="amber" />
        <StatCard label="Active workouts" value="2" icon={ClipboardList} tone="emerald" />
        <StatCard label="Active diet plan" value="1" icon={Salad} tone="rose" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ChartCard
            title="Check-ins this week"
            description="Your weekly visit pattern"
            data={weeklyVisits}
            dataKey="value"
            xKey="day"
            type="bar"
          />
        </div>
        <Card>
          <h3 className="text-base font-semibold mb-4">Upcoming sessions</h3>
          <ul className="space-y-3">
            {[
              { time: 'Tomorrow 09:00', title: 'PT with Coach Liam', kind: 'Strength' },
              { time: 'Thu 17:30', title: 'HIIT Bootcamp', kind: 'Class' },
              { time: 'Sat 10:00', title: 'Yoga Flow', kind: 'Class' },
            ].map((s) => (
              <li
                key={s.time}
                className="rounded-xl border border-slate-100 dark:border-slate-800 px-3 py-2.5"
              >
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.time}</p>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{s.title}</p>
                <Badge tone="info" className="mt-1.5">{s.kind}</Badge>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
