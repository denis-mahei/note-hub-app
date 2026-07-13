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
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useQuery({
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
    <header className="flex justify-between items-center py-3 px-4">
      <Link href="/" className="font-bold">
        NoteHub
      </Link>
      {data ? (
        <div className="flex items-center gap-2">
          <UserBar user={data} />
          <Button onClick={() => mutation.mutate()}>Logout</Button>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
