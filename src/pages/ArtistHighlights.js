import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom"

import axios from "axios"
import styles from "../assets/styles/ProfileHighlights.module.scss"
import ProfileHeader from "../components/ProfileHeader"
import AlbumList from "../components/AlbumList"
const ArtistHighlights = () => {
    const params = useParams()
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const sideBarFolded = useSelector(state => state.settings.sideBarFolded)

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const res = await axios.get(`/api/artists/${params.id}/albums`)
                setData(res.data.data)
            } catch (error) {
                if (error.response.status === 404) setError('Artist Not Found')
            }
        }
        fetchAlbums()
    }, [])

    return (
        <div className={sideBarFolded ? 'container' : 'container--expanded'}>
            {!error ? <>
                <ProfileHeader artist={true}></ProfileHeader>
                <div className={styles.results}>
                    <h1 className="heading">Releases :</h1>
                    <AlbumList albums={data}></AlbumList>
                </div>
            </> : <p className="notFound">{error} </p>}
        </div >

    )
}
export default ArtistHighlights;