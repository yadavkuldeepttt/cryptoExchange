"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserJobs } from '../hooks/useJobs';
import { useUser } from '@clerk/nextjs';

const JobsListPage = () => {
    const router = useRouter();
    const { isLoaded } = useUser();
    const { jobs, isLoading, error, deleteJob, updateJob } = useUserJobs();
    const [editingJob, setEditingJob] = useState(null);

    if (!isLoaded || isLoading) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    Error loading jobs: {error.message}
                </div>
            </div>
        );
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateJob(editingJob._id, {
            title: editingJob.title,
            description: editingJob.description
        });
        setEditingJob(null);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button
                        onClick={() => router.back()}
                        className="text-gray-600 hover:text-gray-800 mr-4"
                    >
                        ← Back
                    </button>
                    <h1 className="text-2xl font-bold">Manage Jobs</h1>
                </div>
                <button
                    onClick={() => router.push('/admin/post')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Post New Job
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <ul className="divide-y divide-gray-200">
                    {jobs.map((job) => (
                        <li key={job._id} className="p-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-gray-800 font-medium">{job.title}</h3>
                                <p className="text-gray-600 text-sm">{job.description}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setEditingJob(job)}
                                    className="text-blue-500 hover:text-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteJob(job._id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                    {jobs.length === 0 && (
                        <li className="p-4 text-center text-gray-500">
                            No jobs posted yet
                        </li>
                    )}
                </ul>
            </div>

            {editingJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Job</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={editingJob.title}
                                    onChange={(e) => setEditingJob({...editingJob, title: e.target.value})}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={editingJob.description}
                                    onChange={(e) => setEditingJob({...editingJob, description: e.target.value})}
                                    className="w-full px-3 py-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingJob(null)}
                                    className="text-gray-600 hover:text-gray-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobsListPage;