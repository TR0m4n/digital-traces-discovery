
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, BookOpen } from "lucide-react";
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (provider: 'github' | 'switchedu') => {
    login(provider);
    
    toast({
      title: "Login Successful",
      description: `You have been logged in with ${provider === 'github' ? 'GitHub' : 'SwitchEdu-ID'}.`,
      variant: "default",
    });
    
    // Navigate to home page after login
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-dtrace-primary">Login to Digital Traces DB</CardTitle>
            <CardDescription>
              Connect with your GitHub or SwitchEdu-ID account to contribute to the database
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-black hover:bg-gray-800 text-white"
              onClick={() => handleLogin('github')}
              disabled={isLoading}
            >
              <Github className="mr-2 h-5 w-5" />
              {isLoading ? 'Connecting...' : 'Login with GitHub'}
            </Button>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => handleLogin('switchedu')}
              disabled={isLoading}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              {isLoading ? 'Connecting...' : 'Login with SwitchEdu-ID'}
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-gray-500">
            <p>
              Your login will be used to track your contributions to the database.
              We only collect basic profile information.
            </p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
