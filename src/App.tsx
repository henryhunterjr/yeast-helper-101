import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import Index from "./pages/Index";
import Settings from "./components/Settings";
import HelpAbout from "./components/HelpAbout";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import React from 'react';

interface ApiError {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
  message: string;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: ApiError) => {
        if (error?.response?.status === 429) {
          console.log('Rate limit reached, waiting before retry...');
          return failureCount < 3;
        }
        return failureCount < 2;
      },
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      meta: {
        onSettled: (_data: unknown, error: Error | null) => {
          if (error) {
            console.error('Query error:', error);
          }
        },
      },
    },
  },
});

const ErrorFallback = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Something went wrong</h2>
      <pre className="text-sm bg-gray-100 p-4 rounded mb-4 max-w-full overflow-auto">
        {error.message}
      </pre>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    // Handle ResizeObserver errors
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('ResizeObserver')) {
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener('error', handleError);
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
    };
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Index />
                </ErrorBoundary>
              } />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<HelpAbout />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;