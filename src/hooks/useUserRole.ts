"use client";

import { usePathname } from 'next/navigation';

type UserRole = 'parent' | 'child' | 'public' | 'admin';

export function useUserRole(): UserRole {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin')) {
    return 'admin';
  } else if (pathname?.startsWith('/child-dashboard') || pathname?.startsWith('/activities') || pathname?.startsWith('/quiz')) {
    return 'child';
  } else if (pathname?.startsWith('/dashboard') || pathname?.startsWith('/children') || pathname?.startsWith('/progress') || pathname?.startsWith('/child/')) {
    return 'parent';
  } else {
    return 'public';
  }
}

export function useIsAuthenticated(): boolean {
  const role = useUserRole();
  return role === 'parent' || role === 'child' || role === 'admin';
}