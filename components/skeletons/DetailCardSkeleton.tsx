import { Card, CardContent, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function DetailCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('w-3/12 h-full flex flex-col justify-between animate-pulse', className)}>
      <div>
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5 w-full">
            <CardTitle className="h-4 bg-gray-300 rounded w-1/3 mb-2"></CardTitle>
            <CardDescription className="h-4 bg-gray-300 rounded w-1/4"></CardDescription>
          </div>
          <div className="h-8 w-8 bg-gray-300 rounded ml-auto"></div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-full my-4"></div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-full my-4"></div>
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mt-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mt-2"></div>
            </div>
          </div>
        </CardContent>
      </div>
      <CardFooter className="border-t bg-muted/50 px-6 py-3 flex items-center justify-center text-sm text-muted-foreground">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </CardFooter>
    </Card>
  );
}
