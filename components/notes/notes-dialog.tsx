'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteNote,
  getNoteById,
  updateNote,
} from '@/lib/api/client-api';
import { CardContent } from '@/components/ui/card';
import { TAGS } from '@/types/definitions';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Field, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { noteSchema, NoteValues } from '@/lib/schemas/note';
import NoteForm from '@/components/notes/note-form';

interface NotesDialogProps {
  id: string;
}

const NotesDialog = ({ id }: NotesDialogProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();

  const { data } = useQuery({
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
        {data &&
          (!isEdit ? (
            <CardContent>
              <h2>
                <b>Title:</b> {data.title}
              </h2>
              <p>
                <b>Content:</b> {data.content}
              </p>
              <p>
                <b>Categories: </b>
                {data.tag}
              </p>
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
            </CardContent>
          ) : (
            <NoteForm
              defaultValues={{
                title: data.title,
                content: data.content,
                tag: data.tag,
              }}
              onSubmit={updateMutation.mutate}
              title="Edit note"
              description="Change you'r note"
            />
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default NotesDialog;
