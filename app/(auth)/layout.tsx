import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-1 w-full items-center justify-center">
      {children}
    </div>
  );
};

export default Layout;
