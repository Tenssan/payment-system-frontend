"use client";
/*import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { visuallyHidden } from "@mui/utils";

export default function UsersSub() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [subscriptions, setSubscriptions] = React.useState([]);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/subscription`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="primary"
                    inputProps={{ 'aria-label': 'select all subscriptions' }}
                  />
                </TableCell>
                <TableCell>Subscription Plan ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell>Periodicity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Remittent</TableCell>
                <TableCell>Destinatary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow
                    hover
                    key={row.subscriptionplanid}
                    tabIndex={-1}
                  >
                    <TableCell>
                      <Checkbox
                        color="primary"
                      />
                    </TableCell>
                    <TableCell>{row.subscriptionplanid}</TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.startdate}</TableCell>
                    <TableCell>{row.periodicity}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.project.name}</TableCell>
                    <TableCell>{row.paymentmethod.name}</TableCell>
                    <TableCell>{`${row.remittent.firstname} ${row.remittent.lastname}`}</TableCell>
                    <TableCell>{`${row.destinatary.firstname} ${row.destinatary.lastname}`}</TableCell>
                  </TableRow>
                );
              })}
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
        control={<Switch />}
        label="Dense padding"
      />
    </Box>
  );
}*/import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

export default function UsersSub() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [subscriptions, setSubscriptions] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACK_URL}/subscription`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSubscriptions(response.data);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

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

  const handleDelete = async () => {
    try {
      await Promise.all(
        selected.map(async (id) => {
          await axios.delete(
            `${process.env.NEXT_PUBLIC_BACK_URL}/subscription/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        })
      );
      // Actualizar las suscripciones después de eliminarlas
      const updatedSubscriptions = subscriptions.filter(
        (subscription) => !selected.includes(subscription.subscriptionplanid)
      );
      setSubscriptions(updatedSubscriptions);
      setSelected([]); // Desmarcar todas las selecciones
    } catch (error) {
      console.error("Error deleting subscriptions:", error);
    }
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size="medium"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < subscriptions.length
                    }
                    checked={
                      subscriptions.length > 0 && selected.length === subscriptions.length
                    }
                    onChange={(event) =>
                      event.target.checked
                        ? setSelected(subscriptions.map((subscription) => subscription.subscriptionplanid))
                        : setSelected([])
                    }
                    inputProps={{ 'aria-label': 'select all subscriptions' }}
                  />
                </TableCell>
                <TableCell>Subscription Plan ID</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell>Periodicity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Remittent</TableCell>
                <TableCell>Destinatary</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subscriptions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const isItemSelected = isSelected(row.subscriptionplanid);
                const labelId = `enhanced-table-checkbox-${row.subscriptionplanid}`;

                return (
                  <TableRow
                    hover
                    key={row.subscriptionplanid}
                    tabIndex={-1}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        onChange={(event) => handleClick(event, row.subscriptionplanid)}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.subscriptionplanid}
                    </TableCell>
                    <TableCell>{row.description}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.startdate}</TableCell>
                    <TableCell>{row.periodicity}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.project.name}</TableCell>
                    <TableCell>{row.paymentmethod.name}</TableCell>
                    <TableCell>{`${row.remittent.firstname} ${row.remittent.lastname}`}</TableCell>
                    <TableCell>{`${row.destinatary.firstname} ${row.destinatary.lastname}`}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                        disabled={!isItemSelected}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
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
    </Box>
  );
}