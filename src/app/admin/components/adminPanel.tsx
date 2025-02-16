"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUserJobs } from "../hooks/useJobs";

const AdminPanel: React.FC = () => {
    const router = useRouter();
    const { jobs, isLoading, deleteJob } = useUserJobs();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

            {/* Main Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold mb-4">Post New Job</h2>
                    <p className="text-gray-600 mb-4">Create and publish new job listings</p>
                    <button
                        onClick={() => router.push("/admin/post")}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                    >
                        Post Job
                    </button>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="text-xl font-semibold mb-4">Manage Jobs</h2>
                    <p className="text-gray-600 mb-4">View and manage existing job postings</p>
                    <button
                        onClick={() => router.push("/admin/jobs")}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                    >
                        View Jobs
                    </button>
                </div>
            </div>

            {/* Quick Actions Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              

                {/* Recent Jobs List */}
                <div className="mt-4">
                    <h3 className="text-lg font-medium mb-3">Recent Job Postings</h3>

                    {/* Show loading state */}
                    {isLoading ? (
                        <p className="text-gray-600">Loading jobs...</p>
                    ) : jobs && jobs.length > 0 ? (
                        <ul className="divide-y divide-gray-200">
                            {jobs.map((job, index) => (
                                <li key={job._id || index} className="py-3 flex border border-gray-200 p-3 rounded justify-between items-center">
                                    <span className="text-gray-700">{job.title}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => router.push(`/admin/jobs`)}
                                            className="text-blue-500 hover:text-blue-600"
                                        >
                                            View
                                        </button>
                                      
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No job postings available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
