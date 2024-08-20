'use client';

import { FileWarningIcon } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="absolute top-0 left-0 bg-white w-screen flex flex-col items-center justify-center h-[calc(100svh-10rem)] p-6 text-center rounded-md">
      <FileWarningIcon className="h-20 w-20 mb-4" />
      <h1 className="text-5xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h1>
      <p className="text-lg text-gray-600 mb-6">{error.message || 'An unexpected error has occurred.'}</p>
      <button className="bg-primary text-primary-foreground px-3 py-2 rounded-lg shadow-md hover:bg-primary-dark transition-colors animate-pulse" onClick={() => reset()}>
        Try Again
      </button>
      <p className="text-sm text-gray-500 mt-4">If the problem persists, please contact support.</p>
    </div>
  );
}
