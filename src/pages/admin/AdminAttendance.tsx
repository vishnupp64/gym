import { useState } from 'react';
import { CalendarCheck, CheckCircle2, LogIn } from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, type Column } from '../../components/ui/Table';
import { SearchBar } from '../../components/common/SearchBar';
import { FilterDropdown } from '../../components/common/FilterDropdown';
import { formatDateTime } from '../../utils/formatDate';
import type { AttendanceRecord } from '../../types';

const mockRecords: AttendanceRecord[] = [
  { id: '1', memberId: '1', memberName: 'Maya Chen', date: '2026-05-22', checkInTime: '2026-05-22T08:12:00Z', checkOutTime: '2026-05-22T09:30:00Z' },
  { id: '2', memberId: '2', memberName: 'Daniel Okafor', date: '2026-05-22', checkInTime: '2026-05-22T09:02:00Z' },
  { id: '3', memberId: '5', memberName: 'Aisha Patel', date: '2026-05-22', checkInTime: '2026-05-22T10:14:00Z', checkOutTime: '2026-05-22T11:45:00Z' },
  { id: '4', memberId: '4', memberName: 'Ethan Walker', date: '2026-05-22', checkInTime: '2026-05-22T11:30:00Z' },
];

export default function Attendance() {
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('today');

  const columns: Column<AttendanceRecord>[] = [
    {
      key: 'member',
      header: 'Member',
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-sm font-semibold">
            {r.memberName[0]}
          </div>
          <span className="font-medium text-slate-800 dark:text-slate-100">{r.memberName}</span>
        </div>
      ),
    },
    { key: 'checkInTime', header: 'Check-in', render: (r) => formatDateTime(r.checkInTime) },
    {
      key: 'checkOutTime',
      header: 'Check-out',
      render: (r) =>
        r.checkOutTime ? (
          formatDateTime(r.checkOutTime)
        ) : (
          <Badge tone="info">Currently in gym</Badge>
        ),
    },
    {
      key: 'duration',
      header: 'Duration',
      render: (r) => {
        if (!r.checkOutTime) return <span className="text-slate-400">&mdash;</span>;
        const mins = Math.round(
          (new Date(r.checkOutTime).getTime() - new Date(r.checkInTime).getTime()) / 60000,
        );
        return <span className="font-medium">{mins} min</span>;
      },
    },
  ];

  return (
    <>
      <PageHeader
        title="Attendance"
        description="Track check-ins and visits in real time."
        actions={
          <Button leftIcon={<LogIn size={16} />}>Manual check-in</Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-300">
              <CalendarCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Check-ins today</p>
              <p className="text-2xl font-bold tracking-tight">318</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Active right now</p>
              <p className="text-2xl font-bold tracking-tight">42</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-300">
              <LogIn size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Avg session</p>
              <p className="text-2xl font-bold tracking-tight">68m</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar value={search} onChange={setSearch} placeholder="Search member..." />
        <FilterDropdown
          label="Period"
          value={period}
          onChange={setPeriod}
          options={[
            { label: 'Today', value: 'today' },
            { label: 'This week', value: 'week' },
            { label: 'This month', value: 'month' },
          ]}
        />
      </div>

      <Table columns={columns} data={mockRecords} rowKey={(r) => r.id} />
    </>
  );
}
