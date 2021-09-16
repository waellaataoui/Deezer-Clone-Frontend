import { AiTwotonePlayCircle, AiTwotonePauseCircle } from 'react-icons/ai';
import { useSelector, useDispatch } from "react-redux"
import { updateQueue } from "../store/playerSlice"
import prepareQueue from '../utils/prepareQueue'
import { Link } from "react-router-dom";
import defaultCover from "../assets/defaultPlaylist.jpg"

import styles from "../assets/styles/Card.module.scss"


const PlaylistCard = ({ playlist, minimal }) => {
    const dispatch = useDispatch()
    const player = useSelector(state => state.player)
    const onPlay = player.currentTrack?.playedFrom === playlist.id && player.playing
    const onPause = player.currentTrack?.playedFrom === playlist.id && !player.playing
    const playPlaylist = async (e, tracks) => {
        e.preventDefault();
        const playerNode = document.querySelector('audio.music-player-audio')

        if (onPlay) { playerNode.pause() }
        else if (onPause) { playerNode.play() }
        else {
            await dispatch(updateQueue(prepareQueue(tracks, playlist.id)))
            // playerNode.play()

        }
    }



    return (
        <div key={playlist.id} className={`${styles.card} ${minimal ? styles.minimal : ''}`}>
            <Link className={minimal && styles.notClickable} key={playlist.id} to={`/playlist/${playlist.id}`}>
                <img src={playlist.cover || defaultCover} alt="cover" />
                {onPlay ? <AiTwotonePauseCircle className={styles.play} onClick={(e) => playPlaylist(e, playlist.tracks)}></AiTwotonePauseCircle>
                    : <AiTwotonePlayCircle className={styles.play} onClick={(e) => playPlaylist(e, playlist.tracks)}></AiTwotonePlayCircle>}
            </Link>
            <div className={styles.details}>
                <p className={styles.cardTitle}>
                    <Link to={`/playlist/${playlist.id}`}  >{playlist.name} </Link>
                </p>
                <p className={styles.cardSubtitle}> {`${playlist.tracks_count} ${playlist.tracks_count == 1 ? 'track' : 'tracks'}`

                }  </p>
            </div>

        </div >
    )
}
export default PlaylistCard;
