
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search as SearchIcon } from "lucide-react";
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState("");
  const [appFilter, setAppFilter] = useState<string>("");
  const [osFilter, setOsFilter] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  // Mock data for filtering options
  const applications = [
    { value: "whatsapp", label: "WhatsApp" },
    { value: "signal", label: "Signal" },
    { value: "telegram", label: "Telegram" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
  ];

  const operatingSystems = [
    { value: "android", label: "Android" },
    { value: "ios", label: "iOS" },
    { value: "windows", label: "Windows" },
    { value: "macos", label: "macOS" },
    { value: "linux", label: "Linux" },
  ];

  // Mock search results
  const mockResults = [
    { 
      id: 101, 
      app: "WhatsApp", 
      os: "Android 14", 
      version: "2.23.24.11", 
      path: "/data/data/com.whatsapp/databases/msgstore.db",
      description: "Main message database containing chats, groups, and media references"
    },
    { 
      id: 102, 
      app: "WhatsApp", 
      os: "Android 13", 
      version: "2.22.24.78", 
      path: "/data/data/com.whatsapp/databases/msgstore.db",
      description: "Main message database containing chats, groups, and media references"
    },
    { 
      id: 103, 
      app: "WhatsApp", 
      os: "iOS 17", 
      version: "23.21.79", 
      path: "/private/var/mobile/Containers/Data/Application/[UUID]/Documents/ChatStorage.sqlite",
      description: "Chat database with messages and contacts"
    },
    { 
      id: 104, 
      app: "Signal", 
      os: "Android 14", 
      version: "6.26.3", 
      path: "/data/data/org.thoughtcrime.securesms/databases/signal.db",
      description: "Encrypted database containing message data"
    },
    { 
      id: 105, 
      app: "Telegram", 
      os: "Windows 11", 
      version: "4.8.1", 
      path: "C:\\Users\\[username]\\AppData\\Roaming\\Telegram Desktop\\tdata\\",
      description: "Folder containing database files and cache"
    },
  ];

  const handleSearch = () => {
    // In a real application, this would be an API call
    // For now, we'll simulate filtering on the mock data
    let filtered = [...mockResults];
    
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.app.toLowerCase().includes(lowerQuery) ||
          item.os.toLowerCase().includes(lowerQuery) || 
          item.path.toLowerCase().includes(lowerQuery) ||
          item.description.toLowerCase().includes(lowerQuery)
      );
    }
    
    if (appFilter) {
      // Find the label for the selected application value
      const selectedApp = applications.find(app => app.value === appFilter)?.label;
      if (selectedApp) {
        filtered = filtered.filter(item => item.app === selectedApp);
      }
    }
    
    if (osFilter) {
      // Check if the OS name is included in the OS string
      const selectedOs = operatingSystems.find(os => os.value === osFilter)?.label;
      if (selectedOs) {
        filtered = filtered.filter(item => item.os.includes(selectedOs));
      }
    }
    
    setResults(filtered);
    setSearched(true);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-dtrace-primary mb-8">Search Digital Traces</h1>
        
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  placeholder="Search for applications, UIDs, or paths..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <Select value={appFilter} onValueChange={setAppFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Application" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Applications</SelectItem>
                    {applications.map((app) => (
                      <SelectItem key={app.value} value={app.value}>
                        {app.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={osFilter} onValueChange={setOsFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Operating System" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All OS</SelectItem>
                    {operatingSystems.map((os) => (
                      <SelectItem key={os.value} value={os.value}>
                        {os.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="md:col-span-4">
                <Button 
                  onClick={handleSearch}
                  className="w-full bg-dtrace-primary hover:bg-dtrace-primary/90"
                >
                  <SearchIcon className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {searched && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-dtrace-primary">
                Search Results ({results.length})
              </h2>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {results.map((result) => (
                  <Card key={result.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-dtrace-primary">{result.app}</CardTitle>
                          <CardDescription>
                            {result.os} • Version {result.version}
                          </CardDescription>
                        </div>
                        <div className="text-sm text-gray-500">
                          UID: {result.id}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">{result.description}</p>
                      <div className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                        <code>{result.path}</code>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/trace/${result.id}`} className="text-dtrace-secondary hover:underline">
                        View Details
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search terms or filters.
                </p>
                <Link to="/submit">
                  <Button 
                    variant="outline" 
                    className="border-dtrace-primary text-dtrace-primary hover:bg-dtrace-primary hover:text-white"
                  >
                    Submit a New Trace
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Search;
