import { useState, useEffect } from "react"
import axios from "axios"
import { Link, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "../components/Loader"
import Toolbar from "../components/Toolbar"
import PlayListCard from "../components/PlayListCard"
import TrackList from "../components/TrackList"
import defaultAvatar from "../assets/avatar.png"
import styles from "../assets/styles/DetailsPage.module.scss"
import { formatTotalDuration, formatPeriod } from "../utils/formatDuration"
function PlaylistPage() {
    const params = useParams();
    const [error, setError] = useState(null)
    const sideBarFolded = useSelector(state => state.settings.sideBarFolded)
    const [playlist, setPlaylist] = useState(null)
    const totalDuration = () => {
        return formatTotalDuration(playlist.tracks.reduce((prev, current) => prev + current.duration
            , 0))

    }
    const removeHandler = (trackId) => {
        setPlaylist({
            ...playlist,
            tracks: playlist.tracks.filter(track => track.id !== trackId)
        })
    }
    useEffect(() => {

        const fetchPlaylist = async () => {
            try {
                const res = await axios.get(`/api/playlists/${params.id}`)
                setPlaylist(res.data.data)
            } catch (error) {
                setError(error.response.data.message)
            }
        }
        fetchPlaylist()


    }, [])
    return (
        <div className={sideBarFolded ? 'container' : 'container--expanded'}>

            {playlist ? <>
                <div className={styles.highlights}>
                    <PlayListCard playlist={playlist} minimal={true}></PlayListCard>
                    <div className={styles.infos}>
                        <h1 className="heading">{playlist.name} </h1>
                        <div className={styles.creator}>
                            <img src={playlist.owner.avatar || defaultAvatar} alt="avatar" />
                            <Link to={`/profile/${playlist.owner.id}`}>{playlist.owner.name} </Link>
                        </div>
                        <p className={styles.description}> {playlist.description} </p>
                        <p className={styles.details}>
                            <span>
                                {`${playlist.tracks_count} ${playlist.tracks_count == 1 ? 'track' : 'tracks'}`}
                            </span>
                            <span>

                                {` - ${totalDuration()}`}
                            </span>
                            <span>{`- Updated: ${formatPeriod(playlist.updatedAt)}`} </span>
                        </p>
                    </div>
                </div>
                <Toolbar data={playlist}></Toolbar>
                <TrackList withHeader={true} tracks={playlist.tracks}
                    playedFrom={playlist.id}
                    owner={playlist.owner.id}
                    removeFromPlaylist={removeHandler}
                ></TrackList>
            </> : error ? <p className={styles.notFound}> {error}</p> : <Loader></Loader>}

        </div>
    );
}

export default PlaylistPage;
