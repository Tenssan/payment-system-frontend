"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";

interface User {
  userid: number;
  email: string;
  firstname: string;
  lastname: string;
}

interface TopUser {
  user: User;
  total: number;
}

const TopUsers: React.FC = () => {
  const { t } = useTranslation();
  const [topUsers, setTopUsers] = useState<TopUser[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchTopUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/getTopUsers`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTopUsers(response.data);
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    // Wait 1 second before fetching data
    setTimeout(() => {
      fetchTopUsers();
    }, 1000);
  }, [token]);

  const placeholders = Array.from({ length: 5 - topUsers.length });

  return (
    <div className="p-4">
      <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-300">
        <h2 className="text-xl font-bold mb-4">{t("topUsersTitle")}</h2>
        <div className="grid grid-rows-3 grid-cols-2 gap-4">
          {topUsers.slice(0, 2).map((topUser) => (
            <Tooltip
              key={topUser.user.userid}
              title={`${topUser.user.firstname} ${topUser.user.lastname}`}
              arrow
            >
              <div className="flex items-center border p-2 rounded shadow-md">
                <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />
                <div>
                  <p className="font-semibold">
                    {topUser.user.firstname} {topUser.user.lastname}
                  </p>
                  <p>
                    {t("email")}: {topUser.user.email}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                    {t("totalTransactions")}: {topUser.total}
                  </p>
                </div>
              </div>
            </Tooltip>
          ))}
          {placeholders.slice(0, 2).map((_, index) => (
            <div
              key={`placeholder-top-${index}`}
              className="flex items-center border-2 border-dashed p-2 rounded shadow-md justify-center"
            >
              <p className="text-gray-500">{t("placeholder")}</p>
            </div>
          ))}

          {topUsers.slice(2, 4).map((topUser) => (
            <Tooltip
              key={topUser.user.userid}
              title={`${topUser.user.firstname} ${topUser.user.lastname}`}
              arrow
            >
              <div className="flex items-center border p-2 rounded shadow-md">
                <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />
                <div>
                  <p className="font-semibold">
                    {topUser.user.firstname} {topUser.user.lastname}
                  </p>
                  <p>
                    {t("email")}: {topUser.user.email}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                    {t("totalTransactions")}: {topUser.total}
                  </p>
                </div>
              </div>
            </Tooltip>
          ))}
          {placeholders.slice(2, 4).map((_, index) => (
            <div
              key={`placeholder-middle-${index}`}
              className="flex items-center border-2 border-dashed p-2 rounded shadow-md justify-center"
            >
              <p className="text-gray-500">{t("placeholder")}</p>
            </div>
          ))}

          {topUsers.slice(4, 5).map((topUser) => (
            <Tooltip
              key={topUser.user.userid}
              title={`${topUser.user.firstname} ${topUser.user.lastname}`}
              arrow
            >
              <div className="flex items-center border p-2 rounded shadow-md col-span-2 justify-center">
                <FontAwesomeIcon icon={faUser} className="text-blue-500 mr-2" />
                <div>
                  <p className="font-semibold">
                    {topUser.user.firstname} {topUser.user.lastname}
                  </p>
                  <p>
                    {t("email")}: {topUser.user.email}
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                    {t("totalTransactions")}: {topUser.total}
                  </p>
                </div>
              </div>
            </Tooltip>
          ))}
          {placeholders.slice(4, 5).map((_, index) => (
            <div
              key={`placeholder-bottom-${index}`}
              className="flex items-center border-2 border-dashed p-2 rounded shadow-md col-span-2 justify-center"
            >
              <p className="text-gray-500">{t("placeholder")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUsers;
