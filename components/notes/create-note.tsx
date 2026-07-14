'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { TAGS } from '@/types/definitions';
import { zodResolver } from '@hookform/resolvers/zod';
import { noteSchema, NoteValues } from '@/lib/schemas/note';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api/client-api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CreateNote() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, register, handleSubmit, reset } =
    useForm<NoteValues>({
      resolver: zodResolver(noteSchema),
      mode: 'onBlur',
      defaultValues: {
        title: '',
        content: '',
        tag: TAGS[0],
      },
    });

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      reset();
      setIsOpen(false);
      router.refresh();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={<Button variant="outline">Create note</Button>}
      />
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={handleSubmit((data) => mutation.mutate(data))}
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
      </DialogContent>
    </Dialog>
  );
}
