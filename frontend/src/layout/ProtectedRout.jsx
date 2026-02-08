import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
//   console.log(token,"in protected rout")

  return token ? <Outlet /> : <Navigate to="/signIn" replace />;
};

export default ProtectedRoute;
