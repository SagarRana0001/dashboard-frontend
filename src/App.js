import Login from "./login/login";
import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import Form from "./updateData/update";
import { SuccessSnackbar } from "./snakbar/snakbar";
import CustomizedTables from "./dashboard/table/table";
import ProfileCard from "./dashboard/profile/profile";
import PrivateRoute from "./auth/authprivate";
import CsvCards from "./csv/csv";
import Inactive from "./dashboard/table/inactive";
import ActiveUsers from "./dashboard/table/active";

export const UserContext = createContext();
function App() {
  const [snackbar, setSnackbar] = useState({
    state: false,
    message: null,
    severity: null,
  });
  return (
    <>
      <UserContext.Provider value={{ snackbar, setSnackbar }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<CustomizedTables />} />
                <Route path="profile" element={<ProfileCard />} />
                <Route path="csv" element={<CsvCards />} />
                <Route path="inactive" element={<Inactive />} />
                <Route path="active" element={<ActiveUsers />} />
                <Route path="edit-user" element={<Form />}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <SuccessSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
      </UserContext.Provider>
    </>
  );
}

export default App;
