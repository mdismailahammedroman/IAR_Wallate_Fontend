import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";



const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Administrator',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'Editor',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Subscriber',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
  },
];

 const UserList = () => {
  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="flex items-center space-x-4 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
         <Avatar>
      <AvatarImage
        src="https://i.pravatar.cc/150?img=1"
        alt="Alice Johnson"
        width={40}
        height={40}
      />
      <AvatarFallback>AJ</AvatarFallback>
    </Avatar>
          <CardContent>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.role}</CardDescription>
            </CardHeader>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default UserList