import { PageHeader } from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, type Column } from '../../components/ui/Table';
import { formatDateTime } from '../../utils/formatDate';

interface Row {
  id: string;
  memberName: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
}

const mock: Row[] = [
  { id: '1', memberName: 'Maya Chen', date: '2026-05-22', checkInTime: '2026-05-22T08:12:00Z', checkOutTime: '2026-05-22T09:30:00Z' },
  { id: '2', memberName: 'Daniel Okafor', date: '2026-05-22', checkInTime: '2026-05-22T09:02:00Z' },
  { id: '3', memberName: 'Aisha Patel', date: '2026-05-21', checkInTime: '2026-05-21T10:14:00Z', checkOutTime: '2026-05-21T11:45:00Z' },
  { id: '4', memberName: 'Ethan Walker', date: '2026-05-21', checkInTime: '2026-05-21T11:30:00Z', checkOutTime: '2026-05-21T12:45:00Z' },
];

export default function TrainerAttendance() {
  const columns: Column<Row>[] = [
    { key: 'member', header: 'Member', render: (r) => (
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-sm font-semibold">
          {r.memberName[0]}
        </div>
        <span className="font-medium">{r.memberName}</span>
      </div>
    ) },
    { key: 'date', header: 'Date', render: (r) => r.date },
    { key: 'checkInTime', header: 'Check-in', render: (r) => formatDateTime(r.checkInTime) },
    { key: 'checkOutTime', header: 'Check-out', render: (r) =>
      r.checkOutTime ? formatDateTime(r.checkOutTime) : <Badge tone="info">Active</Badge>
    },
  ];

  return (
    <>
      <PageHeader
        title="Attendance"
        description="Check-ins from your assigned members."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">This week</p>
          <p className="mt-2 text-2xl font-bold">42 visits</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Active right now</p>
          <p className="mt-2 text-2xl font-bold">3 members</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-500 dark:text-slate-400">Avg attendance</p>
          <p className="mt-2 text-2xl font-bold">81%</p>
        </Card>
      </div>

      <Table columns={columns} data={mock} rowKey={(r) => r.id} />
    </>
  );
}
