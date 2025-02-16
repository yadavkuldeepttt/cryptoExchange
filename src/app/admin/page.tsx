"use client"

import { useAuth, RedirectToSignIn } from "@clerk/nextjs";
import AdminPanel from "./components/adminPanel";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AdminPage = () => {
  const { isSignedIn, userId, orgRole, isLoaded } = useAuth();
  const router = useRouter();

  // Add this to debug
  console.log("Auth state:", { isSignedIn, userId, orgRole });

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/admin/home');
    }
  }, [isLoaded, isSignedIn, router]);

  // First check if loading
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Then check if signed in
  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl="/admin/home" />;
  }

  // Finally check role
  if (!orgRole || orgRole !== "admin") {
    return <div>Access denied. You must be an admin to view this page.</div>;
  }

  return <AdminPanel />;
};

export default AdminPage;