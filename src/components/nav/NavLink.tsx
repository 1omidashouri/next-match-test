'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

type NavLinkProps = {
  href: string;
  label: string;
};

export default function NavLink({ href, label }: NavLinkProps) {
  const pathName = usePathname();

  return (
    <div>
      <Link
        className={pathName === href ? 'text-yellow-400' : 'hover:text-yellow-400/80'}
        href={href}
      >
        {label}
      </Link>
    </div>
  );
}
