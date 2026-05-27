import { Users, CreditCard, CalendarCheck, TrendingUp, Plus, Download } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/dashboard/StatCard';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { Button } from '../../components/ui/Button';

const revenueData = [
  { month: 'Jan', value: 12400 },
  { month: 'Feb', value: 14800 },
  { month: 'Mar', value: 16200 },
  { month: 'Apr', value: 15400 },
  { month: 'May', value: 18900 },
  { month: 'Jun', value: 21300 },
  { month: 'Jul', value: 24800 },
];

const attendanceData = [
  { day: 'Mon', visits: 142 },
  { day: 'Tue', visits: 168 },
  { day: 'Wed', visits: 190 },
  { day: 'Thu', visits: 174 },
  { day: 'Fri', visits: 213 },
  { day: 'Sat', visits: 256 },
  { day: 'Sun', visits: 132 },
];

const activity = [
  { id: '1', name: 'Maya Chen', action: 'Checked in &mdash; Strength zone', time: '2m ago', tone: 'success' as const },
  { id: '2', name: 'Daniel Okafor', action: 'Renewed Premium plan', time: '18m ago', tone: 'info' as const },
  { id: '3', name: 'Sophia Reyes', action: 'Payment pending', time: '1h ago', tone: 'warning' as const },
  { id: '4', name: 'Ethan Walker', action: 'New member joined', time: '3h ago', tone: 'success' as const },
  { id: '5', name: 'Aisha Patel', action: 'Updated profile', time: '5h ago', tone: 'neutral' as const },
];

export default function Dashboard() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back, here&apos;s what&apos;s happening at your gym today."
        actions={
          <>
            <Button variant="outline" leftIcon={<Download size={16} />}>
              Export
            </Button>
            <Button leftIcon={<Plus size={16} />}>Add Member</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard label="Total Members" value="1,248" delta={8.4} icon={Users} tone="brand" />
        <StatCard label="Active Today" value="318" delta={3.1} icon={CalendarCheck} tone="emerald" />
        <StatCard label="Monthly Revenue" value="₹24,820" delta={12.6} icon={CreditCard} tone="amber" />
        <StatCard label="Retention Rate" value="92%" delta={-1.2} icon={TrendingUp} tone="rose" />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <ChartCard
            title="Revenue trend"
            description="Last 7 months"
            data={revenueData}
            dataKey="value"
            xKey="month"
            type="area"
          />
        </div>
        <ChartCard
          title="Weekly check-ins"
          description="This week"
          data={attendanceData}
          dataKey="visits"
          xKey="day"
          type="bar"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">Upcoming sessions</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Personal training scheduled today</p>
            </div>
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>
          <ul className="space-y-3">
            {[
              { time: '09:00', name: 'HIIT Bootcamp', coach: 'Coach Liam', spots: '12/15' },
              { time: '11:30', name: 'Strength Fundamentals', coach: 'Coach Priya', spots: '8/10' },
              { time: '15:00', name: 'Yoga Flow', coach: 'Coach Naomi', spots: '14/20' },
              { time: '18:30', name: 'Spin Class', coach: 'Coach Marcus', spots: '20/20' },
            ].map((s) => (
              <li
                key={s.time}
                className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-slate-800 px-4 py-3"
              >
                <div className="flex items-center gap-4">
                  <span className="rounded-lg bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-300 px-2.5 py-1 text-sm font-semibold tabular-nums">
                    {s.time}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{s.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.coach}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{s.spots}</span>
              </li>
            ))}
          </ul>
        </div>
        <RecentActivity items={activity} />
      </div>
    </>
  );
}
