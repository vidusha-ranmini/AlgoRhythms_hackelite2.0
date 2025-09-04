'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AppLayout from './AppLayout';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/context/AuthContext';

type RoleBasedLayoutProps = {
  children: React.ReactNode;
  role?: UserRole;
  requireAuth?: boolean;
};

export default function RoleBasedLayout({ 
  children, 
  role = 'public',
  requireAuth = false
}: RoleBasedLayoutProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  // If authentication is required but user is not authenticated
  React.useEffect(() => {
    if (requireAuth && !isAuthenticated) {
      router.push('/login');
    }
  }, [requireAuth, isAuthenticated, router]);
  
  // Use the user's role from auth context if available, otherwise use the provided role
  const activeRole = user?.role || role;
  
  if (requireAuth && !isAuthenticated) {
    return <div className="p-8 text-center">Checking authentication...</div>;
  }

  return (
    <AppLayout role={activeRole}>
      {children}
    </AppLayout>
  );
}