import React from 'react';
import { User } from '@/types/definitions';
import Image from 'next/image';

interface UserBarProps {
  user: User;
}

const UserBar = ({ user }: UserBarProps) => {
  const index = user.username.indexOf('@');
  const userName = user.username.slice(0, index);
  return (
    <div className="flex items-center gap-2">
      <p className="text-taupe-900">{userName}</p>
      <Image
        src={user.avatar}
        alt="Avatar"
        width={30}
        height={30}
        className="rounded-full"
      />
    </div>
  );
};

export default UserBar;
