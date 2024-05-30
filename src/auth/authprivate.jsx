import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const route = ["/dashboard", "/dashboard/edit-user"];
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      navigate("/");
    }
    if (user.status === "client" && !route.includes(location.pathname)) {
      navigate("/");
    }
  }, []);
  return <Outlet />;
};
export default PrivateRoute;
