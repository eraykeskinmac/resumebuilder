'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cx } from '../lib/cx';

export const TopNavBar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <header
      aria-label="Site Header"
      className={cx(
        'flex h-[var(--top-nav-bar-height)] items-center border-b-2 border-gray-100 px-3 lg:px-12',
        isHomePage && 'bg-dot',
      )}
    >
      <div className="flex h-10 w-full items-center justify-between">
        <Link href="/">
          <div className="flex items-center justify-center gap-1">
            <Image
              src={'assets/heart.svg'}
              alt="logo"
              width={16}
              height={16}
              className="h-8 w-full"
              priority
            />
            <h1 className="text-xl whitespace-nowrap text-primary">
              Resume Builder Parser
            </h1>
          </div>
        </Link>
        <nav
          className="flex items-center gap-2 text-sm  font-medium"
          aria-label="Site Navbar"
        >
          {[
            ['/resume-builder', 'Builder'],
            ['/resume-parser', 'Parser'],
          ].map(([href, text]) => (
            <Link
              href={href}
              key={text}
              className="rounded-md px-1.5 py-2 text-gray-600 hover:bg-gray-100 focus:visible:bg-gray-100 lg:px-4"
            >
              {text}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
