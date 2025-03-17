
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Database, Search, Plus, Github, LogOut, User, Shield, LogIn } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
      variant: "default",
    });
    // Redirect to home page if on a protected route
    if (location.pathname === '/submit' || location.pathname === '/profile') {
      navigate('/');
    }
  };

  const handleLoginOptionClick = (provider: 'github' | 'switchedu') => {
    navigate('/');
  };

  return (
    <nav className="bg-dtrace-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <Database className="h-6 w-6" />
          <Link to="/" className="text-xl font-bold">Digital Traces DB</Link>
        </div>
        
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-dtrace-primary/80">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-dtrace-primary/80">
              <Database className="h-5 w-5 mr-2" />
              Browse
            </Button>
          </Link>
          
          {user ? (
            <>
              <Link to="/">
                <Button className="bg-dtrace-accent hover:bg-dtrace-accent/90 text-white">
                  <Plus className="h-5 w-5 mr-2" />
                  Submit Trace
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar_url} alt={user.username} />
                      <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem onClick={() => navigate('/')}>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Admin Panel</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Choose a provider</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleLoginOptionClick('github')}>
                  <Github className="mr-2 h-4 w-4" />
                  <span>Login with GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLoginOptionClick('switchedu')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Login with SwitchEdu-ID</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
