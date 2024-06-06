"use client";
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import image from "../public/imgs/ucn-bg.png";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios
        .get(`${process.env.NEXT_PUBLIC_BACK_URL}/user/role`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRole(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching role:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleOnClick = () => {
    if (role === "admin") {
      router.push("pages/admin/landing");
    } else {
      router.push("pages/user/landing");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-screen w-screen">
      <Image
        src={image}
        alt="ucn-background"
        layout="fill"
        objectFit="cover"
        priority
        className="absolute inset-0"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-white bg-black bg-opacity-50">
        <h1 className="text-4xl font-bold mb-8 text-center text-wrap">
          Welcome to the Payment System Manager from Group 3
        </h1>
        <Tooltip title="Click to advance" arrow>
          <button
            className="text-2xl py-4 px-8 bg-orange-300 hover:bg-orange-500 text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-110"
            onClick={handleOnClick}
          >
            Get Started <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Home;
