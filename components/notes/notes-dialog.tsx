'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Note } from '@/types/definitions';
import { useRouter } from 'next/navigation';

interface NotesDialogProps {
  note: Note;
}

const NotesDialog = ({ note }: NotesDialogProps) => {
  const router = useRouter();
  return (
    <Dialog defaultOpen onOpenChange={router.back}>
      <DialogTrigger
        render={<Button variant="outline">Open Dialog</Button>}
      />
      <DialogContent className="sm:max-w-sm">
        {note.content}
      </DialogContent>
    </Dialog>
  );
};

export default NotesDialog;
