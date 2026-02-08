import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

const DefaultRoute = () => {
  const token = localStorage.getItem("token");
  console.log(token,"null why")

  return token
    ? <Navigate to="/home" replace />
    : <Navigate to="/signIn" replace />;
};

export default DefaultRoute;
