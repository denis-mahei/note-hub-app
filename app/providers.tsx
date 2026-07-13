'use client';
import React from 'react';
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Header from '@/components/header/header';
import { Separator } from '@/components/ui/separator';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Separator />
      {children}
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
};

export default Providers;
