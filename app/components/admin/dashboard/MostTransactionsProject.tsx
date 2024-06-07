"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faProjectDiagram,
  faMoneyBillWave,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

interface Project {
  projectid: number;
  total: number;
  amount: number;
}

interface ProjectDetails {
  id: number;
  name: string;
  description: string;
}

const MostTransactionsProject: React.FC = () => {
  const [topProject, setTopProject] = useState<Project | null>(null);
  const [projectDetails, setProjectDetails] = useState<ProjectDetails | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchTopProject = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/getTopProjectTransaction`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTopProject(response.data);
      } catch (error) {
        console.error("Error fetching top project:", error);
      }
    };

    fetchTopProject();
  }, [token]);

  useEffect(() => {
    if (!topProject) return;

    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/projects/${topProject.projectid}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjectDetails(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [topProject, token]);

  if (!topProject || !projectDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Project with most transactions</h2>
      <div className="flex items-center mb-2">
        <FontAwesomeIcon
          icon={faProjectDiagram}
          className="text-blue-500 mr-2"
        />
        <Tooltip title={projectDetails.description} arrow>
          <span className="text-lg font-semibold">{projectDetails.name}</span>
        </Tooltip>
      </div>
      <p>
        <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
        Total Transactions: {topProject.total}
      </p>
      <p>
        <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
        Total Amount: {topProject.amount.toLocaleString()}
      </p>
    </div>
  );
};

export default MostTransactionsProject;
