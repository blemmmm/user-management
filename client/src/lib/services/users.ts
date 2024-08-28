import { useQuery } from 'react-query';
import { config } from '../config';
import { UserResponse } from '../interface/IUser';

export const userService = () => {
  const fetchUsers = async () => {
    const response = await fetch(`${config.apiUrl}/api/users`);
    const data = await response.json();
    return data;
  };

  const getUsers = () => {
    return useQuery<UserResponse, Error>(['users'], () => fetchUsers(), {
      staleTime: Infinity,
      cacheTime: Infinity,
    });
  };

  return {
    getUsers,
  };
};
