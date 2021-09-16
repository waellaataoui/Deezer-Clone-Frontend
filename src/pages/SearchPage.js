import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom"
import { FaChevronRight } from 'react-icons/fa';

import axios from "axios"
import styles from "../assets/styles/SearchPage.module.scss"
import SearchFilters from "../components/SearchFilters"
import TrackList from "../components/TrackList"
import ArtistList from '../components/ArtistList';
import AlbumsList from '../components/AlbumList';
import PlaylistList from '../components/PlaylistList';
const SearchPage = () => {
    const history = useHistory()

    const params = useParams()
    const [data, setData] = useState({}) //later populate attributes 
    const sideBarFolded = useSelector(state => state.settings.sideBarFolded)
    //forced to use this instead of just <Link> coz react-router doesnt support url encoding
    const handleLinkClick = (e) => {
        history.push(`/search/${encodeURIComponent(params.keywords)}/${e.target.getAttribute('data-target')}`)
        window.history.pushState(null, '', `/search/${encodeURIComponent(params.keywords)}/${e.target.getAttribute('data-target')}`)


    }
    useEffect(() => {
        const search = async () => {

            const res = await axios.get(`/api/search/${params.keywords}`)
            setData(res.data)

        }

        console.log(encodeURIComponent(params.keywords))
        search()
    }, [])

    return (
        <div className={sideBarFolded ? 'container' : 'container--expanded'}>
            <SearchFilters></SearchFilters>
            <div className={styles.results}>
                <h1 className="heading--clickable"><span onClick={handleLinkClick} data-target='track'   >Tracks <FaChevronRight></FaChevronRight> </span> </h1>
                {data.tracks?.length > 0 ? <TrackList withHeader={false} tracks={data.tracks}></TrackList> : <p className={styles.notFound}>No results</p>}
                <h1 className="heading--clickable"><span onClick={handleLinkClick} data-target='artist' >Artists <FaChevronRight></FaChevronRight> </span> </h1>
                {data.artists?.length > 0 ? <ArtistList artists={data.artists} ></ArtistList> : <p className={styles.notFound}>No results</p>}

                <h1 className="heading--clickable"><span onClick={handleLinkClick} data-target='album'  >Albums <FaChevronRight></FaChevronRight> </span> </h1>
                {data.albums?.length > 0 ? <AlbumsList albums={data.albums} ></AlbumsList> : <p className={styles.notFound}>No results</p>}

                <h1 className="heading--clickable"><span onClick={handleLinkClick} data-target='playlist'  >Playlists <FaChevronRight></FaChevronRight> </span> </h1>
                {data.playlists?.length > 0 ? <PlaylistList playlists={data.playlists} ></PlaylistList> : <p className={styles.notFound}>No results</p>}

            </div>
        </div >

    )
}
export default SearchPage;