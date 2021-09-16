import styles from "../assets/styles/TrackList.module.scss"
import trackStyles from "../assets/styles/Track.module.scss"
import Track from "./Track";
const TrackList = ({ tracks, withHeader, isAlbum, playedFrom, owner, removeFromPlaylist }) => {
    // const favouriteTracks = useSelector(state => state.auth.user.favouriteTracks.tracks)

    return (
        <div className={styles.container}>
            {withHeader && <div className={`${trackStyles.trackWrapper} ${isAlbum ? trackStyles.album : ''} ${styles.header}`}>
                <span className={styles.track}>Track</span>
                {!isAlbum && <>  <span>Artist</span>
                    <span>Album</span> </>}
                <span>L.</span>
            </div>}
            {tracks.map((track, index) =>
                <Track key={index} track={track}
                    // isFavourite={favouriteTracks.find(favourite => favourite.id === track.id)}
                    parentTracks={tracks}
                    playedFrom={playedFrom} isAlbum={isAlbum}
                    listOwner={owner}
                    removeFromPlaylist={removeFromPlaylist} ></Track>
            )
            }
        </div >
    )
}
export default TrackList;