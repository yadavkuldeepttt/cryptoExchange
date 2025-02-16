"use client"

import Link from 'next/link';
import { UserButton, SignInButton, useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/store/adminAuth';
import { useEffect } from 'react';

export default function Header() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const checkAdminStatus = useAdminAuth((state) => state.checkAdminStatus);
  
  useEffect(() => {

    if (isSignedIn && user) {
      checkAdminStatus(user.primaryEmailAddress?.emailAddress || null);
    } else {
      checkAdminStatus(null);
    }
  }, [isSignedIn, user, checkAdminStatus]);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">
              JobBoard
            </Link>
            {/* <nav className="hidden md:flex gap-4">
              <Link href="/jobs" className="text-muted-foreground hover:text-primary">
                Browse Jobs
              </Link>
              <Link href="/companies" className="text-muted-foreground hover:text-primary">
                Companies
              </Link>
            </nav> */}
          </div>
          
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex gap-2 items-center">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10"
                  }
                }}
              />
              <span className="text-lg font-semibold">Admin</span>
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default">Sign In</Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}