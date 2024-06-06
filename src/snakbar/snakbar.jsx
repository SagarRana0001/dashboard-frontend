import { Alert, Snackbar } from "@mui/material";
import { CLICKAWAY, ERROR, SUCCESS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { reduxSnackbar } from "../redux/slice/slice";
export const SuccessSnackbar = ({}) => {
  const count = useSelector((state) => state.counter.value);
  console.log(count, "gggggg");
  const dispatch = useDispatch();
  const handleSnackbarClose = (event, reason) => {
    if (reason === CLICKAWAY) {
      return;
    }
    dispatch(
      reduxSnackbar({
        state: false,
        message: null,
        severity: null,
      })
    );
  };
  return (
    <Snackbar
      open={count?.state}
      autoHideDuration={4000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={count?.severity === SUCCESS ? SUCCESS : ERROR}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {count.message}
      </Alert>
    </Snackbar>
  );
};
