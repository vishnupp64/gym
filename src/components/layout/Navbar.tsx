import { Bell, Menu, LogOut, UserCircle } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import { SearchBar } from '../common/SearchBar';
import { Dropdown, DropdownItem } from '../ui/Dropdown';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [search, setSearch] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-slate-600 dark:text-slate-300"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="hidden md:block flex-1 max-w-md">
        <SearchBar value={search} onChange={setSearch} placeholder="Search members, payments..." />
      </div>

      <div className="flex flex-1 md:flex-none items-center justify-end gap-2 ml-auto">
        <ThemeToggle />
        <button
          aria-label="Notifications"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          <Bell size={16} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-950" />
        </button>
        <Dropdown
          trigger={
            <span className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 pl-2 pr-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 text-sm font-semibold">
                {user?.name?.[0] ?? 'A'}
              </span>
              <span className="hidden sm:block text-sm">
                <span className="block font-medium text-slate-800 dark:text-slate-100 leading-tight">
                  {user?.name ?? 'Admin'}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400 leading-tight">
                  {user?.role ?? 'ADMIN'}
                </span>
              </span>
            </span>
          }
        >
          <DropdownItem icon={<UserCircle size={14} />}>Profile</DropdownItem>
          <DropdownItem icon={<LogOut size={14} />} danger onClick={handleLogout}>
            Logout
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
