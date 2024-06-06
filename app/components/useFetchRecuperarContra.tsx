import { useState } from 'react';

interface ChangePasswordHookResult {
  loading: boolean;
  error: boolean;
  success: boolean;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const useChangePassword = (): ChangePasswordHookResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState(false);

  const changePassword = async (oldPassword: string, newPassword: string) => {
    setLoading(true);
    setError(false);
    setSuccess(false);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/user/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Agrega el token en el encabezado de autorización
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error('Failed to change password');
      }

      setSuccess(true);
    } catch (error) {
      setError(true);
      console.error('Error changing password:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    changePassword,
  };
};

export default useChangePassword;