import React from 'react';
import { Note } from '@/types/definitions';
import NoteItem from '@/components/notes/note-item';
import { Card } from '@/components/ui/card';

interface NotesListProps {
  notes: Note[];
}

const NotesList = ({ notes }: NotesListProps) => {
  return (
    <ul className="grid grid-cols-3 gap-4 p-3">
      {notes.map((note) => (
        <Card key={note.id} className="flex flex-col justify-between">
          <NoteItem note={note} />
        </Card>
      ))}
    </ul>
  );
};

export default NotesList;
