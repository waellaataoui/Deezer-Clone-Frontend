import { useEffect, useRef, useState } from "react";
import { FaRegCompass, FaRegHeart, FaChevronDown, FaSearch } from 'react-icons/fa';
import { AiOutlineHome, AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineUser, AiOutlineSearch } from 'react-icons/ai';
import { useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { toggleFolded } from "../store/settingsSlice"
import SearchBar from "../components/SearchBar"
import styles from "../assets/styles/SideBar.module.scss"
import logo from "../assets/logo.png"
const SideBar = () => {
    const user = useSelector(state => state.auth.user)
    const [display, setDisplay] = useState(true)
    const folded = useSelector(state => state.settings.sideBarFolded)

    const history = useHistory()

    const { innerWidth: screenWidth } = window;
    const sideBar = useRef()
    const favouritesDropdown = useRef()
    const authDropdown = useRef()
    const dispatch = useDispatch()
    const smallScreen = screenWidth <= 850
    const mediumScreen = screenWidth <= 1150

    const toggleSideBar = () => {
        sideBar.current.classList.toggle(styles.close)
        dispatch(toggleFolded(!folded))
    }
    const toggleFavouritesDropDown = () => {
        let arrowParent = favouritesDropdown.current.parentElement; //selecting main parent of arrow
        arrowParent.classList.toggle(styles.showMenu);
    }
    const toggleAuthDropDown = () => {
        let arrowParent = authDropdown.current.parentElement; //selecting main parent of arrow
        arrowParent.classList.toggle(styles.showMenu);
    }

    useEffect(() => {
        if (smallScreen) dispatch(toggleFolded(true))

        if (history.location.pathname === "/login" || history.location.pathname === "/register")
            setDisplay(false)


        return history.listen((location) => {
            if (location.pathname === "/login" || location.pathname === "/register")
                setDisplay(false)
            else setDisplay(true)

        })
    }, [history])

    return (

        display && <div ref={sideBar} className={`${styles.sidebar} ${(smallScreen || folded) ? styles.close : ''}`}>
            <div className={styles.toggle} onClick={toggleSideBar}>
                {folded ? <AiOutlineMenuUnfold></AiOutlineMenuUnfold> : <AiOutlineMenuFold></AiOutlineMenuFold>}
            </div>
            <div className={styles["logo-details"]}>
                <Link to="/"> <img className={styles.logo} src={logo} alt="logo" /></Link>
                <span className={styles["logo_name"]}>App Name</span>
            </div>

            <ul className={styles["nav-links"]}>

                <li>
                    <Link to="/">
                        <AiOutlineHome></AiOutlineHome>
                        <span className={styles["link_name"]}>Home</span>
                    </Link>
                    <ul className={`${styles["sub-menu"]} ${styles["blank"]}`}>
                        <li><Link className={styles["link_name"]} to="/">Home</Link></li>
                    </ul>
                </li>


                <li>
                    <Link to="/explore">
                        <FaRegCompass></FaRegCompass>
                        <span className={styles["link_name"]}>Explore</span>
                    </Link>
                    <ul className={`${styles["sub-menu"]} ${styles["blank"]}`}>
                        <li><Link className={styles["link_name"]} to="/explore">Explore</Link></li>
                    </ul>
                </li>

                {user && !user.isArtist && <li>
                    <div onClick={toggleFavouritesDropDown} ref={favouritesDropdown} className={styles["icon-link"]}>
                        <button >
                            <FaRegHeart></FaRegHeart>
                            <span className={styles["link_name"]}>Favourites</span>
                        </button>
                        <FaChevronDown className={styles["chevron"]}></FaChevronDown>
                    </div>
                    <ul className={styles["sub-menu"]}>
                        <li><Link className={styles["link_name"]} to="/favourites">Favourites</Link></li>
                        <li><Link to={`/profile/${user.model_id}/loved`}>Favourite Tracks</Link></li>
                        <li><Link to={`/profile/${user.model_id}/playlist`}>Playlists</Link></li>
                    </ul>
                </li>}
                {mediumScreen && <li className={styles["search-menu"]}>
                    <button>
                        <AiOutlineSearch ></AiOutlineSearch>
                        <span className={styles["link_name"]}>
                            <SearchBar compact={true}></SearchBar>

                        </span>
                    </button>
                    <ul className={`${styles["sub-menu"]} ${styles["search-container"]} `}>
                        <li>
                            <SearchBar compact={true}></SearchBar>

                        </li>
                    </ul>
                </li>}
                {(user && !user.isArtist) || !mediumScreen ? null : <li>
                    <div onClick={toggleAuthDropDown} ref={authDropdown} className={styles["icon-link"]} >
                        <button>
                            <AiOutlineUser></AiOutlineUser>
                            <span className={styles["link_name"]}>Account</span>
                        </button>
                        <FaChevronDown className={styles["chevron"]}></FaChevronDown>
                    </div>
                    <ul className={`${styles["sub-menu"]} ${styles["last"]}`} >
                        <li><Link className={styles["link_name"]} to="#">Account</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/artist">For artists</Link></li>

                    </ul>
                </li>}


            </ul>
        </div>


    )
}
export default SideBar;