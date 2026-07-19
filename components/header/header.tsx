'use client';

import React from 'react';
import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getMe, signOut } from '@/lib/api/client-api';
import UserBar from '@/components/header/user-bar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SkeletonUserBar from '@/components/header/skeleton-user-bar';

const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });
  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
  });
  return (
    <header className="sticky top-0 z-10 -mx-4 -mt-4 flex items-center justify-between rounded-t-2xl border-b bg-background/80 px-6 py-4 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <Link href="/" className="text-lg font-bold tracking-tight">
        NoteHub
      </Link>
      {isPending ? (
        <SkeletonUserBar />
      ) : data ? (
        <div className="flex items-center gap-4">
          <Link
            href={'/notes'}
            className="rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-accent"
          >
            Notes
          </Link>
          <UserBar user={data} />
          <Button variant="outline" onClick={() => mutation.mutate()}>
            Logout
          </Button>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
