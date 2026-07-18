'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [value, setValue] = useState(search ?? '');
  const [debounced] = useDebounce(value, 500);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = true;
      return;
    } else {
      const params = new URLSearchParams(searchParams);
      if (!debounced) params.delete('search');
      else params.set('search', debounced);
      params.delete('page');
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [debounced]);

  return (
    <>
      <Input
        placeholder="Search notes..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </>
  );
};

export default SearchInput;
