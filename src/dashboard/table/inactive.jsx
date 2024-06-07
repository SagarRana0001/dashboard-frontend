import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StyledTableRow, StyledTableCell, style } from "./styleTableComponet";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Modal,
  Typography,
  Button,
  Paper,
  Input,
  Stack,
} from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import "./table.css";
import { useLazyGetAllDataApiByNameQuery } from "../../redux/services/alldatatoolkit";
import { useGetDeleteApiByNameMutation } from "../../redux/services/deletetoolkit";
import { useGetpermanentDeleteApiByNameMutation } from "../../redux/services/permanentDeleteApi";
export default function DataTable() {
  const [allData, { data, error, isLoading }] =
    useLazyGetAllDataApiByNameQuery();
  const [
    deleteData,
    {
      data: deletedDataFromApi,
      error: deleteError,
      isLoading: deleteIsLoading,
    },
  ] = useGetDeleteApiByNameMutation();
  const [
    PermanentDeleteData,
    {
      data: permanentdeletedDataFromApi,
      error: permanentdeleteError,
      isLoading: permanentdeleteIsLoading,
    },
  ] = useGetpermanentDeleteApiByNameMutation();
  const [jsonUser, setjsonUser] = useState({});
  const [dltData, setDltData] = useState();
  const [open, setOpen] = React.useState(false);

  const deleteRow = (data) => {
    setDltData(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  useEffect(() => {
    let localUser = JSON.parse(localStorage.getItem("user"));
    setjsonUser(localUser);
    AllDAta();
  }, []);

  useEffect(() => {
    const inactiveUser = data?.filter((ele) => {
      return ele.isActive === false;
    });
    setUserData(inactiveUser);
  }, [data, isLoading]);
  useEffect(() => {
    if (!deletedDataFromApi) return;

    AllDAta();
  }, [deletedDataFromApi]);
  useEffect(() => {
    if (!permanentdeletedDataFromApi) return;

    AllDAta();
  }, [permanentdeletedDataFromApi]);
  const AllDAta = async () => {
    allData();
  };
  const restore = (datauser) => {
    async function formHandel(e) {
      const token = localStorage.getItem("token");
      deleteData({ body: { isActive: true }, id: datauser._id, token: token });
    }
    formHandel();
    handleClose();
  };

  const finalDelete = () => {
    async function formHandel(e) {
      const token = localStorage.getItem("token");
      PermanentDeleteData({
        body: { isActive: true },
        id: dltData._id,
        token: token,
      });
    }
    formHandel();
    handleClose();
  };
  const cancel = () => {
    handleClose();
  };
  const addUser = () => {
    navigate("/");
  };
  const searchbar = (e) => {
    const findValue = e.target.value;

    if (findValue) {
      const searchedData = userData.filter(
        (ele) => ele.name.includes(findValue) || ele.email.includes(findValue)
      );
      setUserData(searchedData);
    } else {
      AllDAta();
    }
  };

  return (
    <>
      <Box className="search">
        <Box className="search-typograpy">
          <Input
            placeholder="Search"
            className="search-input"
            disableUnderline={true}
            onChange={searchbar}
          ></Input>
        </Box>
      </Box>
      <TableContainer className="TableContainer" component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Gender</StyledTableCell>
              {jsonUser?.status === "admin" ? (
                <StyledTableCell align="right">Action</StyledTableCell>
              ) : (
                ""
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {userData?.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell>{row.phone}</StyledTableCell>
                <StyledTableCell>{row.gender}</StyledTableCell>
                {jsonUser?.status === "admin" ? (
                  <StyledTableCell align="right">
                    <Stack direction="row" spacing={2}>
                      <Button
                        className="delete-btn"
                        variant="outlined"
                        onClick={() => deleteRow(row)}
                        startIcon={<DeleteIcon />}
                      ></Button>
                      <Button
                        className="view-btn"
                        variant="outlined"
                        startIcon={<RestoreIcon />}
                        onClick={() => restore(row)}
                      ></Button>
                    </Stack>
                  </StyledTableCell>
                ) : (
                  ""
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            className="modalText"
            variant="h6"
            component="h2"
          >
            Are you sure to Delete User
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              className="dltBtn"
              variant="outlined"
              color="error"
              onClick={() => {
                finalDelete();
              }}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              className="cancelBtn"
              variant="outlined"
              color="success"
              onClick={cancel}
              endIcon={<RestartAltIcon />}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
