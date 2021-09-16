import { useRef, useState } from "react"
import axios from "axios"

import styles from "../assets/styles/Nav.module.scss"
import logo from "../assets/logo.png"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import useOnClickOutside from "../utils/useOnClickOutside"

import { setUser } from "../store/authSlice"
import defaultAvatar from "../assets/avatar.png";
import DarkMode from "./DarkMode"
import { ReactComponent as LogoutIcon } from "../assets/logout.svg"
import { ReactComponent as UploadIcon } from "../assets/upload.svg"
const ArtistNav = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false)
    useOnClickOutside(dropdownRef, () => setIsActive(false));

    const onClick = () => {
        setIsActive(!isActive);
    }
    const user = useSelector(state => state.auth.user)
    const theme = useSelector(state => state.settings.theme)
    const logout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/logout");
            dispatch(setUser(null))
            history.push("/artist/login")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav id={styles.nav} className={!user || !user?.isArtist ? styles.big : ''}>
            <Link className={styles.logo} to="/artist">
                <img src={logo} alt="logo" />
                For artists
            </Link>

            {(user && user.isArtist) ? <div ref={dropdownRef} className={styles.dropdown}>
                <img className={styles.menuTrigger} onClick={onClick}
                    src={user.avatar || defaultAvatar}
                    alt="artist avatar"
                />
                <nav

                    className={
                        isActive ? styles.menuActive : styles.menu}
                >
                    <ul>
                        <li onClick={() => history.push('/artist/upload')}>
                            Upload
                            <UploadIcon className={theme === "light" ? styles.icon :
                                styles['icon-white']}></UploadIcon>
                        </li>
                        <li>
                            <Link to="#">Profile</Link>
                        </li>
                        <li>
                            <span>Dark Mode</span> <DarkMode></DarkMode>

                        </li>
                        <li onClick={logout}>
                            Logout   <LogoutIcon className={theme === "light" ? styles.icon :
                                styles['icon-white']}></LogoutIcon>
                        </li>
                    </ul>
                </nav>
            </div>

                : <div className={`${styles.links} ${styles.show} `}>

                    <Link className="btn outline" to="/artist/login">
                        Login
                </Link>

                </div>}
        </nav>
    )
}
export default ArtistNav