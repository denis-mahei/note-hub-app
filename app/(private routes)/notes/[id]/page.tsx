import React from 'react';
import { getNoteById } from '@/lib/api/client-api';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const note = await getNoteById(id);

  return (
    <div>
      <h1>This is Modal</h1>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.tag}</p>
    </div>
  );
};

export default Page;
