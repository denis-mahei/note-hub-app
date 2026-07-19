import React from 'react';
import NotesList from '@/components/notes/notes-list';
import { CreateNote } from '@/components/notes/create-note';
import { getNotesData } from '@/lib/api/server-api';
import Link from 'next/link';
import { TAGS } from '@/types/definitions';
import SearchInput from '@/components/notes/search-input';
import { MoveLeft, MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clsx } from 'clsx';

interface PageProps {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;

  const currentPage =
    typeof params.page === 'string' ? params.page : '1';
  const tag = typeof params.tag === 'string' ? params.tag : '';
  const search =
    typeof params.search === 'string' ? params.search : '';
  const page = Number(currentPage);
  const { notes, totalPages } = await getNotesData({
    page,
    tag,
    search,
  });

  const pages = Array.from({ length: totalPages });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={'/notes'}
            className={clsx(
              'rounded-full px-3 py-1 text-sm font-medium transition-colors',
              !tag
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/80 hover:bg-secondary',
            )}
          >
            All
          </Link>
          {TAGS.map((t) => (
            <Link
              key={t}
              href={`/notes?tag=${t}`}
              className={clsx(
                'rounded-full px-3 py-1 text-sm font-medium transition-colors',
                tag === t
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/80 hover:bg-secondary',
              )}
            >
              {t}
            </Link>
          ))}
        </div>
        <SearchInput className="sm:ml-auto" />
      </div>
      <NotesList notes={notes} />
      <div className="flex items-center gap-2 justify-center">
        {page > 1 && (
          <Link
            href={`/notes?page=${page - 1}`}
            className="border bg-background rounded-full px-2 py-2"
          >
            <MoveLeft size={12} />
          </Link>
        )}
        {pages.map((_, i) => (
          <Link
            key={i}
            href={`/notes?page=${i + 1}`}
            className={clsx(
              'rounded-full px-3 py-1 text-sm transition-colors',
              page === i + 1
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary/80 hover:bg-secondary',
            )}
          >
            {i + 1}
          </Link>
        ))}
        {page < totalPages && (
          <Link
            href={`/notes?page=${page + 1}`}
            className="border bg-background rounded-full px-2 py-2"
          >
            <MoveRight size={12} />
          </Link>
        )}
      </div>
      <CreateNote />
    </div>
  );
};

export default Page;
