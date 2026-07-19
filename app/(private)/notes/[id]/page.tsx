import React from 'react';
import { getNoteById } from '@/lib/api/server-api';
import { Card } from '@/components/ui/card';
import NoteView from '@/components/notes/note-view';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const note = await getNoteById(id);

  return (
    <Card className="max-w-sm">
      <NoteView note={note} />
    </Card>
  );
};

export default Page;
