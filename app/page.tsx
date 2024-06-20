"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import image from "../public/imgs/ucn-bg.png";
import "../i18n/index"; // Ensure you import your i18n configuration

const Home: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      Cookies.remove("token");
      Cookies.set("token", token, { expires: 1, path: "/", secure: false }); // Expires in 1 day

      axios
        .get(`${process.env.NEXT_PUBLIC_BACK_URL}/user/role`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
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
    return <div>{t("loading")}</div>;
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
          {t("welcomeMessage")}
        </h1>
        <Tooltip title={t("clickToAdvance")} arrow>
          <button
            className="text-2xl py-4 px-8 bg-orange-300 hover:bg-orange-500 text-white font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-110"
            onClick={handleOnClick}
          >
            {t("getStarted")}{" "}
            <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Home;
