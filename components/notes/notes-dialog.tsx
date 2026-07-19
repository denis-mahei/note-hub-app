'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteNote,
  getNoteById,
  updateNote,
} from '@/lib/api/client-api';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { NoteValues } from '@/lib/schemas/note';
import NoteForm from '@/components/notes/note-form';
import NoteContent from '@/components/notes/note-content';

interface NotesDialogProps {
  id: string;
}

const NotesDialog = ({ id }: NotesDialogProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const { data: note } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getNoteById(id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteNote(id),
    onSuccess: () => {
      toast.success('Note deleted successfully.');
      router.back();
      router.refresh();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: NoteValues) => updateNote(id, payload),
    onSuccess: () => {
      toast.success('Note updated successfully.');
      router.back();
      router.refresh();
    },
  });

  return (
    <Dialog defaultOpen onOpenChange={router.back}>
      <DialogContent className="sm:max-w-sm">
        {note &&
          (!isEdit ? (
            <CardContent>
              <div className="mb-3">
                <NoteContent
                  title={note.title}
                  tag={note.tag}
                  content={note.content}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => deleteMutation.mutate()}
                  variant="destructive"
                >
                  <Trash2 />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  <Edit />
                </Button>
              </div>
            </CardContent>
          ) : (
            <NoteForm
              defaultValues={{
                title: note.title,
                content: note.content,
                tag: note.tag,
              }}
              onSubmit={updateMutation.mutate}
              title="Edit note"
              description="Change your note"
              onClose={() => setIsEdit(false)}
            />
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default NotesDialog;
