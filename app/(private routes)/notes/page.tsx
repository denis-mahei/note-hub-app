import React from 'react';
import NotesList from '@/components/notes/notes-list';
import { CreateNote } from '@/components/notes/create-note';
import { getNotesData } from '@/lib/api/server-api';

const Page = async () => {
  const { notes, totalPages } = await getNotesData();
  return (
    <div>
      <NotesList notes={notes} />
      <CreateNote />
    </div>
  );
};

export default Page;
