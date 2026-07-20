'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Pencil } from 'lucide-react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from '@/types/definitions';
import ProfileForm from '@/components/profile/profile-form';

interface ProfileViewProps {
  user: User;
}

const ProfileView = ({ user }: ProfileViewProps) => {
  const [isEdit, setIsEdit] = useState(false);

  if (isEdit) {
    return (
      <ProfileForm
        username={user.username}
        onCancel={() => setIsEdit(false)}
      />
    );
  }

  return (
    <>
      <CardContent className="flex flex-col items-center gap-3 text-center">
        <Image
          src={user.avatar}
          alt="Avatar"
          width={72}
          height={72}
          className="rounded-full ring-1 ring-foreground/10"
        />
        <div>
          <p className="font-medium">{user.username}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline" onClick={() => setIsEdit(true)}>
          <Pencil /> Edit
        </Button>
      </CardFooter>
    </>
  );
};

export default ProfileView;
