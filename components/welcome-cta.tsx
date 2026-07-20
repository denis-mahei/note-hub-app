'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/lib/api/client-api';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const WelcomeCta = () => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });

  return (
    <Link
      href={data ? '/notes' : '/register'}
      className={cn(buttonVariants({ size: 'lg' }), 'group px-6')}
    >
      {data ? 'Go to notes' : 'Get started'}
      <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
};

export default WelcomeCta;
