import cn from '@/app/utils/cn';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import UserMenu from '../UserMenu';

const headerLinks = [
  {
    label: 'Dashboard',
    to: '/',
  },
  {
    label: 'Análise',
    to: '/analytics',
  },
];

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className='flex items-center justify-between h-12'>
      <div className='flex items-center gap-6'>
        <Logo className='h-6 text-teal-900' />
        <nav className='ml-10 flex gap-2'>
          {headerLinks.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                'text-sm font-medium py-2 px-4 rounded-lg transition-all hover:text-teal-900',
                it.to === pathname && 'bg-teal-50 text-teal-800'
              )}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>
      <UserMenu />
    </header>
  );
}
