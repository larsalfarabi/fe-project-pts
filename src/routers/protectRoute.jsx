import React from "react";
import "../styles/styles.css";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authMe } from "../pages/redux/action/authAction";
import { syncToken } from "../API/baseUrl2";

const ProtectedRoute = ({ children }) => {
  const auth = Cookies.get("myapps_token");
  const isAuth = useSelector((state) => state?.authProcess?.isAuth);
  const role = useSelector((state) => state?.authProcess?.role);

  console.log("auth => ", isAuth);
  let [process, setProcess] = React.useState(true);
  let dispatch = useDispatch();
  const onLoaded = async (values) => {
    let result = await dispatch(authMe(values));
    syncToken();
    setTimeout(() => {
      setProcess(false);
    }, 2000);

    console.log("res", result);
  };
  React.useEffect(() => {
    if (!isAuth) {
      if (auth !== undefined) {
        onLoaded();
      } else {
        setProcess(false);
      }
    } else {
      syncToken();
      setProcess(false);
    }
  }, []);

  if (process) {
    return (
      <div className="flex h-screen w-full items-center justify-center  ">
        <div class="three-body">
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
          <div class="three-body__dot"></div>
        </div>
      </div>
    );
  } else {
    console.log("auth", auth);
    return auth !== undefined ? children : <Navigate to={"/login"} replace />;
  }
};

export default ProtectedRoute;
