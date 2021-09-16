import styles from "../assets/styles/Card.module.scss"

import { AiTwotonePlayCircle, AiTwotonePauseCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux"

import { updateQueue } from "../store/playerSlice"
import prepareQueue from '../utils/prepareQueue'
import { Link } from "react-router-dom";
const AlbumCard = ({ album, minimal }) => {
    const dispatch = useDispatch()
    const player = useSelector(state => state.player)
    const onPlay = player.currentTrack?.playedFrom === album.id && player.playing
    const onPause = player.currentTrack?.playedFrom === album.id && !player.playing

    const playAlbum = async (e, tracks) => {
        e.preventDefault();
        const playerNode = document.querySelector('audio.music-player-audio')

        if (onPlay) { playerNode.pause() }
        else if (onPause) { playerNode.play() }
        else {
            await dispatch(updateQueue(prepareQueue(tracks, album.id)))
            // playerNode.play()

        }

    }
    return (
        <div key={album.id} className={`${styles.card} ${minimal ? styles.minimal : ''}`}>
            <Link key={album.id} to={`/album/${album.id}`}>
                <img src={album.cover} alt="cover" />
                {onPlay ? <AiTwotonePauseCircle className={styles.play} onClick={(e) => playAlbum(e, album.tracks)}></AiTwotonePauseCircle>
                    : <AiTwotonePlayCircle className={styles.play} onClick={(e) => playAlbum(e, album.tracks)}></AiTwotonePlayCircle>}
            </Link>
            <div className={styles.details}>
                <p className={styles.cardTitle}>
                    <Link to={`/album/${album.id}`}  >{album.name} </Link>
                </p>
                <p className={styles.cardSubtitle}>by <Link to={`/artists/${album.artist.id}`}> {album.artist.name} </Link></p>
                <p className={`${styles.explicit} ${!album.explicit ? styles.hidden : ''}`}>EXPLICIT</p>
            </div>
        </div>
    )
}
export default AlbumCard;
