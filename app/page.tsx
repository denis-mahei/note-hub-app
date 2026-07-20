import WelcomeCta from '@/components/welcome-cta';
import { NotebookText } from 'lucide-react';
import { Card, CardFooter } from '@/components/ui/card';
import { CodeXml } from 'lucide-react';
import { FaGithub, FaTelegram, FaLinkedin } from 'react-icons/fa';

const SOCIAL_LINKS = [
  {
    href: 'https://github.com/denis-mahei',
    icon: FaGithub,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/denys-mahei-dev',
    icon: FaLinkedin,
    label: 'LinkedIn',
  },
  {
    href: 'https://t.me/denismahei',
    icon: FaTelegram,
    label: 'Telegram',
  },
];

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
      <footer className="justify-center">
        <Card className="flex justify-center p-6 w-full">
          <div className="flex justify-center items-center gap-2">
            <CodeXml size={18} />
            <span className="font-bold">Developer: Denys Mahei</span>
          </div>
          <ul className="flex justify-center items-center gap-2.5 p-3">
            {SOCIAL_LINKS.map(({ href, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={24} />
                </a>
              </li>
            ))}
          </ul>
          <p className="text-center text-muted-foreground">
            All rights reserved ©
          </p>
        </Card>
      </footer>
    </>
  );
}
