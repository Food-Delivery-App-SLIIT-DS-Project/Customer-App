'use client';

import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
