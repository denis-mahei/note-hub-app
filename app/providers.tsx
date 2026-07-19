'use client';

import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Header from '@/components/header/header';

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
      <div className="flex-1 flex flex-col gap-4 rounded-2xl border bg-background p-4">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
};

export default Providers;
