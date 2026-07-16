import React from 'react';
import { Note } from '@/types/definitions';
import NoteItem from '@/components/notes/note-item';

interface NotesListProps {
  notes: Note[];
}

const NotesList = ({ notes }: NotesListProps) => {
  return (
    <ul className="grid grid-cols-3 gap-4 ">
      {notes.map((note) => (
        <li
          key={note.id}
          className="p-2 border border-gray-200 rounded-xl"
        >
          <NoteItem note={note} />
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
