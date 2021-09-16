import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "../components/Loader"
import Toolbar from "../components/Toolbar"
import AlbumCard from "../components/AlbumCard"
import TrackList from "../components/TrackList"
import defaultAvatar from "../assets/sam.jpg"
import styles from "../assets/styles/DetailsPage.module.scss"
import { formatTotalDuration } from "../utils/formatDuration"

function AlbumPage() {
    const params = useParams();
    const sideBarFolded = useSelector(state => state.settings.sideBarFolded)
    const [album, setAlbum] = useState(null)
    const totalDuration = () => {
        return formatTotalDuration(album.tracks.reduce((prev, current) => prev + current.duration
            , 0))

    }
    useEffect(() => {

        const fetchAlbum = async () => {
            const res = await axios.get(`/api/albums/${params.id}`)
            setAlbum(res.data.data)
        }
        fetchAlbum()


    }, [])
    return (
        <div className={sideBarFolded ? 'container' : 'container--expanded'}>

            {album ? <>
                <div className={styles.highlights}>
                    <AlbumCard album={album} minimal={true}></AlbumCard>
                    <div className={styles.infos}>
                        <h1 className="heading">{album.name} </h1>
                        <div className={styles.creator}>
                            <img src={album.artist.avatar || defaultAvatar} alt="avatar" />
                            <Link to={`/artists/${album.artist.id}`}>{album.artist.name} </Link>
                        </div>
                        {/* <p className={styles.description}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, doloremque.</p> */}
                        <p className={styles.details}>
                            <span>
                                {`${album.tracks.length} ${album.tracks.length == 1 ? 'track' : 'tracks'}`}
                            </span>
                            <span>

                                {` - ${totalDuration()}`}
                            </span>
                            <span>{`- Released: ${new Date(album.release_date).toLocaleDateString("en-US")}`} </span>
                        </p>
                    </div>
                </div>
                <Toolbar data={album}></Toolbar>
                <TrackList withHeader={true} isAlbum={true} tracks={album.tracks} playedFrom={album.id}></TrackList>
            </> : <Loader></Loader>}

        </div>
    );
}

export default AlbumPage;
