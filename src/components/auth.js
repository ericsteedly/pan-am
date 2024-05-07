import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AuthWrapper({ children }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated && router.pathname !== '/login') {
      router.push('/login');
    }

    if (isAuthenticated && router.pathname === '/login') {
      router.push('/');
    }
  }, [router.pathname]);

  return children;
};
