import React from 'react';
import {
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Clock } from 'lucide-react';

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
  const wasEdited = update !== create;

  const updatedAt =
    update &&
    format(new Date(update), 'dd MMM yyyy, HH:mm', {
      locale: enUS,
    });
  const createdAt =
    create &&
    format(new Date(create), 'dd MMM yyyy, HH:mm', {
      locale: enUS,
    });

  return (
    <CardContent className="flex flex-col gap-2">
      <CardTitle>{title}</CardTitle>
      <CardDescription>{content}</CardDescription>

      <p className="text-muted-foreground text-xs flex items-center gap-1">
        <Clock size={12} color="black" />
        {wasEdited
          ? `Updated at: ${updatedAt}`
          : `Created at: ${createdAt}`}
      </p>

      <Badge>{tag}</Badge>
    </CardContent>
  );
};

export default NoteContent;
