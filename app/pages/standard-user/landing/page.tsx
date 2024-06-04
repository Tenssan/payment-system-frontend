'use client'

import { useRouter, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";


const StandardLandingPage: React.FC = () => {
  const token2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJpZCI6NywiZW1haWwiOiJkYW5pZWwuYmFzc2Fub0BhbHVtbm9zLnVjbi5jbCIsInJ1dCI6IjEyMzQ1Njc4OSIsImZpcnN0bmFtZSI6IkRhbmllbCIsImxhc3RuYW1lIjoiQmFzc2FubyJ9LCJpYXQiOjE3MTc1MzYyNDgsImV4cCI6MTcxNzU0NjI0OH0.YumvR0TvBjWuEcW0XLnOvXLSEry-7xRD-KPSvdeclQU";
  
  const [storedToken, setStoredToken] = useState<string | null>(null);

  useEffect(() => {
      localStorage.setItem('token', token2);
      setStoredToken(token2);
  }, [token2]);

  return (
      <div>
          <h1>Landing Page</h1>
          <p>Your token is: {storedToken}</p>
      </div>
  );
};

export default StandardLandingPage;