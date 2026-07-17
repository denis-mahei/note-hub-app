import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const Layout = ({ children, modal }: LayoutProps) => {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
};

export default Layout;
