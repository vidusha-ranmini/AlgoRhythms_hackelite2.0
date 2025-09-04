import React from 'react';
import RoleBasedLayout from '@/components/layout/RoleBasedLayout';
import { TTSProvider } from '@/context/TTSContext';

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TTSProvider>
      <RoleBasedLayout role="child">{children}</RoleBasedLayout>
    </TTSProvider>
  );
}