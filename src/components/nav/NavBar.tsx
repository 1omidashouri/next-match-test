import { Button } from '@heroui/react';
import { buttonVariants } from '@heroui/styles';
import Link from 'next/link';
import { GiMatchTip } from 'react-icons/gi';
import NavLink from './NavLink';
import { getCurrentUser } from '@/lib/auth';
import UserMenu from './UserMenu';
import { Fragment } from 'react/jsx-runtime';

const navLinks = [
  { href: '/members', label: 'Matches' },
  { href: '/lists', label: 'Lists' },
  { href: '/messages', label: 'Messages' },
];

export default async function NavBar() {
  const user = await getCurrentUser();

  return (
    <header className="p-3 w-full fixed top-0 z-50 bg-linear-to-r from-accent/85 to-black">
      <div className="flex justify-between items-center px-10 mx-auto gap-6">
        <Link href="/" className="flex items-center gap-2">
          <GiMatchTip size={40} className="text-gray-200" />
          <div className="font-bold text-3xl flex">
            <span className="text-gray-900">Next</span>
            <span className="text-gray-900">Match</span>
          </div>
        </Link>
        <nav className="flex gap-3 my-2 uppercase text-lg text-white">
          {navLinks.map((link) => (
            // <Link key={link.href} href={link.href}>
            //   {link.label}
            // </Link>
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>
        <div className="flex flex-center gap-3">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Fragment>
              <Link href="/login" className={buttonVariants({ variant: 'primary' })}>
                Login
              </Link>
              <Link href="/register" className={buttonVariants({ variant: 'primary' })}>
                Register
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </header>
  );
}
