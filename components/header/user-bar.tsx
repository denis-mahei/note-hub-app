import React from 'react';
import { User } from '@/types/definitions';
import Image from 'next/image';
import Link from 'next/link';

interface UserBarProps {
  user: User;
}

const UserBar = ({ user }: UserBarProps) => {
  const name = user.username.includes('@')
    ? user.username.split('@')[0]
    : user.username;

  return (
    <Link href={'/profile'} className="flex items-center gap-2">
      <p className="text-taupe-900 font-bold">{name}</p>
      <Image
        src={user.avatar}
        alt="Avatar"
        width={30}
        height={30}
        className="rounded-full"
      />
    </Link>
  );
};

export default UserBar;
