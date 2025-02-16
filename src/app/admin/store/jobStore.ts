// src/store/jobStore.ts
import {create} from 'zustand';

interface JobStore {
    jobPostings: string[];
    addJobPosting: (job: string) => void;
    deleteJobPosting: (index: number) => void;
}

const useJobStore = create<JobStore>((set) => ({
    jobPostings: [],
    addJobPosting: (job) => set((state) => ({ jobPostings: [...state.jobPostings, job] })),
    deleteJobPosting: (index) => set((state) => ({
        jobPostings: state.jobPostings.filter((_, i) => i !== index),
    })),
}));

export default useJobStore;