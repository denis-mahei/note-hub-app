import React from 'react';
import { getNoteById } from '@/lib/api/server-api';
import { Card } from '@/components/ui/card';
import NoteView from '@/components/notes/note-view';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const note = await getNoteById(id);
  return {
    title: `Note: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Note: ${note.title}`,
      description: note.content.slice(0, 50),
      url: `https://notehub.com/notes/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
      type: 'article',
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const note = await getNoteById(id);

  return (
    <Card className="max-w-sm">
      <NoteView note={note} />
    </Card>
  );
};

export default Page;
