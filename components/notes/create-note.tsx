'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMutation } from '@tanstack/react-query';
import { createNote } from '@/lib/api/client-api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import NoteForm from '@/components/notes/note-form';
import { TAGS } from '@/types/definitions';

export function CreateNote() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      setIsOpen(false);
      router.refresh();
    },
  });
  const defaultValues = {
    title: '',
    content: '',
    tag: TAGS[0],
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={<Button variant="outline">Create note</Button>}
      />
      <DialogContent className="sm:max-w-sm">
        <NoteForm
          defaultValues={defaultValues}
          title={'New note'}
          description="Make new note to your profile here. Click save when you're done."

          onSubmit={mutation.mutate}
        />
      </DialogContent>
    </Dialog>
  );
}
/*
description:

 */
