"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
// import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";


export default function PostJobPage() {
  const { toast } = useToast();
  const { isSignedIn, userId } = useAuth();

  console.log(userId,"userid");
  

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    responsibilities: "",
    requirements: "",
    applicationLink: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!jobData.title) newErrors.title = "Job title is required.";
    if (!jobData.company) newErrors.company = "Company name is required.";
    if (!jobData.location) newErrors.location = "Location is required.";
    if (!jobData.type) newErrors.type = "Job type is required.";
    if (!jobData.description)
      newErrors.description = "Description is required.";
    if (!jobData.applicationLink)
      newErrors.applicationLink = "Application link is required.";
    // Add more validations as needed

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to post a job.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    if (!validate()) {
      setLoading(false);
      return; // Stop submission if validation fails
    }

    try {
      // API call to post job data
      const response = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...jobData,
          responsibilities: jobData.responsibilities.split("\n"), // Convert to array
          requirements: jobData.requirements.split("\n"), // Convert to array
          userId: userId, // Include the user ID from Clerk

        }),
      });

      console.log(response, "response post job data found ");

      if (!response.ok) {
        throw new Error("Failed to post job");
      }

      // Optionally handle success (e.g., show a toast notification)
      // toast({
      //   title: "Success!",
      //   description: "Your job has been posted successfully.",
      //   duration: 5000,
      // });

      toast({
        title: "Success!",
        description: "Your job has been posted successfully.",
        duration: 5000,
      });

      // Reset form or redirect
      setJobData({
        title: "",
        company: "",
        location: "",
        type: "",
        description: "",
        responsibilities: "",
        requirements: "",
        applicationLink: "",
      });

      router.push('/jobs'); // Redirect to jobs page

    } catch (error) {
      // Optionally handle error (e.g., show a toast notification)
      // toast({
      //   title: "Error",
      //   description: "Failed to post job. Please try again.",
      //   variant: "destructive",
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <Input
                name="title"
                value={jobData.title}
                onChange={handleChange}
                placeholder="e.g. Senior Frontend Developer"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium"> Company</label>
              <Input
                name="company"
                value={jobData.company}
                onChange={handleChange}
                placeholder="e.g. Tech Corp"
              />
              {errors.company && (
                <p className="text-red-500 text-sm">{errors.company}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                name="location"
                value={jobData.location}
                onChange={handleChange}
                placeholder="e.g. Remote"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type</label>
              <Input
                name="type"
                value={jobData.type}
                onChange={handleChange}
                placeholder="e.g. Full-time"
              />
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                value={jobData.description}
                onChange={handleChange}
                placeholder="Job description..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Responsibilities</label>
              <Textarea
                name="responsibilities"
                value={jobData.responsibilities}
                onChange={handleChange}
                placeholder="List responsibilities..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Requirements</label>
              <Textarea
                name="requirements"
                value={jobData.requirements}
                onChange={handleChange}
                placeholder="List requirements..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Application Link</label>
              <Input
                name="applicationLink"
                value={jobData.applicationLink}
                onChange={handleChange}
                placeholder="e.g. https://example.com/apply"
              />
              {errors.applicationLink && (
                <p className="text-red-500 text-sm">{errors.applicationLink}</p>
              )}
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
