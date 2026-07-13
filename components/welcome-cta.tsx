'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/lib/api/client-api';
import Link from 'next/link';

const WelcomeCta = () => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });

  return (
    <Link href={data ? '/notes' : '/register'}>
      {data ? 'Go to notes' : 'Get started'}
    </Link>
  );
};

export default WelcomeCta;
