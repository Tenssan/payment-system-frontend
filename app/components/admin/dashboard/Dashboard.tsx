"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import { useTranslation } from "react-i18next";

interface Transaction {
  transactionid: number;
  description: string;
  amount: number;
  date: string;
  status: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Transaction;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "transactionid",
    numeric: true,
    disablePadding: false,
    label: "transactionID",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "description",
  },
  { id: "amount", numeric: true, disablePadding: false, label: "amount" },
  { id: "date", numeric: false, disablePadding: false, label: "date" },
  { id: "status", numeric: false, disablePadding: false, label: "status" },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Transaction
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Transaction) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  const { t } = useTranslation();

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all transactions" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {t(headCell.label)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc"
                    ? t("sortedDescending")
                    : t("sortedAscending")}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const { t } = useTranslation();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} {t("selected")}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {t("lastFivePayments")}
        </Typography>
      )}
    </Toolbar>
  );
}

const Dashboard: React.FC = () => {
  const [totalMonthValue, setTotalMonthValue] = useState<number | null>(null);
  const [topProject, setTopProject] = useState<any | null>(null);
  const [projectDetails, setProjectDetails] = useState<any | null>(null);
  const [recentPayments, setRecentPayments] = useState<Transaction[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Transaction>("transactionid");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    // Fetch recent payments
    const fetchRecentPayments = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/getRecentPayments`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecentPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    // Fetch top project
    const fetchTopProject = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/getTopProjectAmount`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const topProjectData = response.data;
        setTopProject(topProjectData);

        // Fetch project details
        const projectResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/projects/${topProjectData.projectid}`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjectDetails(projectResponse.data);
      } catch (error) {
        console.error("Error fetching top project or its details:", error);
      }
    };

    // Fetch monthly total
    const fetchTotalMonthValue = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/getTotalAmount`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
              "Access-Control-Allow-Headers": "Content-Type, Authorization",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTotalMonthValue(response.data);
      } catch (error) {
        console.error("Error fetching total:", error);
      }
    };

    fetchRecentPayments();
    fetchTopProject();
    fetchTotalMonthValue();
  }, [token]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Transaction
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = recentPayments.map((n) => n.transactionid);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - recentPayments.length)
      : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(recentPayments, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, recentPayments]
  );

  return (
    <div className="p-4">
      <div className="flex justify-between mb-8">
        <div className="w-1/2 p-4 bg-white shadow-md rounded-lg mr-4">
          <h2 className="text-xl font-bold mb-2">{t("totalMonthValue")}</h2>
          <p className="text-2xl">
            {totalMonthValue !== null ? totalMonthValue : "Loading..."}
          </p>
        </div>
        <div className="w-1/2 p-4 bg-white shadow-md rounded-lg ml-4">
          <h2 className="text-xl font-bold mb-2">{t("topGrossingProject")}</h2>
          {topProject && projectDetails ? (
            <div>
              <p className="text-lg font-semibold">{projectDetails.name}</p>
              <p>{projectDetails.description}</p>
              <p>Total Amount: {topProject.total.toLocaleString()}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4">
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={recentPayments.length}
                />
                <TableBody>
                  {visibleRows.map((row, index) => {
                    const isItemSelected = isSelected(row.transactionid);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, row.transactionid)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.transactionid}
                        selected={isItemSelected}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.transactionid}
                        </TableCell>
                        <TableCell align="left">{row.description}</TableCell>
                        <TableCell align="right">{row.amount}</TableCell>
                        <TableCell align="left">
                          {new Date(row.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label={t("densePadding")}
          />
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;
