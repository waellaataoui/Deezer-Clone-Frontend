import { useState, useEffect } from 'react'
import axios from "axios"
import { useParams, useHistory } from "react-router-dom"
import Loader from "../components/Loader"

import filterStyles from "../assets/styles/SearchFilters.module.scss"
import styles from "../assets/styles/ProfileHeader.module.scss"
import defaultAvatar from "../assets/avatar.png";

const ProfileHeader = ({ artist }) => {
    const params = useParams()
    const [filter, setFilter] = useState(null)
    const [profile, setProfile] = useState(null)
    const [error, setError] = useState(null)
    const history = useHistory();
    const handleFilter = (e) => {
        history.push(`/profile/${params.id}/${e.target.htmlFor}`)
    }
    const fetchProfile = async () => {
        try {
            const res = await axios.get(`/api/users/${params.id}`)
            setProfile(res.data)
        } catch (error) {
            if (error.response.status === 404) setError('User Not Found')
        }
    }
    const fetchArtist = async () => {
        const res = await axios.get(`/api/artists/${params.id}`)
        setProfile(res.data)
    }
    useEffect(() => {
        setFilter(params.section)
        if (artist) fetchArtist()
        else fetchProfile()

    }, [])
    return (
        <div>
            {!error ? <>

                {profile ? <div className={styles.userInfos}>

                    <img className={styles.avatar} src={profile.avatar || defaultAvatar} alt="avatar" />
                    <div className={styles.details}>
                        <h1>{profile.name}  {profile.id === 1 && <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.6596l-3.38079 1.8543-1.84158-3.3877-3.84662-.2679.28231-3.8456-3.09118-2.3049 2.31658-3.0825-1.3543-3.61028 3.61534-1.34071.81255-3.76935 3.76627.82672L12 0l2.7214 2.73168 3.7663-.82672.8125 3.76935 3.6154 1.34071-1.3543 3.61028 2.3166 3.0825-3.0912 2.3049.2823 3.8456-3.8466.2679-1.8416 3.3877L12 21.6596z" fill="#2E77D0"></path><path d="M16.8637 7.41226l-6.6435 7.77824-2.80421-3.2842-.4935.5775 3.29771 3.8617 7.2135-8.44649-.57-.48675z" fill="#fff"></path></svg>} </h1>
                        {/* <p> followers 50</p> */}
                    </div>
                </div> : <Loader></Loader>}
                {profile && !artist && <div className={filterStyles.filters}>
                    <label onClick={handleFilter} className={!filter ? filterStyles.active : undefined} >Highlights</label>
                    <label onClick={handleFilter} className={filter == 'loved' ? filterStyles.active : undefined} htmlFor="loved">Favourite Tracks</label>
                    <label onClick={handleFilter} className={filter == 'playlist' ? filterStyles.active : undefined} htmlFor="playlist">Playlists</label>
                </div>}
            </> : <p className="notFound">{error} </p>}
        </div>
    )
}
export default ProfileHeader;