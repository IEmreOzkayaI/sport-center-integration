
import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";

const loading = () => (
    <>
        {Array.from({ length: 3 }).map((_, index) => (
            <span key={index} className="w-full">
                <Card className={cn("animate-pulse")}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                        <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </CardContent>
                </Card>
            </span>
        ))}
    </>
)

export default loading
