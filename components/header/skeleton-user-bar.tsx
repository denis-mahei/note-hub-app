import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const SkeletonUserBar = () => {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="h-8 w-16 rounded-full" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-7.5 w-7.5 rounded-full" />
      </div>
      <Skeleton className="h-9 w-20 rounded-md" />
    </div>
  );
};

export default SkeletonUserBar;
