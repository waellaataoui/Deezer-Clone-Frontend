import { useEffect } from 'react';

import {
    Route
} from "react-router-dom";
import ArtistNav from "../components/ArtistNav";
const ArtistRoute = ({ component: Component, ...rest }) => {
    useEffect(() => {



    }, [])
    return <Route {...rest} component={
        (routeProps) => {
            return <>
                <ArtistNav {...routeProps} />
                <Component {...routeProps} />
            </>
        }}
    />
}
export default ArtistRoute;