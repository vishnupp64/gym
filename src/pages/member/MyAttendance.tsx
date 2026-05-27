import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { ChartCard } from '../../components/dashboard/ChartCard';
import { Table, type Column } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { formatDateTime } from '../../utils/formatDate';

interface VisitRow {
  id: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
}

const visits: VisitRow[] = [
  { id: '1', date: '2026-05-22', checkInTime: '2026-05-22T08:12:00Z', checkOutTime: '2026-05-22T09:30:00Z' },
  { id: '2', date: '2026-05-20', checkInTime: '2026-05-20T18:02:00Z', checkOutTime: '2026-05-20T19:24:00Z' },
  { id: '3', date: '2026-05-19', checkInTime: '2026-05-19T07:45:00Z', checkOutTime: '2026-05-19T09:01:00Z' },
  { id: '4', date: '2026-05-17', checkInTime: '2026-05-17T10:00:00Z', checkOutTime: '2026-05-17T11:10:00Z' },
];

const monthly = [
  { m: 'Jan', value: 14 },
  { m: 'Feb', value: 16 },
  { m: 'Mar', value: 19 },
  { m: 'Apr', value: 18 },
  { m: 'May', value: 22 },
];

export default function MyAttendance() {
  const columns: Column<VisitRow>[] = [
    { key: 'date', header: 'Date', render: (r) => r.date },
    { key: 'in', header: 'Check-in', render: (r) => formatDateTime(r.checkInTime) },
    { key: 'out', header: 'Check-out', render: (r) =>
      r.checkOutTime ? formatDateTime(r.checkOutTime) : <Badge tone="info">Active</Badge>
    },
    { key: 'duration', header: 'Duration', render: (r) => {
      if (!r.checkOutTime) return <span className="text-slate-400">—</span>;
      const m = Math.round((new Date(r.checkOutTime).getTime() - new Date(r.checkInTime).getTime()) / 60000);
      return <span className="font-medium">{m} min</span>;
    } },
  ];

  return (
    <>
      <PageHeader title="My Attendance" description="Your visit history and trends." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">This month</p>
          <p className="mt-2 text-2xl font-bold">18 visits</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Current streak</p>
          <p className="mt-2 text-2xl font-bold">6 days</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Avg session</p>
          <p className="mt-2 text-2xl font-bold">72m</p>
        </Card>
      </div>

      <div className="mb-6">
        <ChartCard
          title="Monthly visits"
          description="Last 5 months"
          data={monthly}
          dataKey="value"
          xKey="m"
          type="area"
        />
      </div>

      <Table columns={columns} data={visits} rowKey={(r) => r.id} />
    </>
  );
}
