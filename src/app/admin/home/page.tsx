
"use client"

import { useAuth } from "@clerk/nextjs";
import { RedirectToSignIn } from "@clerk/nextjs";
import AdminPanel from "../components/adminPanel"
import Header from "../components/Header";

const AdminHomePage = () => {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl="/admin/home" />;
  }

  return (
    <div>
      <Header/>
        <AdminPanel/>
    </div>
  );
};

export default AdminHomePage;