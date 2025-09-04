import React from 'react';
import RoleBasedLayout from '@/components/layout/RoleBasedLayout';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleBasedLayout role="public">{children}</RoleBasedLayout>;
}