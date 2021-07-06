import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import User from "../contexts/user";

const PrivateRoute = ({ children, ...others }) => {
  const user= useContext(User);
  return (
    <Route
      {...others}
      render={() =>
        (user.token) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { msg: "Por favor, haz login primero" },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
