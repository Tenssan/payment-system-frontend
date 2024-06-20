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
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTranslation } from "react-i18next";

interface Subscription {
  subscriptionplanid: number;
  description: string;
  amount: number;
  startdate: string;
  periodicity: string;
  status: string;
  lastpaydate: string | number | null;
  project: {
    projectid: number;
    name: string;
  };
  paymentmethod: {
    paymentmethodid: number;
    name: string;
  };
  remittent: {
    userid: number;
    email: string;
    rut: string;
    firstname: string;
    lastname: string;
  };
  destinatary: {
    userid: number;
    email: string;
    rut: string;
    firstname: string;
    lastname: string;
  };
}

interface SimplifiedSubscription {
  subscriptionplanid: number;
  projectName: string;
  periodicity: string;
  remittentEmail: string;
  destinataryEmail: string;
  startdate: string;
  amount: number;
  paymentMethodName: string;
  status: string;
}

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

interface HeadCell {
  disablePadding: boolean;
  id: keyof SimplifiedSubscription;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "subscriptionplanid",
    numeric: true,
    disablePadding: false,
    label: "id",
  },
  {
    id: "projectName",
    numeric: false,
    disablePadding: false,
    label: "projectName",
  },
  {
    id: "periodicity",
    numeric: false,
    disablePadding: false,
    label: "periodicity",
  },
  {
    id: "remittentEmail",
    numeric: false,
    disablePadding: false,
    label: "remittentEmail",
  },
  {
    id: "destinataryEmail",
    numeric: false,
    disablePadding: false,
    label: "destinataryEmail",
  },
  {
    id: "startdate",
    numeric: false,
    disablePadding: false,
    label: "startDate",
  },
  { id: "amount", numeric: true, disablePadding: false, label: "amount" },
  {
    id: "paymentMethodName",
    numeric: false,
    disablePadding: false,
    label: "paymentMethod",
  },
  { id: "status", numeric: false, disablePadding: false, label: "status" },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SimplifiedSubscription
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
    (property: keyof SimplifiedSubscription) =>
    (event: React.MouseEvent<unknown>) => {
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
            inputProps={{ "aria-label": "select all subscriptions" }}
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
          {t("subscriptions")}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title={t("delete")}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={t("filterList")}>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function SubscriptionsTable() {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof SimplifiedSubscription>("subscriptionplanid");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [subscriptions, setSubscriptions] = React.useState<
    SimplifiedSubscription[]
  >([]);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get<Subscription[]>(
          `${process.env.NEXT_PUBLIC_BACK_URL}/subscription`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Allow any origin
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Allowed HTTP methods
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const simplifiedData = response.data.map((subscription) => ({
          subscriptionplanid: subscription.subscriptionplanid,
          projectName: subscription.project.name,
          periodicity: subscription.periodicity,
          remittentEmail: subscription.remittent.email,
          destinataryEmail: subscription.destinatary.email,
          startdate: subscription.startdate,
          amount: subscription.amount,
          paymentMethodName: subscription.paymentmethod.name,
          status: subscription.status,
        }));
        setSubscriptions(simplifiedData);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, [token]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SimplifiedSubscription
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = subscriptions.map((n) => n.subscriptionplanid);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    event: React.MouseEvent<unknown>,
    subscriptionplanid: number
  ) => {
    const selectedIndex = selected.indexOf(subscriptionplanid);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, subscriptionplanid);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (subscriptionplanid: number) =>
    selected.indexOf(subscriptionplanid) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subscriptions.length) : 0;

  return (
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
              rowCount={subscriptions.length}
            />
            <TableBody>
              {stableSort(subscriptions, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.subscriptionplanid);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) =>
                        handleClick(event, row.subscriptionplanid)
                      }
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.subscriptionplanid}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.subscriptionplanid}
                      </TableCell>
                      <TableCell align="left">{row.projectName}</TableCell>
                      <TableCell align="left">{row.periodicity}</TableCell>
                      <TableCell align="left">{row.remittentEmail}</TableCell>
                      <TableCell align="left">{row.destinataryEmail}</TableCell>
                      <TableCell align="left">{row.startdate}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
                      <TableCell align="left">
                        {row.paymentMethodName}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={subscriptions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label={t("densePadding")}
      />
    </Box>
  );
}
