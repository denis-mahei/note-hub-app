'use client';

import React from 'react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  UsernameFormValues,
  usernameSchema,
} from '@/lib/schemas/user';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMe } from '@/lib/api/client-api';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface ProfileFormProps {
  username: string;
  onCancel: () => void;
}

const ProfileForm = ({ username, onCancel }: ProfileFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username,
    },
    mode: 'onTouched',
  });

  const updateName = useMutation({
    mutationFn: (name: UsernameFormValues) => updateMe(name),
    onSuccess: () => {
      toast.success('Update name successfully');
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (e) => {
      if (isAxiosError(e)) {
        toast.error(e.response?.data.message);
      }
    },
  });

  return (
    <form onSubmit={handleSubmit((name) => updateName.mutate(name))}>
      <CardContent>
        <Field data-invalid={!!errors.username}>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            id="username"
            type="text"
            {...register('username')}
          />
          <FieldError errors={[errors.username]} />
        </Field>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={updateName.isPending}
          onClick={onCancel}
        >
          {updateName.isPending ? 'Saving...' : 'Save'}
        </Button>
      </CardFooter>
    </form>
  );
};

export default ProfileForm;
