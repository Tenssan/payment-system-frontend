'use client'

import { useRouter, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";


const StandardLandingPage: React.FC = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [storedToken, setStoredToken] = useState<string | null>(null);
    useEffect(() => {
        if (token) {
          localStorage.setItem('token', token);
          setStoredToken(token);
        } else {
          const savedToken = localStorage.getItem('token');
          setStoredToken(savedToken);
        }
      }, [token]);
    return (
        <div>
            <h1>Landing Page</h1>
            <p>Your token is: {storedToken}</p>
        </div>
    );
};

export default StandardLandingPage;