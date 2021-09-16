import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"

import axios from "axios"
import styles from "../assets/styles/ProfileHighlights.module.scss"
import ProfileHeader from "../components/ProfileHeader"
const ProfileHighlights = () => {
    const params = useParams()
    const [data, setData] = useState({})
    const sideBarFolded = useSelector(state => state.settings.sideBarFolded)

    useEffect(() => {

    }, [])

    return (
        <div className={sideBarFolded ? 'container' : 'container--expanded'}>
            <ProfileHeader></ProfileHeader>
            <div className={styles.results}>

            </div>
        </div >

    )
}
export default ProfileHighlights;