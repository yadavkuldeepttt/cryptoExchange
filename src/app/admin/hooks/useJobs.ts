// src/hooks/useUserJobs.ts
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

import axios from "axios";


type JobType = 'Full-Time' | 'Part-Time' | 'Remote'

 interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  applicationLink: string;
  createdAt:string
}

interface UseUserJobsReturn {
  jobs: Job[];
  isLoading: boolean;
  error: Error | null;
  refreshJobs: () => Promise<void>;
  deleteJob: (jobId: string) => Promise<void>;
  updateJob: (jobId: string, updates: Partial<Job>) => Promise<void>;
}

export const useUserJobs = (): UseUserJobsReturn => {
  const { user, isLoaded } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);


  const fetchJobs = async (userID: string) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/admin/jobs/${userID}`);

      console.log(response,"response");
      
      if (!response.statusText === "OK") {
        throw new Error('Failed to fetch jobs');
      }
      
      const data = await response.data;

      console.log(data,"data of jobs getting ");
      
      
      setJobs(data.data.jobs);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const refreshJobs = async () => {
    if (user?.id) {
      await fetchJobs(user.id);
    }
  };


  const deleteJob = async (jobId: string) => {
    if (!user?.id) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/jobs/${user.id}/${jobId}`);

      if (!response.statusText === "OK") {
        throw new Error('Failed to delete job');
      }

      setJobs(current => current.filter(job => job._id !== jobId));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete job'));
      throw err;
    }
  };

  const updateJob = async (jobId: string, updates: Partial<Job>) => {
    if (!user?.id) return;

    console.log("jobId",jobId);
    console.log("updates",updates);

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/admin/jobs/${user?.id}/${jobId}`,
        updates,  // No need to stringify the body, axios does it automatically
    
      );
      console.log('Job updated successfully:', response);
  
      // return response.data;
      await refreshJobs();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update job'));
      throw err;
    }
  };

  useEffect(() => {
    if (user?.id && isLoaded) {
      console.log("Fetching jobs for user:", user.id);
      fetchJobs(user.id);
    }
  }, [user?.id, isLoaded]);

  return {
    jobs,
    isLoading: isLoading || !isLoaded,
    error,
    refreshJobs,
    deleteJob,
    updateJob,
  };
};