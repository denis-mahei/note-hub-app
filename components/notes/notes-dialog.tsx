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
import { Note, TAGS } from '@/types/definitions';
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

interface NotesDialogProps {
  id: string;
}

const NotesDialog = ({ id }: NotesDialogProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const { data } = useQuery<Note>({
    queryKey: ['note'],
    queryFn: () => getNoteById(id),
  });
  const { handleSubmit, register, control } = useForm<Note>({
    defaultValues: {
      title: data?.title,
      content: data?.content,
      tag: data?.tag,
    },
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
    mutationFn: (payload: Note) => updateNote(id, payload),
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
            <form
              onSubmit={handleSubmit((data) =>
                updateMutation.mutate(data),
              )}
            >
              <DialogHeader className="mb-5">
                <DialogTitle>New note</DialogTitle>
                <DialogDescription>
                  Make new note to your profile here. Click save when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="title">Title:</Label>
                  <Input id="title" {...register('title')} />
                </Field>
                <Field>
                  <Label htmlFor="content">Content:</Label>
                  <Textarea
                    id="content"
                    {...register('content')}
                    placeholder="Enter your note here"
                  />
                </Field>
                <Controller
                  control={control}
                  name="tag"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full max-w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {TAGS.map((tag, idx) => (
                            <SelectItem key={idx} value={tag}>
                              {tag}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FieldGroup>
              <DialogFooter>
                <DialogClose
                  render={<Button variant="outline">Cancel</Button>}
                />
                <Button type="submit">Save note</Button>
              </DialogFooter>
            </form>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default NotesDialog;
