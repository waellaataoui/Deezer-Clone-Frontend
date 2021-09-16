import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { switchTheme as switchThemeAction } from "../store/settingsSlice"

import Switch from "react-switch";

const DarkMode = () => {
    const theme = useSelector(state => state.settings.theme)
    const dispatch = useDispatch()


    const switchTheme = (_, e) => {
        e.preventDefault()
        e.stopPropagation();  //  <------ Here is the magic
        if (theme === "dark") {
            document.documentElement.dataset.theme = "light";
            dispatch(switchThemeAction("light"))
        } else {
            document.documentElement.dataset.theme = "dark";
            dispatch(switchThemeAction("dark"))
        }
    };

    return (

        <Switch onChange={switchTheme} checked={theme === "dark"} />

    );
};

export default DarkMode;