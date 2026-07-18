import React from 'react';
import { getNoteById } from '@/lib/api/server-api';
import { Card } from '@/components/ui/card';
import NoteContent from '@/components/notes/note-content';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const { content, title, tag, createdAt, updatedAt } =
    await getNoteById(id);

  return (
    <Card className="max-w-sm">
      <NoteContent
        title={title}
        content={content}
        tag={tag}
        update={updatedAt}
        create={createdAt}
      />
    </Card>
  );
};

export default Page;
