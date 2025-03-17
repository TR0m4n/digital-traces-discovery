
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Star, StarHalf, StarOff } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Mock data for user activity
  const userActivity = {
    tracesSubmitted: 5,
    commentsPosted: 12,
    ratingsGiven: 23
  };

  // Mock user rating (on a scale of 6)
  const userRating = 4.5;
  
  // Helper function to render star ratings on a scale of 6
  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 6 - fullStars - (hasHalfStar ? 1 : 0);
    
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
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-dtrace-primary mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1">
            <CardHeader>
              <div className="flex justify-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={user.avatar_url} alt={user.username} />
                  <AvatarFallback>{user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-center mt-4">{user.username}</CardTitle>
              <CardDescription className="text-center">{user.email}</CardDescription>
              <div className="flex justify-center mt-2">
                <Badge variant="outline" className="bg-dtrace-primary/10">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>
              {/* Add user rating display */}
              <div className="flex justify-center mt-2">
                {renderStarRating(userRating)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500">
                <div className="flex justify-between py-2 border-b">
                  <span>Account Type</span>
                  <span className="font-medium">{user.oauth_provider === 'github' ? 'GitHub' : 'SwitchEdu-ID'}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span>Member Since</span>
                  <span className="font-medium">{new Date(user.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Activity Summary</CardTitle>
              <CardDescription>Your contributions to the Digital Traces database</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-dtrace-primary/10 p-4 rounded-lg text-center">
                  <h3 className="text-dtrace-primary text-3xl font-bold">{userActivity.tracesSubmitted}</h3>
                  <p className="text-gray-600">Traces Submitted</p>
                </div>
                <div className="bg-dtrace-primary/10 p-4 rounded-lg text-center">
                  <h3 className="text-dtrace-primary text-3xl font-bold">{userActivity.commentsPosted}</h3>
                  <p className="text-gray-600">Comments Posted</p>
                </div>
                <div className="bg-dtrace-primary/10 p-4 rounded-lg text-center">
                  <h3 className="text-dtrace-primary text-3xl font-bold">{userActivity.ratingsGiven}</h3>
                  <p className="text-gray-600">Ratings Given</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium text-lg mb-4">Recent Contributions</h3>
                <div className="space-y-3">
                  {/* Mock recent contributions */}
                  <div className="border p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">Added WhatsApp trace location</span>
                      <span className="text-gray-500 text-sm">2 days ago</span>
                    </div>
                    <p className="text-gray-600 text-sm">For Android 14, version 2.23.24.11</p>
                  </div>
                  <div className="border p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">Commented on Signal trace</span>
                      <span className="text-gray-500 text-sm">5 days ago</span>
                    </div>
                    <p className="text-gray-600 text-sm">Added clarification about iOS storage location</p>
                  </div>
                  <div className="border p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">Rated Telegram script</span>
                      <span className="text-gray-500 text-sm">1 week ago</span>
                    </div>
                    <p className="text-gray-600 text-sm">5-star rating for message extraction script</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
