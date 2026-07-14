import React from 'react';
import { Note } from '@/types/definitions';

interface NotesListProps {
  notes: Note[];
}

const NotesList = ({ notes }: NotesListProps) => {
  return (
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <h2>{note.title}</h2>
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
