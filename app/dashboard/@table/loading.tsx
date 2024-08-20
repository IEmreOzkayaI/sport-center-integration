import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
const loading = () => {
  return (
    <div className={cn('h-full grid grid-rows-12  w-12/12 md:w-9/12 shadow border rounded-md animate-pulse')}>
      <div className="row-span-11 shadow-none border-none">
        <div className="px-7 py-4">
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="hidden md:block">
              <div className="h-8 bg-gray-300 rounded w-24"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded w-24"></div>
          </div>
          <div className="block md:hidden w-full mt-4">
            <div className="h-8 bg-gray-300 rounded w-full"></div>
          </div>
          <div className="text-center md:text-left h-4 bg-gray-300 rounded w-2/3 mt-2"></div>
        </div>
        <div className="p-6">
          <div></div>
          <div className="mt-6 space-y-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div className="px-10">
                <div className="flex flex-row space-x-4">
                  <div className="h-6 bg-gray-300 rounded w-full"></div>
                  <div className="h-6 bg-gray-300 rounded w-full"></div>
                  <div className="h-6 bg-gray-300 rounded w-full hidden sm:block"></div>
                  <div className="h-6 bg-gray-300 rounded w-full hidden md:block"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="row-span-1 flex justify-center items-center">
        <div className="h-6 bg-gray-300 rounded w-24"></div>
      </div>
    </div>
  );
};

export default loading;
