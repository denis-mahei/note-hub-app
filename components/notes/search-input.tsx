'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useDebounce } from 'use-debounce';
import {
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  className?: string;
}

const SearchInput = ({ className }: SearchInputProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const [value, setValue] = useState(search ?? '');
  const [debounced] = useDebounce(value, 500);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
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
    <div className={cn('relative w-full sm:w-64', className)}>
      <Search
        size={16}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        placeholder="Search notes..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="pl-9"
      />
    </div>
  );
};

export default SearchInput;
