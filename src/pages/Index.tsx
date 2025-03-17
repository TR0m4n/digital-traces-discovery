import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Database, Code, FileText } from "lucide-react";
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const Index = () => {
  const recentTraces = [
    { id: 1, app: "WhatsApp", os: "Android 14", version: "2.23.24.11", path: "/data/data/com.whatsapp/databases/" },
    { id: 2, app: "Signal", os: "iOS 17", version: "6.26.0", path: "/private/var/mobile/Containers/Data/Application/..." },
    { id: 3, app: "Telegram", os: "Windows 11", version: "4.8.1", path: "C:\\Users\\[username]\\AppData\\Roaming\\Telegram Desktop\\..." },
  ];

  const stats = [
    { label: "Applications", value: "120+", icon: <Database className="h-8 w-8 text-dtrace-secondary" /> },
    { label: "Digital Traces", value: "1,500+", icon: <FileText className="h-8 w-8 text-dtrace-secondary" /> },
    { label: "Scripts", value: "250+", icon: <Code className="h-8 w-8 text-dtrace-secondary" /> },
  ];

  const { user, isLoading } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <Layout>
      <section className="py-12 dtrace-gradient rounded-2xl text-white mb-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">Digital Traces Location Database</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A collaborative repository of application data locations across different operating systems for digital forensics research
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
            <Input 
              type="text" 
              placeholder="Search for an application, OS, or UID..." 
              className="bg-white/20 text-white placeholder:text-white/70 border-white/20 focus:border-white"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button type="submit" className="bg-dtrace-accent hover:bg-dtrace-accent/90">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </form>
        </div>
      </section>
      
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <h3 className="text-3xl font-bold text-dtrace-primary">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-dtrace-primary">Recent Traces</h2>
          <Link to="/browse" className="text-dtrace-secondary hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentTraces.map((trace) => (
            <Card key={trace.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-dtrace-primary">{trace.app}</CardTitle>
                <CardDescription>
                  {trace.os} • Version {trace.version}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                  <code>{trace.path}</code>
                </div>
              </CardContent>
              <CardFooter>
                <Link to={`/trace/${trace.id}`} className="text-dtrace-secondary hover:underline w-full text-center">
                  View Details
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      
      <section className="text-center py-10">
        <h2 className="text-2xl font-bold text-dtrace-primary mb-4">Contribute to the Database</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Help grow our collaborative repository by submitting new digital trace locations
          or improving existing entries.
        </p>
        {user ? (
          <Link to="/submit">
            <Button size="lg" className="bg-dtrace-accent text-white hover:bg-dtrace-accent/90">
              Submit a New Trace
            </Button>
          </Link>
        ) : (
          <div className="space-y-2">
            <Link to="/login">
              <Button size="lg" className="bg-dtrace-accent text-white hover:bg-dtrace-accent/90">
                Login to Submit a Trace
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-2">You need to be logged in to submit traces</p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Index;
