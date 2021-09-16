import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux';

const PrivateRoute = ({

    component: Component,
    ...rest
}) => {
    let user = useSelector(state => state.auth.user)
    const isAuthenticated = user && !user.isArtist
    return <Route
        {...rest}
        component={(props) =>
            isAuthenticated ? (
                <div>
                    <Component {...props} />
                </div>
            ) : (
                <Redirect to="/login" />
            )
        }
    />
}



export default PrivateRoute;
