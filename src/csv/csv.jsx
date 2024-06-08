import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DownloadIcon from "@mui/icons-material/Download";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Button, Stack } from "@mui/material";
import "./csv.css";
import { useLazyGetAllDataApiByNameQuery } from "../redux/services/alldatatoolkit";
export default function CsvCard() {
  const [allData, { data: csvData, error, isLoading }] =
    useLazyGetAllDataApiByNameQuery();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!csvData) return;
    console.log(csvData, "csvData");
    const allUsers = csvData;
    const activeUsers = [];
    const inActiveUsers = [];
    csvData.map((user) => {
      if (user.isActive) {
        activeUsers.push(user);
      } else {
        inActiveUsers.push(user);
      }
    });
    setData({
      allUsers: allUsers,
      activeUsers: activeUsers,
      inActiveUsers: inActiveUsers,
    });
  }, [csvData, isLoading]);
  useEffect(() => {
    const handleData = async () => {
      allData();
    };
    handleData();
  }, []);
  const handleGetCSV = async (endPoint) => {
    await axios({
      url: `http://localhost:8000/${endPoint}`,
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${endPoint}.csv`);
      link.click();
    });
  };
  const allUsers = async (e, endPoint) => {
    e.stopPropagation();
    try {
      handleGetCSV(endPoint);
    } catch (error) {}
  };

  return (
    <>
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Card sx={{ width: "30%" }} className="total">
          <CardContent>
            <Typography className="userFont" gutterBottom>
              Total User
            </Typography>
            <Typography className="userFont" component="div">
              {data?.allUsers?.length}
            </Typography>
            <Box sx={{ textAlign: "end", marginTop: "20px" }}>
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#fff", color: "#000" }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={(e) => allUsers(e, "uploaddata")}
                >
                  Download
                  <DownloadIcon sx={{ height: "18px" }} />
                </Stack>
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: "30%" }} className="active">
          <CardContent>
            <Typography className="userFont" gutterBottom>
              Active User
            </Typography>
            <Typography className="userFont" component="div">
              {data?.activeUsers?.length}
            </Typography>
            <Box sx={{ textAlign: "end", marginTop: "20px" }}>
              <Button
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#fff", color: "#000" }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={(e) => allUsers(e, "uploaddata")}
                >
                  Download
                  <DownloadIcon sx={{ height: "18px" }} />
                </Stack>
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ width: "30%" }} className="trash">
          <CardContent>
            <Typography className="userFont" gutterBottom>
              Inactive User
            </Typography>
            <Typography className="userFont" component="div">
              {data?.inActiveUsers?.length}
            </Typography>
            <Box sx={{ textAlign: "end", marginTop: "20px" }}>
              <Button
                className="dwlIcon"
                variant="contained"
                size="small"
                sx={{ backgroundColor: "#fff", color: "#000" }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={(e) => allUsers(e, "uploaddata")}
                >
                  Download
                  <DownloadIcon className="DownloadIcon" />
                </Stack>
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
