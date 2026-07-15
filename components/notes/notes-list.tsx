import React from 'react';
import { Note } from '@/types/definitions';
import Link from 'next/link';

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
          <Link href={`/notes/${note.id}`}>
            <h2>Title: {note.title}</h2>
            <p>Content: {note.content}</p>
            <p>Categories: {note.tag}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
