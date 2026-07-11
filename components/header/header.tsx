'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/lib/api/client-api';

const Header = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
  });
  console.log(data);
  return (
    <header className="flex">
      <span>Logo</span>
    </header>
  );
};

export default Header;
