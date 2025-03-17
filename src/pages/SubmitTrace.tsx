
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, MinusCircle, Github } from "lucide-react";

// Updated schema to include scripts with Git repository URLs
const formSchema = z.object({
  application: z.string().min(1, { message: "Application is required" }),
  appVersion: z.string().min(1, { message: "Application version is required" }),
  operatingSystem: z.string().min(1, { message: "Operating system is required" }),
  osVersion: z.string().min(1, { message: "OS version is required" }),
  paths: z.array(
    z.object({
      path: z.string().min(1, { message: "Path is required" }),
      description: z.string().min(1, { message: "Description is required" }),
    })
  ).min(1, { message: "At least one path is required" }),
  // New field for scripts
  scripts: z.array(
    z.object({
      name: z.string().min(1, { message: "Script name is required" }),
      description: z.string().min(1, { message: "Description is required" }),
      language: z.string().min(1, { message: "Programming language is required" }),
      gitUrl: z.string().url({ message: "Valid Git repository URL is required" })
        .refine(url => url.includes('github.com') || url.includes('gitlab.com') || url.includes('bitbucket.org'), {
          message: "URL must be from a Git hosting service (GitHub, GitLab, or Bitbucket)"
        }),
    })
  ).optional().default([]),
  forensicNotes: z.string().optional(),
});

const SubmitTrace = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      application: "",
      appVersion: "",
      operatingSystem: "",
      osVersion: "",
      paths: [{ path: "", description: "" }],
      scripts: [],
      forensicNotes: "",
    },
  });

  // Mock data for dropdowns
  const applications = [
    { value: "whatsapp", label: "WhatsApp" },
    { value: "signal", label: "Signal" },
    { value: "telegram", label: "Telegram" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "other", label: "Other (specify)" },
  ];

  const operatingSystems = [
    { value: "android", label: "Android" },
    { value: "ios", label: "iOS" },
    { value: "windows", label: "Windows" },
    { value: "macos", label: "macOS" },
    { value: "linux", label: "Linux" },
  ];

  const programmingLanguages = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "other", label: "Other" },
  ];

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Fix: use toast.success instead of calling toast directly
    toast.success({
      title: "Trace submitted",
      description: "Thank you for your contribution! Our team will review your submission shortly.",
    });
    form.reset();
  }

  // Function to add a new path field
  const addPath = () => {
    const currentPaths = form.getValues("paths");
    form.setValue("paths", [...currentPaths, { path: "", description: "" }]);
  };

  // Function to remove a path field
  const removePath = (index: number) => {
    const currentPaths = form.getValues("paths");
    if (currentPaths.length > 1) {
      form.setValue(
        "paths",
        currentPaths.filter((_, i) => i !== index)
      );
    }
  };

  // Function to add a new script field
  const addScript = () => {
    const currentScripts = form.getValues("scripts");
    form.setValue("scripts", [...currentScripts, { name: "", description: "", language: "", gitUrl: "" }]);
  };

  // Function to remove a script field
  const removeScript = (index: number) => {
    const currentScripts = form.getValues("scripts");
    form.setValue(
      "scripts",
      currentScripts.filter((_, i) => i !== index)
    );
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-dtrace-primary mb-2">Submit a Digital Trace</h1>
        <p className="text-gray-600 mb-8">
          Contribute to our database by submitting a new digital trace location
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-dtrace-primary">Trace Information</CardTitle>
            <CardDescription>
              Please provide detailed information about the digital trace location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="application"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an application" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {applications.map((app) => (
                              <SelectItem key={app.value} value={app.value}>
                                {app.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="appVersion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Application Version</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 2.23.24.11" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operatingSystem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Operating System</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select OS" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {operatingSystems.map((os) => (
                              <SelectItem key={os.value} value={os.value}>
                                {os.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="osVersion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OS Version</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 14 or Sonoma" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <FormLabel>Trace Paths</FormLabel>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addPath}
                      className="flex items-center"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Path
                    </Button>
                  </div>

                  {form.watch("paths").map((_, index) => (
                    <div key={index} className="space-y-4 p-4 rounded-md bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm">Path {index + 1}</h4>
                        {form.watch("paths").length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removePath(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name={`paths.${index}.path`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>File Path</FormLabel>
                            <FormControl>
                              <Input placeholder="/path/to/file.db" {...field} />
                            </FormControl>
                            <FormDescription>
                              The exact file path where the digital trace can be found
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`paths.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="What data can be found at this location?" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>

                {/* Scripts Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <FormLabel>Scripts (Optional)</FormLabel>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={addScript}
                      className="flex items-center"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" /> Add Script
                    </Button>
                  </div>

                  {form.watch("scripts").map((_, index) => (
                    <div key={index} className="space-y-4 p-4 rounded-md bg-gray-50">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm">Script {index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeScript(index)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                      </div>

                      <FormField
                        control={form.control}
                        name={`scripts.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Script Name</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. WhatsApp_Chat_Parser.py" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`scripts.${index}.language`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Programming Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {programmingLanguages.map((lang) => (
                                  <SelectItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`scripts.${index}.gitUrl`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Git Repository URL</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                                  <Github className="h-4 w-4" />
                                </div>
                                <Input 
                                  className="rounded-l-none" 
                                  placeholder="https://github.com/username/repository" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormDescription>
                              Link to a Git repository (GitHub, GitLab, Bitbucket) containing the script
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`scripts.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Script Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="What does this script do? How to use it?" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>

                <FormField
                  control={form.control}
                  name="forensicNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Forensic Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Additional information that might be useful for forensic analysis" 
                          {...field} 
                          className="min-h-[120px]"
                        />
                      </FormControl>
                      <FormDescription>
                        Include information about data structure, encryption, or any other relevant details
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-dtrace-primary hover:bg-dtrace-primary/90"
                >
                  Submit Digital Trace
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-dtrace-primary">Submission Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="guidelines">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                <TabsTrigger value="tips">Tips & Examples</TabsTrigger>
              </TabsList>
              <TabsContent value="guidelines" className="space-y-4 pt-4">
                <div>
                  <h3 className="font-semibold mb-2">Quality Standards</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Provide accurate and complete path information</li>
                    <li>Verify the application version and OS version</li>
                    <li>Include meaningful descriptions of what data can be found</li>
                    <li>Add relevant forensic notes when possible</li>
                    <li>Use Git repositories for sharing scripts (GitHub, GitLab, or Bitbucket)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Review Process</h3>
                  <p>All submissions are reviewed by our team before being added to the database. This process usually takes 1-2 business days.</p>
                </div>
              </TabsContent>
              <TabsContent value="tips" className="space-y-4 pt-4">
                <div>
                  <h3 className="font-semibold mb-2">Example Path Format</h3>
                  <div className="bg-gray-100 p-2 rounded">
                    <code>/data/data/com.application.name/databases/main.db</code>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Example Description</h3>
                  <p className="text-sm italic">"Main SQLite database containing user chats. Messages are stored in the 'messages' table with timestamps in Unix epoch format."</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Git Repository Best Practices</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Include clear documentation in the README.md</li>
                    <li>Provide requirements.txt or package.json for dependencies</li>
                    <li>Add sample data files when possible (sanitized of personal information)</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SubmitTrace;
