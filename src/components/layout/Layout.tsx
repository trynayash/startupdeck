
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  withFooter?: boolean;
}

const Layout = ({ children, withFooter = true }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">{children}</main>
      {withFooter && <Footer />}
    </div>
  );
};

export default Layout;
