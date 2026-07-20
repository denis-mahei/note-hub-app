import WelcomeCta from '@/components/welcome-cta';
import { NotebookText } from 'lucide-react';
import { Card, CardFooter } from '@/components/ui/card';
import { CodeXml } from 'lucide-react';

export default function Home() {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center font-sans">
        <main className="flex w-full max-w-lg flex-col items-center gap-6 px-6 py-24 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl border bg-muted">
            <NotebookText className="size-8 text-muted-foreground" />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome to NoteHub
            </h1>
            <p className="text-muted-foreground">
              Capture your thoughts, organize your notes, and keep
              everything in one place.
            </p>
          </div>
          <WelcomeCta />
        </main>
      </div>
      <CardFooter className="justify-center">
        <Card className="py-6 px-24">
          <div className="flex items-center gap-2 border-b border-gray-200">
            <CodeXml size={18} />
            <h2 className="font-bold">Developer: Denys Mahei</h2>
          </div>
        </Card>
      </CardFooter>
    </>
  );
}
