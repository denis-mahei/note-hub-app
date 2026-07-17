import React from 'react';
import NotesList from '@/components/notes/notes-list';
import { CreateNote } from '@/components/notes/create-note';
import { getNotesData } from '@/lib/api/server-api';
import Link from 'next/link';
import { TAGS } from '@/types/definitions';
import SearchInput from '@/components/notes/search-input';

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const currentPage =
    typeof params.page === 'string' ? params.page : '1';
  const tags = params.tag ? params.tag : '';
  const { notes, totalPages } = await getNotesData({
    page: currentPage,
    tag: tags,
  });
  const page = Number(currentPage);
  return (
    <div>
      <SearchInput />
      <div>
        <h4>Filter:</h4>
        <Link href={'/notes'}>All</Link>
        {TAGS.map((tag) => (
          <Link key={tag} href={`/notes?tag=${tag}`}>
            {tag}
          </Link>
        ))}
      </div>
      <NotesList notes={notes} />
      <div>
        {page > 1 && <Link href={`/notes?page=${page - 1}`}>-</Link>}
        {Number(currentPage) < totalPages && (
          <Link href={`/notes?page=${page + 1}`}>+</Link>
        )}
      </div>
      <CreateNote />
    </div>
  );
};

export default Page;
