"use client";
import React, { useEffect, useState, useContext } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useTranslation } from "react-i18next";
import { SelectedValueContext } from "../context/SelectedValueContext";

interface Transaction {
  transactionid: number;
  description: string;
  amount: number;
  date: string;
  status: string;
  project: {
    projectid: number;
    name: string;
  };
  paymentMethod: {
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

interface SimplifiedTransaction {
  transactionid: number;
  description: string;
  amount: number;
  date: string;
  status: string;
  projectName: string;
  paymentMethodName: string;
  remittentEmail: string;
  destinataryEmail: string;
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
  id: keyof SimplifiedTransaction;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: "transactionid", numeric: true, disablePadding: false, label: "id" },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "description",
  },
  { id: "amount", numeric: true, disablePadding: false, label: "amount" },
  { id: "date", numeric: false, disablePadding: false, label: "date" },
  { id: "status", numeric: false, disablePadding: false, label: "status" },
  {
    id: "projectName",
    numeric: false,
    disablePadding: false,
    label: "projectName",
  },
  {
    id: "paymentMethodName",
    numeric: false,
    disablePadding: false,
    label: "paymentMethodName",
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
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof SimplifiedTransaction
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
    (property: keyof SimplifiedTransaction) =>
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
          {t("transactions")}
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

export default function TransactionsTable() {
  const { t } = useTranslation();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof SimplifiedTransaction>("transactionid");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [transactions, setTransactions] = React.useState<
    SimplifiedTransaction[]
  >([]);
  const token = localStorage.getItem("token");
  const { selectedValue } = useContext(SelectedValueContext);
  
  React.useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.post<Transaction[]>(
          `${process.env.NEXT_PUBLIC_BACK_URL}/dashboard/transactionsperproject`,
          {
            projectid: selectedValue,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Allow any origin
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Allowed HTTP methods
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const simplifiedData = response.data.map((transaction) => ({
          transactionid: transaction.transactionid,
          description: transaction.description,
          amount: transaction.amount,
          date: transaction.date,
          status: transaction.status,
          projectName: transaction.project.name,
          paymentMethodName: transaction.paymentMethod.name,
          remittentEmail: transaction.remittent.email,
          destinataryEmail: transaction.destinatary.email,
        }));
        setTransactions(simplifiedData);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, [token, selectedValue]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof SimplifiedTransaction
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = transactions.map((n) => n.transactionid);
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

  const isSelected = (transactionid: number) =>
    selected.indexOf(transactionid) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - transactions.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(transactions, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, transactions]
  );

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
              rowCount={transactions.length}
            />
            <TableBody>
            {visibleRows.length > 0 ? (
              visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.transactionid);
                const labelId = `enhanced-table-checkbox-${index}`;
              
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.transactionid)}
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
                    <TableCell align="left">{row.projectName}</TableCell>
                    <TableCell align="left">{row.paymentMethodName}</TableCell>
                    <TableCell align="left">{row.remittentEmail}</TableCell>
                    <TableCell align="left">{row.destinataryEmail}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  {t("NoTableData")}
                </TableCell>
              </TableRow>
            )}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={transactions.length}
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
};
