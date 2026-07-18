import React from 'react';
import { getNoteById } from '@/lib/api/server-api';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const { content, title, tag, createdAt, updatedAt } =
    await getNoteById(id);

  return (
    <Card className="max-w-sm">
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{content}</CardDescription>
        Card
      </CardContent>
    </Card>
  );
};

export default Page;
