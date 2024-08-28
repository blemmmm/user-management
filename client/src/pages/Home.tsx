import { userService } from '@/lib/services/users';
import { Add } from '@mui/icons-material';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useMemo } from 'react';

const HomePage = () => {
  const { getUsers } = userService();
  const { data: usersData } = getUsers();

  const users = useMemo(
    () => (usersData && usersData.users ? usersData.users : []),
    [usersData],
  );

  return (
    <div className="flex items-center justify-center w-full">
      <div className="border border-solid border-neutral-200 h-auto rounded-lg my-4 w-full xl:w-[40vw]">
        <div className="py-3 flex items-center justify-between border-0 border-b border-solid border-neutral-200 font-sans px-4 xl:px-8">
          <span className="text-lg font-semibold">Users</span>

          <Button className="!bg-neutral-100 !px-4 !py-2 !gap-1.5">
            <Add fontSize="small" />
            Add User
          </Button>
        </div>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HomePage;
