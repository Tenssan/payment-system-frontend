'use client'

import { useRouter, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";


const StandardLandingPage: React.FC = () => {
    const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJpZCI6NiwiZW1haWwiOiJjbGF1ZGlvLnVzZXJAdXNlci5jb20iLCJydXQiOiIzNiIsImZpcnN0bmFtZSI6IkNsYXVkaW8iLCJsYXN0bmFtZSI6Ik1vbmRhY2EifSwiaWF0IjoxNzE3Mjc1Njg3LCJleHAiOjE3MTcyODU2ODd9.g8EXm8S6A_NTZ_wmYw7eTsCV3yCwPTr-qL9Bn7SrA_s";
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [storedToken, setStoredToken] = useState<string | null>(null);
    useEffect(() => {
        if (token2) {
          localStorage.setItem('token', token2);
          setStoredToken(token2);
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