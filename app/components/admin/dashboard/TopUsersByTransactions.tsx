"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserShield,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";
import Tooltip from "@mui/material/Tooltip";

interface Role {
  roleid: number;
  name: string;
}

interface User {
  userid: number;
  email: string;
  rut: string;
  firstname: string;
  lastname: string;
  role: Role[];
}

interface TopUser {
  user: User;
  total: number;
}

const TopUsers: React.FC = () => {
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

    fetchTopUsers();
  }, [token]);

  const admin = topUsers.find((user) =>
    user.user.role.some((role) => role.name === "admin")
  );
  const user = topUsers.find((user) =>
    user.user.role.some((role) => role.name === "user")
  );

  return (
    <div className="p-4">
      <div className="mb-8">
        {admin && (
          <Tooltip
            title={`Top Admin: ${admin.user.firstname} ${admin.user.lastname}`}
            arrow
          >
            <div className="p-4 bg-white shadow-md rounded-lg mb-4 hover:bg-gray-100 transition duration-300">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faUserShield}
                  className="text-blue-500 mr-2"
                />
                <h2 className="text-xl font-bold">Most transactions admin</h2>
              </div>
              <p>
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Name: {admin.user.firstname} {admin.user.lastname}
              </p>
              <p>Email: {admin.user.email}</p>
              <p>RUT: {admin.user.rut}</p>
              <p>
                <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                Total Transactions: {admin.total}
              </p>
            </div>
          </Tooltip>
        )}
        {user && (
          <Tooltip
            title={`Top User: ${user.user.firstname} ${user.user.lastname}`}
            arrow
          >
            <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-300">
              <div className="flex items-center mb-2">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-green-500 mr-2"
                />
                <h2 className="text-xl font-bold">Most transactions user</h2>
              </div>
              <p>
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Name: {user.user.firstname} {user.user.lastname}
              </p>
              <p>Email: {user.user.email}</p>
              <p>RUT: {user.user.rut}</p>
              <p>
                <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
                Total Transactions: {user.total}
              </p>
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

export default TopUsers;
