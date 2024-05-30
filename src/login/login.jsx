import React, { useState, useEffect, useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import {
  Google,
  FacebookOutlined,
  GitHub,
  LinkedIn,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./login.css";
const Login = () => {
  const location = useLocation();
  const path = location.pathname;
  const {
    watch,
    handleSubmit,
    formState: { errors, isSubmitted },
    register,
    validate,
    field,
    control,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone: "",
      status: false,
      gender: false,
    },
  });
  const [isSignIn, setIsSignIn] = useState(true);
  const useSnack = useContext(UserContext);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  const onSubmit = (data, e) => {
    {
      isSignIn ? loginFunc(data) : formHandel(data);
    }

    async function formHandel(e) {
      const response = await axios.post("http://localhost:8000/register", data);
      if (response.data.status === "success") {
        if (response.data.token) {
          let token = response.data.token;
          let user = response.data.user;
          localStorage.setItem("token", token);
          const userJsonData = JSON.stringify(user);
          localStorage.setItem("user", userJsonData);
          navigate("/dashboard");
          useSnack.setSnackbar({
            state: true,
            message: response.data.message,
            severity: response.data.status,
          });
        }
      } else {
        useSnack.setSnackbar({
          state: true,
          message: response.data.message,
        });
      }
    }
    async function loginFunc(e) {
      const response = await axios.post("http://localhost:8000/login", data);
      if (response.data.status === "success") {
        if (response.data.token) {
          let token = response.data.token;
          let user = response.data.user;
          localStorage.setItem("token", token);
          const userJsonData = JSON.stringify(user);
          localStorage.setItem("user", userJsonData);
          navigate("/dashboard");
          useSnack.setSnackbar({
            state: true,
            message: response.data.message,
            severity: response.data.status,
          });
        }
      } else {
        useSnack.setSnackbar({
          state: true,
          message: response.data.message,
        });
      }
    }
  };

  const navigate = useNavigate();

  const toggleMode = async (data, e) => {
    setIsSignIn((prev) => !prev);
  };

  const socialMediaIconsList = [
    <Google style={{ fontSize: "12px" }} />,
    <FacebookOutlined style={{ fontSize: "12px" }} />,
    <GitHub style={{ fontSize: "12px" }} />,
    <LinkedIn style={{ fontSize: "12px" }} />,
  ];

  return (
    <Box className="login-container">
      <Paper className="main-paper">
        <Box className="main">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography className="form-sign-in-txt">
              {isSignIn ? "Sign In" : "Sign Up"}
            </Typography>
            {isSignIn ? (
              <Box className="icon-container">
                {socialMediaIconsList?.map((item, index) => (
                  <Box key={index} className="icon-list-item">
                    {item}
                  </Box>
                ))}
              </Box>
            ) : null}

            {!isSignIn && (
              <>
                <TextField
                  id="filled-basic"
                  placeholder="Name"
                  variant="filled"
                  name="name"
                  InputProps={{ disableUnderline: true }}
                  className="form-input"
                  {...register("name", {
                    required: "UserName is required.",
                    pattern: {
                      value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
                      message: "requierd username regex",
                    },
                  })}
                />
                {errors?.name?.message ? (
                  <FormHelperText className="error-color">
                    {errors?.name?.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </>
            )}
            <TextField
              id="filled-basic"
              placeholder="Email"
              name="email"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="form-input"
              {...register("email", {
                required: "email is required.",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "plese fill right Regex Email",
                },
              })}
            />
            {errors?.email?.message ? (
              <FormHelperText className="error-color">
                {errors?.email?.message}
              </FormHelperText>
            ) : (
              ""
            )}
            <TextField
              id="filled-basic"
              placeholder="Password"
              name="password"
              variant="filled"
              InputProps={{ disableUnderline: true }}
              className="form-input"
              {...register("password", {
                required: "password is required.",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: " use Strong paasword",
                },
              })}
            />
            {errors?.password?.message ? (
              <FormHelperText className="error-color">
                {errors?.password?.message}
              </FormHelperText>
            ) : (
              ""
            )}
            {!isSignIn && (
              <>
                <TextField
                  id="filled-basic"
                  placeholder="Confirm password"
                  name="confirm_password"
                  error={Boolean(errors?.confirm_password)}
                  variant="filled"
                  InputProps={{ disableUnderline: true }}
                  className="form-input"
                  {...register("confirm_password", {
                    required: "Confirm Password Is Required",
                    validate: (value) =>
                      value === watch("password") ||
                      "Confirm passwords did not match",
                  })}
                />
                {errors?.confirm_password?.message ? (
                  <FormHelperText className="error-color">
                    {errors?.confirm_password?.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
                <TextField
                  id="filled-basic"
                  placeholder="Phone number"
                  variant="filled"
                  name="phone"
                  error={Boolean(errors?.phone)}
                  InputProps={{ disableUnderline: true }}
                  className="form-input"
                  {...register("phone", {
                    required: "phone Number is required.",
                    pattern: {
                      value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                      message: " Currect phone Number Regex",
                    },
                  })}
                />
                {errors?.phone?.message ? (
                  <FormHelperText className="error-color">
                    {errors?.phone?.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
                <Controller
                  control={control}
                  name="status"
                  rules={{
                    required: "Status is required",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      placeholder="Role type"
                      name="status"
                      error={Boolean(errors?.status)}
                      variant="filled"
                      onChange={onChange}
                      value={value}
                      disableUnderline
                      className="form-input"
                    >
                      <MenuItem value={false} disabled>
                        --Select role
                      </MenuItem>
                      <MenuItem value={"admin"}>Admin</MenuItem>
                      <MenuItem value={"client"}>Client</MenuItem>
                    </Select>
                  )}
                />

                {errors?.status?.message ? (
                  <FormHelperText className="error-color">
                    {errors?.status?.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
                <Controller
                  control={control}
                  name="gender"
                  rules={{
                    required: "Gender is required",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      variant="filled"
                      disableUnderline
                      className="form-input"
                      defaultValue={0}
                      name="gender"
                      value={value}
                      onChange={onChange}
                      error={Boolean(errors?.gender)}
                    >
                      <MenuItem value={false} selected={true} disabled>
                        --Select gender
                      </MenuItem>
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                      <MenuItem value={"other"}>Other</MenuItem>
                    </Select>
                  )}
                />
                {errors?.gender?.message ? (
                  <FormHelperText className="error-color">
                    {errors?.gender?.message}
                  </FormHelperText>
                ) : (
                  ""
                )}
              </>
            )}
            {isSignIn && (
              <Button className="forgot-button">Forgot your password?</Button>
            )}
            <Button type="submit" className="sign-in-button">
              {isSignIn ? "Sign In" : "Sign up"}
            </Button>
          </form>
        </Box>
        <Box className="card-side-container">
          <Typography variant="h4" className="hello-user-txt">
            Hello User !
          </Typography>
          <Typography className="register-txt">
            {isSignIn
              ? "Sign In Register with your personal details to use all of site features"
              : " Are you already a existing user ?"}
          </Typography>
          <Button onClick={toggleMode} className="sign-up-btn">
            {isSignIn ? "Sign up" : "SIGN In"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
