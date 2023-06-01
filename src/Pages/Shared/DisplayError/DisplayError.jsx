import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const DisplayError = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const error = useRouteError();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login")
      })
      .then((err) => console.error(err));
  };
  return (
    <div className="text-center">
      <p className="text-red-500 text-5xl my-10">Something Went Wrong</p>
      <p className="text-red-400">{error.statusText || error.message}</p>
      <h4 className="text-3xl my-20">
        Please <button onClick={handleLogOut} className="link text-blue-500">SignOut</button>  and log back in
      </h4>
    </div>
  );
};

export default DisplayError;
