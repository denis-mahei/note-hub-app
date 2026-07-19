'use client';

import React, { useState } from 'react';
import { Note } from '@/types/definitions';
import NoteContent from '@/components/notes/note-content';
import NoteForm from '@/components/notes/note-form';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { NoteValues } from '@/lib/schemas/note';
import { updateNote } from '@/lib/api/client-api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface NoteViewProps {
  note: Note;
}

const NoteView = ({ note }: NoteViewProps) => {
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (payload: NoteValues) => updateNote(note.id, payload),
    onSuccess: () => {
      toast.success('Note updated successfully.');
      router.back();
      router.refresh();
    },
  });
  return (
    <>
      {isEdit ? (
        <CardContent>
          <NoteForm
            defaultValues={{
              title: note.title,
              content: note.content,
              tag: note.tag,
            }}
            onSubmit={updateMutation.mutate}
            onClose={() => setIsEdit(false)}
          />
        </CardContent>
      ) : (
        <CardContent>
          <NoteContent
            title={note.title}
            content={note.content}
            tag={note.tag}
            update={note.updatedAt}
            create={note.createdAt}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEdit(!isEdit)}
            >
              <Edit />
            </Button>
          </div>
        </CardContent>
      )}
    </>
  );
};

export default NoteView;
