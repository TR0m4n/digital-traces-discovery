
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Download, Star, StarHalf, StarOff, Link as LinkIcon, Github } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const TraceDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock data for a specific trace
  const trace = {
    id: Number(id),
    app: "WhatsApp",
    appVersion: "2.23.24.11",
    os: "Android 14",
    osVersion: "14",
    rating: 5.5, // Updated rating on a scale of 6
    paths: [
      { 
        path: "/data/data/com.whatsapp/databases/msgstore.db", 
        description: "Main message database containing chats, groups, and media references" 
      },
      { 
        path: "/data/data/com.whatsapp/databases/wa.db", 
        description: "Contains contacts and some user settings" 
      },
      { 
        path: "/data/data/com.whatsapp/shared_prefs/", 
        description: "User preferences and settings" 
      },
    ],
    scripts: [
      {
        name: "WhatsApp_Chat_Parser.py",
        description: "Extracts and parses messages from the msgstore.db file",
        language: "Python",
        downloads: 142,
        gitUrl: "https://github.com/forensic-tools/whatsapp-parser"
      },
      {
        name: "WhatsApp_Media_Extractor.py",
        description: "Reconstructs media file paths from database references",
        language: "Python",
        downloads: 98,
        gitUrl: "https://github.com/forensic-tools/whatsapp-media-extractor"
      }
    ],
    forensicNotes: "The msgstore.db file is a SQLite database that contains all chat messages. Messages are stored in the 'messages' table, with media references in 'message_media'. User information is stored in the 'jid' table. The database may be encrypted on newer versions, requiring the user's crypt key from the device.",
    dateAdded: "2023-11-15",
    addedBy: "forensic_researcher",
    addedByRating: 5.2, // Updated rating on a scale of 6
    upvotes: 24,
    downvotes: 1,
    comments: [
      {
        user: "digital_detective",
        userRating: 5.8, // Updated rating on a scale of 6
        date: "2023-11-18",
        content: "I've confirmed this path works on all Android 14 devices I've tested, including Samsung and Pixel phones."
      },
      {
        user: "forensics_pro",
        userRating: 4.5, // Updated rating on a scale of 6
        date: "2023-12-02",
        content: "The structure remains the same for version 2.23.25.76 as well. The WhatsApp_Chat_Parser.py script also works great with this version."
      }
    ]
  };

  // Helper function to render star ratings on a scale of 6
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 6 - fullStars - (hasHalfStar ? 1 : 0); // Changed from 5 to 6
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}/6</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between md:items-center">
          <div>
            <Badge className="mb-2 bg-dtrace-secondary">{trace.app}</Badge>
            <h1 className="text-3xl font-bold text-dtrace-primary">Digital Trace UID: {trace.id}</h1>
            <p className="text-gray-500 mt-1">
              {trace.os} • App version {trace.appVersion}
            </p>
            <div className="mt-2 flex items-center">
              {renderStarRating(trace.rating)}
              <span className="ml-2 text-sm text-gray-500">Trace Rating</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <ThumbsUp className="mr-1 h-4 w-4" /> {trace.upvotes}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <ThumbsDown className="mr-1 h-4 w-4" /> {trace.downvotes}
            </Button>
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-dtrace-primary">Trace Information</CardTitle>
            <CardDescription className="flex items-center space-x-2">
              <span>Added on {trace.dateAdded} by {trace.addedBy}</span>
              <div className="flex items-center">
                {renderStarRating(trace.addedByRating)}
                <span className="ml-1 text-xs text-gray-500">Contributor Rating</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-medium mb-2">File Paths</h3>
              {trace.paths.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="bg-gray-100 p-2 rounded overflow-x-auto mb-1">
                    <code>{item.path}</code>
                  </div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="scripts" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
            <TabsTrigger value="notes">Forensic Notes</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scripts" className="pt-6">
            <div className="space-y-4">
              {trace.scripts.map((script, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-dtrace-primary">{script.name}</CardTitle>
                        <CardDescription>
                          <Badge variant="outline" className="mr-2">{script.language}</Badge>
                          <span className="text-gray-500">{script.downloads} downloads</span>
                        </CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={script.gitUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-1 h-4 w-4" /> Repository
                          </a>
                        </Button>
                        <Button size="sm">
                          <Download className="mr-1 h-4 w-4" /> Download
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{script.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="notes" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-dtrace-primary">Forensic Analysis Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{trace.forensicNotes}</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="comments" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-dtrace-primary">User Comments</CardTitle>
                <CardDescription>{trace.comments.length} comments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trace.comments.map((comment, index) => (
                    <div key={index} className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="font-medium">{comment.user}</div>
                          {renderStarRating(comment.userRating)}
                        </div>
                        <div className="text-sm text-gray-500">{comment.date}</div>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                      {index < trace.comments.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
      </div>
    </Layout>
  );
};

export default TraceDetails;
