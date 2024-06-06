import { useState, useCallback } from 'react';
require('dotenv').config();

interface Role {
  roleid: number;
  name: string;
}

interface User {
  userid: number;
  email: string;
  rut: string;
  firstname: string;
  lastname: string;
  role: Role[];
}

interface UseFetchUserResult {
  user: User | null;
  loading: boolean;
  error: boolean;
  fetchUser: (token: string) => void;
}

const useFetchUser = (): UseFetchUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUser = useCallback(async (token: string) => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data: User = await response.json();
      setUser(data);
    } catch (error) {
      setError(true);
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    fetchUser,
  };
};

export default useFetchUser;
