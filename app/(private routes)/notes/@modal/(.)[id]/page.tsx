import React from 'react';
import NotesDialog from '@/components/notes/notes-dialog';

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <>
      <NotesDialog id={id} key={id} />
    </>
  );
};

export default Page;
