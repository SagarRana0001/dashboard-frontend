import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  FormGroup,
  Input,
  InputLabel,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import {
  Google,
  FacebookOutlined,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";
import "./profile.css";
import { reduxSnackbar } from "../../redux/slice/slice";

export default function ProfileCard() {
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location?.state?.data;
  const [user, setUser] = useState({});
  const [image, setimage] = useState("");
  const cancel = () => {
    navigate("/dashboard");
  };
  const getData = async (data) => {
    const response = await axios.put(`http://localhost:8000/upload`, data, {
      headers: { Authorization: "Bearer" + token },
    });
    if (response) {
      setimage(response.data.img);
      setUser({ ...user, img: response.data.img });
      console.log("Api did hit upload", response.data);
    } else {
      console.log("error in hitting the api upload");
    }
  };
  const onlyUser = async (e) => {
    try {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        if (e.loaded <= 200000) {
          getData({ img: reader.result, id: user._id });
          setimage(reader.result);
          let user_img = JSON.parse(localStorage.getItem("user"));

          user_img.img = reader.result;

          if (user_img?.img) {
          }

          localStorage.setItem("user", JSON.stringify(user_img));
        } else {
          dispatch(
            reduxSnackbar({
              state: true,
              message: `Image is to big`,
              severity: `error`,
            })
          );
        }
      };
    } catch (error) {}
  };
  useEffect(() => {}, [image]);
  const local_user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  let userid = local_user["_id"];

  React.useEffect(() => {
    let localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser) {
      setUser(localUser);
    }
  }, []);

  const navigate = useNavigate();
  const editProfile = (editdata) => {
    navigate("/dashboard/edit-user", { state: { editdata } });
  };
  const socialMediaIconsList = [
    <Google style={{ fontSize: "12px", cursor: "pointer" }} />,
    <FacebookOutlined style={{ fontSize: "12px", cursor: "pointer" }} />,
    <GitHub style={{ fontSize: "12px", cursor: "pointer" }} />,
    <LinkedIn style={{ fontSize: "12px", cursor: "pointer" }} />,
  ];

  return (
    <>
      <Box className="profile-container">
        <Card className="main-card-edit">
          <Box>
            <Box className="cardhead">
              <Stack alignItems={"center"} spacing={1}>
                <Box className="edit-btn">
                  <InputLabel htmlFor="file-upload">
                    <EditIcon className="EditIcon" />
                  </InputLabel>
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={onlyUser}
                  />
                </Box>
              </Stack>
            </Box>
            <Avatar
              className="img-avtar"
              name="profileImage"
              src={data ? data?.img : user?.img || ""}
            >
              <InputLabel htmlFor="file-upload">
                <AddCircleOutlineIcon className="AddCircleOutlineIcon" />
              </InputLabel>
              <Input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={onlyUser}
              />
            </Avatar>
          </Box>
          <Box className="profile-text">
            <Typography gutterBottom variant="h5" component="div">
              {data ? data.name : user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              E-mail:{data ? data.email : user.email}
            </Typography>
            <Box className="icon-container">
              {socialMediaIconsList?.map((item, index) => (
                <Box key={index} className="icon-list-item">
                  {item}
                </Box>
              ))}
            </Box>
            {data ? (
              ""
            ) : user ? (
              <Stack direction="row" spacing={2} p={2}>
                <Button
                  variant="contained"
                  onClick={() => editProfile(user)}
                  endIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={cancel}
                  endIcon={<RestartAltIcon />}
                >
                  Cencel
                </Button>
              </Stack>
            ) : (
              ""
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
}
