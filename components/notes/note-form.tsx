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
import {
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

interface NoteFormProps {
  title?: string;
  description?: string;
  onSubmit: (values: NoteValues) => void;
  defaultValues: NoteValues;
  onClose?: () => void;
}

const NoteForm = ({
  title,
  description,
  onSubmit,
  defaultValues,
  onClose,
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

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <div className="mb-5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
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
      <CardFooter className="flex justify-end gap-2.5 mt-5">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save note</Button>
      </CardFooter>
    </form>
  );
};

export default NoteForm;
