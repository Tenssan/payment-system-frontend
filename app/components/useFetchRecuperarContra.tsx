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

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACK_URL}/user/password/${4}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:"testuser",
          oldPassword,
          newPassword,
        }),
      }).then(
        async (res) => {
          if(!res.ok) {
            const text = await res.text();
           }
          else {
           return res.json();
         }    
        })
        .catch(err => {
           console.log('caught it!',err);
        }
      );
      console.log(response);
      if (response.error) {
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