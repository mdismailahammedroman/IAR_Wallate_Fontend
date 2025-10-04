import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export const UserProfile = () => {
  const { data: userData, error, isLoading } = useUserInfoQuery(undefined);


  const user=userData?.data
  console.log({ user, error, isLoading });

  console.log(user);
  

  if (isLoading) {
    return (
      <Card className="w-full max-w-md mx-auto mt-10 p-4">
        <CardHeader>
          <Skeleton className="h-10 w-32 mb-2" />
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !user) {
    return <p className="text-center text-destructive mt-10">Failed to load user info.</p>;
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage  alt={user.name} />        {/* {user.image} */}
          <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-muted-foreground text-sm">{user.email}</p>
          <div className="mt-2 flex gap-2">
            <Badge variant="outline">{user.role}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
