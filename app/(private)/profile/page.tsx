import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import ProfileView from '@/components/profile/profile-view';
import { serverApi } from '@/lib/api/server-api';

const Page = async () => {
  const { data: user } = await serverApi.get('/users/me');
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-lg">Profile</CardTitle>
        <CardDescription>Change your username</CardDescription>
      </CardHeader>
      <ProfileView user={user} />
    </Card>
  );
};

export default Page;
