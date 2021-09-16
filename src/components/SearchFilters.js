import { useState, useEffect } from 'react'

import styles from "../assets/styles/SearchFilters.module.scss"
import { useParams, useHistory } from "react-router-dom"
const SearchFilters = () => {
    const params = useParams()
    const [filter, setFilter] = useState(null)
    const history = useHistory();
    const handleFilter = (e) => {
        history.push(`/search/${encodeURIComponent(params.keywords)}/${e.target.htmlFor}`)
        //because react-router doesnt support url encoding
        window.history.pushState(null, '', `/search/${encodeURIComponent(params.keywords)}/${e.target.htmlFor}`)

    }
    useEffect(() => {
        setFilter(params.filter)
    }, [])
    return (
        <div className={styles.filters}>
            <label onClick={handleFilter} className={!filter ? styles.active : undefined} >All</label>
            <label onClick={handleFilter} className={filter == 'track' ? styles.active : undefined} htmlFor="track">Tracks</label>
            <label onClick={handleFilter} className={filter == 'artist' ? styles.active : undefined} htmlFor="artist">Artists</label>
            <label onClick={handleFilter} className={filter == 'album' ? styles.active : undefined} htmlFor="album">Albums</label>
            <label onClick={handleFilter} className={filter == 'playlist' ? styles.active : undefined} htmlFor="playlist">Playlists</label>
        </div>
    )
}
export default SearchFilters;