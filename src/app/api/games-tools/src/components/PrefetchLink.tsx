'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { AnchorHTMLAttributes, useRef } from 'react';

interface PrefetchLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * Prefetch once on hover. We disable Link's built-in viewport prefetch
 * to avoid repeated fetches when lists re-render.
 */
export default function PrefetchLink({
  href,
  onMouseEnter,
  children,
  ...props
}: PrefetchLinkProps) {
  const router = useRouter();
  const didPrefetch = useRef(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const isHeavy = href.startsWith('/category') || href.startsWith('/search');
    if (!didPrefetch.current && !isHeavy) {
      router.prefetch(href);
      didPrefetch.current = true; // one-shot per mount
    }
    onMouseEnter?.(e);
  };

  return (
    <Link href={href} prefetch={false} onMouseEnter={handleMouseEnter} {...props}>
      {children}
    </Link>
  );
}

