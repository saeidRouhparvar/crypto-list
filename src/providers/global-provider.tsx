"use client";

import type { FC, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

interface GlobalProviderProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

export const GlobalProvider: FC<GlobalProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
};
