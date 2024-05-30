import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableContainer,
  Button,
  Paper,
  Input,
  Stack,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import "./table.css";
import { UserContext } from "../../App";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DataTable() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    AllDAta();
  }, []);

  const AllDAta = async () => {
    const response = await axios.get("http://localhost:8000/alldata");
    setUserData(response.data);
  };
  const addUser = () => {
    navigate("/");
  };
  const tableHead = ["NAME", "EMAIL", "Status", "Phone Number", "GENDER"];
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
          />
        </Box>
      </Box>

      <TableContainer className="TableContainer" component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHead.map((row) => {
                return <StyledTableCell>{row}</StyledTableCell>;
              })}
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
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
