'use client';

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import RoleBasedLayout from '@/components/layout/RoleBasedLayout';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fdfbea] flex items-center justify-center">
        <div className="p-8 text-center">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Authenticating...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render children
  return <RoleBasedLayout role="parent">{children}</RoleBasedLayout>;
}