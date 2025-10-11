import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMyWalletQuery } from "@/redux/features/wallet/wallet.api";

export function MyWalletInfo() {
  const { data, isLoading, error, refetch } = useMyWalletQuery();

  if (isLoading) {
    return (
      <Card className="w-full lg:max-w-md mx-auto p-6 space-y-4 animate-pulse">
        <Skeleton className="h-6 w-1/2 rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-4 w-1/3 rounded-md" />
      </Card>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="text-red-500 text-center mt-6 text-sm">
        ❌ Could not load wallet info. Please try again.
      </div>
    );
  }

  const { balance, status, updatedAt, user } = data.data;

  return (
    <Card className="w-full lg:max-w-md mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-fuchsia-900">
          💼 My Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div>
          <p><span className="font-medium text-gray-800">👤 User:</span> {user.name} ({user.email})</p>
        </div>
        <div>
          <p><span className="font-medium text-gray-800">💰 Balance:</span> <span className="text-green-600 font-semibold">${balance}</span></p>
        </div>
        <div>
          <p><span className="font-medium text-gray-800">📍 Status:</span> {status}</p>
        </div>
        <div>
          <p><span className="font-medium text-gray-800">🕒 Last Updated:</span> {new Date(updatedAt).toLocaleString()}</p>
        </div>
        <Button
          variant="default"
          onClick={() => refetch()}
          className="mt-2 bg-fuchsia-900 hover:bg-fuchsia-800"
        >
        Refresh
        </Button>
      </CardContent>
    </Card>
  );
}
