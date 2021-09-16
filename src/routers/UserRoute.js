import { useState } from "react"
import {
    Route
} from "react-router-dom";
import Nav from "../components/Nav";
import SideBar from "../components/SideBar";
import Player from "../components/Player";

const UserRoute = ({ component: Component, ...rest }) => {
    // const [player, setPlayer] = useState(null)
    // const getInstance = (instance) => {
    //     console.log(instance);
    //     setPlayer(instance)
    // }
    return <Route {...rest} component={
        (routeProps) => {
            return <> <Nav {...routeProps} />
                <SideBar></SideBar>
                <Component {...routeProps} />

            </>
        }}
    />
}
export default UserRoute;