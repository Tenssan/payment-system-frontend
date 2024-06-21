"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";
import { useTranslation } from "react-i18next";
import { SelectedValueContext } from "../context/SelectedValueContext";
import { useContext } from "react";

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
  const { selectedValue } = useContext(SelectedValueContext);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchTopUsers = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/getTopUsers`,
          {
            projectid: selectedValue,
          },
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
    }, 2000);
  }, [token, selectedValue]);

  // Calcular el número de placeholders necesarios
  const placeholdersCount = 5 - topUsers.length;

  return (
    <div className="p-4">
      <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-300">
        <h2 className="text-xl font-bold mb-4">{t("topUsersTitle")}</h2>
        <div className="grid grid-rows-3 grid-cols-2 gap-4">
          {topUsers.map((topUser, index) => (
            <Tooltip
              key={topUser.user.userid}
              title={`${topUser.user.firstname} ${topUser.user.lastname}`}
              arrow
            >
              <div
                className={`flex items-center border p-2 rounded shadow-md ${
                  index === 4 ? "col-span-2 justify-center" : ""
                }`}
              >
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
          {Array.from({ length: placeholdersCount }).map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className={`flex flex-col items-center border-2 border-dashed p-4 rounded shadow-md text-center justify-center ${
                topUsers.length + index === 4 ? "col-span-2" : ""
              }`}
            >
              <FontAwesomeIcon icon={faUser} className="text-gray-300 mb-2" size="3x" />
              {/*<p className="text-gray-500">{t("placeholder")}</p>*/}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopUsers;


