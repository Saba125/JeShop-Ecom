import { AlertCircle, Home, RefreshCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorElementProps {
  error?: {
    status?: number | string;
    statusText?: string;
    message?: string;
    data?: { message?: string };
  };
}

export default function ErrorElement({ error }: ErrorElementProps) {
  let errorMessage: string;
  let errorStatus: string | number = 'Error';
  
  if (error) {
    errorStatus = error.status || 'Error';
    errorMessage = error.statusText || error.message || error.data?.message || 'An error occurred';
  } else {
    errorMessage = 'An unknown error occurred';
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              {errorStatus}
            </h1>
            <p className="text-xl font-semibold text-foreground">
              ოჰ! რაღაც არასწორად წავიდა
            </p>
          </div>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>შეცდომის დეტალები</AlertTitle>
          <AlertDescription className="mt-2">
            {errorMessage}
          </AlertDescription>
        </Alert>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={handleRefresh} 
            className="flex-1"
            variant="default"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            თავიდან სცადეთ
          </Button>
          
          <Button 
            onClick={handleGoHome}
            className="flex-1"
            variant="outline"
          >
            <Home className="mr-2 h-4 w-4" />
            მთავარზე დაბრუნება
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          თუ პრობლემა გრძელდება, გთხოვთ დაუკავშირდეთ მხარდაჭერას.
        </p>
      </div>
    </div>
  );
}