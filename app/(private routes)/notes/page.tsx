import React from 'react';
import NotesList from '@/components/notes/notes-list';
import { getNotesData } from '@/lib/api/notes.server';
import { CreateNote } from '@/components/notes/create-note';

const Page = async () => {
  const data = await getNotesData();
  const notes = data.notes;
  console.log('notes', notes);
  return (
    <div>
      <NotesList notes={notes} />
      <CreateNote />
    </div>
  );
};

export default Page;
