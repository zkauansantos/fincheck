import { useTheme } from '@/app/contexts/ThemeContext';
import cn from '@/app/utils/cn';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { ThemeToggle } from '../ThemeToggle';
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
  const { theme } = useTheme();

  return (
    <header className='flex items-center justify-between h-12'>
      <div className='flex items-center gap-6'>
        <Logo
          className={cn(
            'h-6 text-teal-900',
            theme === 'dark' && 'dark:text-teal-600'
          )}
        />
        <nav className='ml-10 flex gap-2'>
          {headerLinks.map((it) => (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                'text-sm font-medium py-2 px-4 rounded-lg transition-all hover:text-teal-900',
                it.to === pathname && 'bg-teal-50 text-teal-800 ',
                it.to === pathname &&
                  theme === 'dark' &&
                  'dark:bg-teal-900/10  dark:text-teal-600'
              )}
            >
              {it.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className='flex items-center gap-2'>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
