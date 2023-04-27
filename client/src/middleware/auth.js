import { Navigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

export const AuthorizeStudent = ({ children }) => {
  const token = localStorage.getItem("token");
  if(!token) {
      return <Navigate to={"/"} replace={true}></Navigate>
  }
  return children;
}

