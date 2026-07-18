import React from 'react';
import {
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface NoteContentProps {
  title: string;
  content: string;
  tag: string;
  update?: string;
  create?: string;
}

const NoteContent = ({
  title,
  content,
  tag,
  create,
  update,
}: NoteContentProps) => {
  // const updatedAt = format(update, 'dd MMM yyyy, HH:mm', {
  //   locale: enUS,
  // });
  // const createdAt = format(create, 'dd MMM yyyy, HH:mm', {
  //   locale: enUS,
  // });
  const formattedDate = update
    ? `Updated at: ${update}`
    : `Created at: ${create}`;
  return (
    <CardContent className="flex flex-col gap-2">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{content}</CardDescription>
      <p>{formattedDate}</p>
      {/*{update && (*/}
      {/*  <p className="text-muted-foreground text-sm">*/}
      {/*    Updated at: {updatedAt}*/}
      {/*  </p>*/}
      {/*)}*/}
      {/*{create && (*/}
      {/*  <p className="text-muted-foreground text-sm">{createdAt}</p>*/}
      {/*)}*/}
      <Badge>{tag}</Badge>
    </CardContent>
  );
};

export default NoteContent;
