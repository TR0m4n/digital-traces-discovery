
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-dtrace-background flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-dtrace-primary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Digital Traces Location DB
              </p>
              <p className="text-xs text-gray-300 mt-1">
                A collaborative database for digital forensics research
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white text-sm">About</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">Terms</a>
              <a href="#" className="text-gray-300 hover:text-white text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster />
    </div>
  );
};

export default Layout;
