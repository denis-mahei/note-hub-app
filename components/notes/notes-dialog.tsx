'use client';

import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api/client-api';

interface NotesDialogProps {
  id: string;
}

const NotesDialog = ({ id }: NotesDialogProps) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['note'],
    queryFn: () => getNoteById(id),
  });
  return (
    <Dialog defaultOpen onOpenChange={router.back}>
      <DialogContent className="sm:max-w-sm">Note</DialogContent>
    </Dialog>
  );
};

export default NotesDialog;
