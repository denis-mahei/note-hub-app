'use client';
import React from 'react';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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
import { Button } from '@/components/ui/button';
import { noteSchema, NoteValues } from '@/lib/schemas/note';
import { zodResolver } from '@hookform/resolvers/zod';

interface NoteFormProps {
  title: string;
  description: string;
  onSubmit: (values: NoteValues) => void;
  defaultValues: NoteValues;
}

const NoteForm = ({
  title,
  description,
  onSubmit,
  defaultValues,
}: NoteFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteValues>({
    resolver: zodResolver(noteSchema),
    mode: 'onBlur',
    defaultValues,
  });
  console.log(errors);
  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <DialogHeader className="mb-5">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
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
      <DialogFooter className="mt-5">
        <DialogClose
          render={<Button variant="outline">Cancel</Button>}
        />
        <Button type="submit">Save note</Button>
      </DialogFooter>
    </form>
  );
};

export default NoteForm;
