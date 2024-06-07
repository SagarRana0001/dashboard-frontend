import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";

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
import "./update.css";
import { useDispatch } from "react-redux";
import { reduxSnackbar } from "../redux/slice/slice";
import { useGetUpdateApiByNameMutation } from "../redux/services/updateApi";

const Form = () => {
  const [updatedDataApi, { data: updateData, error, isLoading }] =
    useGetUpdateApiByNameMutation();
  const location = useLocation();
  const editdata = location?.state?.editdata;
  const data = location?.state?.data;
  const {
    handleSubmit,
    formState: { errors, isSubmitted },
    register,
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: data ? data?.name : editdata.name,
      email: data ? data?.email : editdata.email,
      phone: data ? data?.phone : editdata.phone,
      status: data ? data?.status : editdata.status,
      gender: data ? data?.gender : editdata.gender,
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (updateData) {
      let localuser = JSON.parse(localStorage.getItem("user"));
      if (updateData.user["_id"] === localuser["_id"]) {
        localStorage.setItem("user", JSON.stringify(updateData.user));
      }
      let user = updateData?.user;
      localStorage.getItem("token");
      const userJsonData = user;
      localStorage.getItem("user", userJsonData);
      navigate("/dashboard/active");

      dispatch(
        reduxSnackbar({
          state: true,
          message: updateData.message,
          severity: updateData.status,
        })
      );
    }
  }, [updateData]);

  const onSubmit = (current_data, e) => {
    const token = localStorage.getItem("token");
    async function formHandel(e) {
      updatedDataApi({
        body: current_data,
        id: data ? data?._id : editdata?._id,
        token: token,
      });
    }
    formHandel();
  };

  return (
    <>
      <Box className="update-container">
        <Paper className="main-paper">
          <Box className="main">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
              <Typography className="form-sign-in-txt">Updated Data</Typography>

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
                placeholder="Phone number"
                variant="filled"
                name="phone"
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

              <Button type="submit" className="sign-in-button">
                Update
              </Button>
            </form>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
export default Form;
