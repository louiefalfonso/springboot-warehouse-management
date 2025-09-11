import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetAllUsers } from '@/services/auth-services';

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
}

const ListAllUsers = () => {
  const { data, isLoading} = useGetAllUsers();

  // Handle loading state
  if (isLoading) { return <div>Loading...</div>;}
  if (!data) { return <div>No data found</div>;}

  return (
    <div className="rounded-md border p-5 w-full overflow-x-auto">
      <div className="min-w-full">
        <Table>
            <TableHeader>
              <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Full Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
        </Table>    
      </div>
    </div>
    
  );
};

export default ListAllUsers;