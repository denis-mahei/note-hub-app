import React from 'react';
import { getNotesById } from '@/lib/api/server-api';
import NotesDialog from '@/components/notes/notes-dialog';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const note = await getNotesById(id);
  return (
    <>
      <NotesDialog note={note} />
    </>
  );
};

export default Page;
