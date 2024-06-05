import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import "./table.css";
import { UserContext } from "../../App";
import DownloadIcon from "@mui/icons-material/Download";
import { StyledTableRow, StyledTableCell, style } from "./styleTableComponet";
import { reduxSnackbar } from "../../redux/slice/slice";
import { useDispatch } from "react-redux";
export default function DataTable() {
  const dispatch = useDispatch();
  const [jsonUser, setjsonUser] = useState({});
  const [dltData, setDltData] = useState();
  const [open, setOpen] = useState(false);
  const softDelete = (data) => {
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
  const AllDAta = async () => {
    const response = await axios.get("http://localhost:8000/alldata");
    const activeUser = response.data.filter((ele) => {
      return ele.isActive === true;
    });

    setUserData(activeUser);
  };
  const viewAll = (data) => {
    navigate("/dashboard/profile", { state: { data } });
  };
  const editUser = (data) => {
    navigate("/dashboard/edit-user", { state: { data } });
  };
  const finalSoftDelete = () => {
    async function formHandel(e) {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:8000/update?id=${dltData?._id}`,
        { isActive: false },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      AllDAta();
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
  const handleDownload = async (e, data) => {
    e.stopPropagation();
    const file = e.target.files[0];

    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/upload-data",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          reduxSnackbar({
            state: true,
            message: response.data.message,
            severity: response.data.status,
          })
        );
        // useSnack.setSnackbar({
        //   state: true,
        //   message: response.data.message,
        //   severity: response.data.status,
        // });
        AllDAta();
      } else {
        dispatch(
          reduxSnackbar({
            state: true,
            message: response.data.message,
            severity: response.data.status,
          })
        );
        // useSnack.setSnackbar({
        //   state: true,
        //   message: response.data.message,
        //   severity: response.data.status,
        // });
      }
    } catch (err) {
      console.log(err, "error");
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
      <Box
        sx={{
          "& button": { m: 1 },
          display: "flex",
          justifyContent: "space-between",
          padding: " 10px 0px",
        }}
      >
        <Button variant="contained" size="small" onChange={handleDownload}>
          <InputLabel htmlFor="file-upload">
            <Stack direction={"row"} className="upload-create">
              Upload Document
              <DownloadIcon className="DownloadIcon" />
            </Stack>
          </InputLabel>
          <Input id="file-upload" type="file" accept="text/csv" />
        </Button>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" onClick={addUser} startIcon={<AddIcon />}>
            Create User
          </Button>
        </Stack>
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
              {jsonUser?.status == "admin" ? (
                <StyledTableCell align="right">Action</StyledTableCell>
              ) : (
                ""
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
                <StyledTableCell>{row.phone}</StyledTableCell>
                <StyledTableCell>{row.gender}</StyledTableCell>
                {jsonUser?.status == "admin" ? (
                  <StyledTableCell align="right">
                    <Stack direction="row" spacing={2}>
                      <Button
                        className="delete-btn"
                        variant="outlined"
                        onClick={() => softDelete(row)}
                        startIcon={<DeleteIcon />}
                      ></Button>
                      <Button
                        className="view-btn"
                        variant="outlined"
                        startIcon={<VisibilityIcon />}
                        onClick={() => viewAll(row)}
                      ></Button>
                      <Button
                        className="edit-btn"
                        onClick={() => editUser(row)}
                        variant="outlined"
                        startIcon={<EditIcon />}
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
                finalSoftDelete();
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
