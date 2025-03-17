
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

const Browse = () => {
  // Mock data for applications
  const applications = [
    { 
      id: "whatsapp", 
      name: "WhatsApp", 
      category: "Messaging",
      traceCount: 28, 
      platforms: ["Android", "iOS", "Windows", "macOS"]
    },
    { 
      id: "signal", 
      name: "Signal", 
      category: "Messaging",
      traceCount: 16, 
      platforms: ["Android", "iOS", "Windows", "macOS", "Linux"]
    },
    { 
      id: "telegram", 
      name: "Telegram", 
      category: "Messaging",
      traceCount: 20, 
      platforms: ["Android", "iOS", "Windows", "macOS", "Linux"]
    },
    { 
      id: "facebook", 
      name: "Facebook", 
      category: "Social Media",
      traceCount: 32, 
      platforms: ["Android", "iOS", "Web"]
    },
    { 
      id: "instagram", 
      name: "Instagram", 
      category: "Social Media",
      traceCount: 24, 
      platforms: ["Android", "iOS", "Web"]
    },
    { 
      id: "twitter", 
      name: "Twitter/X", 
      category: "Social Media",
      traceCount: 22, 
      platforms: ["Android", "iOS", "Web"]
    },
    { 
      id: "chrome", 
      name: "Google Chrome", 
      category: "Browsers",
      traceCount: 18, 
      platforms: ["Android", "iOS", "Windows", "macOS", "Linux"]
    },
    { 
      id: "firefox", 
      name: "Firefox", 
      category: "Browsers",
      traceCount: 15, 
      platforms: ["Android", "iOS", "Windows", "macOS", "Linux"]
    },
    { 
      id: "safari", 
      name: "Safari", 
      category: "Browsers",
      traceCount: 12, 
      platforms: ["iOS", "macOS"]
    },
  ];

  // Group applications by category
  const groupedApplications = applications.reduce((acc, app) => {
    if (!acc[app.category]) {
      acc[app.category] = [];
    }
    acc[app.category].push(app);
    return acc;
  }, {} as Record<string, typeof applications>);

  // Mock data for operating systems
  const operatingSystems = [
    { 
      id: "android", 
      name: "Android", 
      versions: ["14", "13", "12", "11", "10"],
      traceCount: 120
    },
    { 
      id: "ios", 
      name: "iOS", 
      versions: ["17", "16", "15", "14", "13"],
      traceCount: 95
    },
    { 
      id: "windows", 
      name: "Windows", 
      versions: ["11", "10", "8.1", "7"],
      traceCount: 85
    },
    { 
      id: "macos", 
      name: "macOS", 
      versions: ["Sonoma", "Ventura", "Monterey", "Big Sur", "Catalina"],
      traceCount: 70
    },
    { 
      id: "linux", 
      name: "Linux", 
      versions: ["Ubuntu 22.04", "Ubuntu 20.04", "Debian 12", "Fedora 39"],
      traceCount: 60
    },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-dtrace-primary mb-8">Browse Digital Traces</h1>
        
        <Tabs defaultValue="applications" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="applications">By Application</TabsTrigger>
            <TabsTrigger value="os">By Operating System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="applications" className="pt-6">
            {Object.entries(groupedApplications).map(([category, apps]) => (
              <div key={category} className="mb-8">
                <h2 className="text-xl font-semibold text-dtrace-primary mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {apps.map((app) => (
                    <Card key={app.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-dtrace-primary">{app.name}</CardTitle>
                        <CardDescription>{app.traceCount} traces available</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {app.platforms.map((platform) => (
                            <Badge key={platform} variant="outline">{platform}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link 
                          to={`/search?app=${app.id}`} 
                          className="text-dtrace-secondary hover:underline"
                        >
                          View All Traces
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="os" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {operatingSystems.map((os) => (
                <Card key={os.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-dtrace-primary">{os.name}</CardTitle>
                    <CardDescription>{os.traceCount} traces available</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-medium text-sm mb-2">Available Versions:</h3>
                    <div className="flex flex-wrap gap-2">
                      {os.versions.map((version) => (
                        <Badge key={version} variant="outline">{version}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link 
                      to={`/search?os=${os.id}`} 
                      className="text-dtrace-secondary hover:underline"
                    >
                      View All Traces
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Browse;
