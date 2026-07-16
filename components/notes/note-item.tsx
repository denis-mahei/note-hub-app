'use client';

import React from 'react';
import { Note } from '@/types/definitions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/client-api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface NoteItemProps {
  note: Note;
}

const NoteItem = ({ note }: NoteItemProps) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => deleteNote(note.id),
    onSuccess: () => {
      toast.success('Note deleted successfully.');
      router.refresh();
    },
  });
  return (
    <>
      <Link href={`/notes/${note.id}`} className="">
        <h2>Title: {note.title}</h2>
        <p>Content: {note.content}</p>
        <p>Categories: {note.tag}</p>
      </Link>
      <Button variant="destructive" onClick={() => mutation.mutate()}>
        <Trash2 />
      </Button>
    </>
  );
};

export default NoteItem;
