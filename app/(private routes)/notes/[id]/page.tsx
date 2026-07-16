import React from 'react';
import { getNoteById } from '@/lib/api/server-api';
import NoteItem from '@/components/notes/note-item';
import { Card, CardContent } from '@/components/ui/card';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const { content, title, tag, createdAt, updatedAt } =
    await getNoteById(id);

  return (
    <Card className="max-w-sm">
      <CardContent>{content}</CardContent>
    </Card>
  );
};

export default Page;
