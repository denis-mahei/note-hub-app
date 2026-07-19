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
import { CardContent, CardFooter } from '@/components/ui/card';
import NoteContent from '@/components/notes/note-content';

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
      <CardContent className="hover:scale-105 transition duration-300">
        <Link href={`/notes/${note.id}`}>
          <NoteContent
            title={note.title}
            content={note.content}
            tag={note.tag}
            create={note.createdAt}
            update={note.updatedAt}
          />
        </Link>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          variant="destructive"
          onClick={() => mutation.mutate()}
        >
          <Trash2 />
        </Button>
      </CardFooter>
    </>
  );
};

export default NoteItem;
