import React from "react";
import { useAuthDataContext } from "./AuthContext";
import Login from "./Pages/Login";
import { Route } from "react-router";

const PrivateRoute = ({component, ...options}) => {
    const {user} = useAuthDataContext();
    const finalComponent = user ? component : Login;

    return <Route {...options} component={finalComponent}/>;
};

export default PrivateRoute;