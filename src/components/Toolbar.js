import { useState } from 'react'
import { FaRegHeart, FaRegPlayCircle } from 'react-icons/fa';
import { HiDotsHorizontal } from 'react-icons/hi';
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { updateQueue } from "../store/playerSlice"
import prepareQueue from '../utils/prepareQueue'
import waves from "../assets/audio waves.gif"
import styles from '../assets/styles/Toolbar.module.scss'
const Toolbar = ({ data, minimal }) => {
    const user = useSelector(state => state.auth.user)
    const player = useSelector(state => state.player)
    const history = useHistory()
    const dispatch = useDispatch()

    const onPlay = player.currentTrack?.playedFrom === data.id && player.playing
    const onPause = player.currentTrack?.playedFrom === data.id && !player.playing

    const addToFavourites = () => {
        if (!user || user.isArtist) return history.push('/login')
        console.log('adding : ' + data.id + ' to favourties');
    }
    const handleClick = async () => {
        const playerNode = document.querySelector('audio.music-player-audio')

        if (onPlay) { playerNode.pause() }
        else if (onPause) { playerNode.play() }
        else {
            await dispatch(updateQueue(prepareQueue(data.tracks, data.id)))

        }

    }
    return (
        <div className={styles.toolbar}>
            <button onClick={handleClick} className='btn'> {onPlay ? <img className={styles.playing} src={waves} alt="playing" /> : <FaRegPlayCircle></FaRegPlayCircle>} <span>{onPlay ? 'NOW PLAYING' : onPause ? 'RESUME' : 'LISTEN'} </span></button>
            {!minimal && <>
                <span onClick={addToFavourites} className={styles.toolbarItem}> <FaRegHeart></FaRegHeart> </span>
                <span className={styles.toolbarItem}> <HiDotsHorizontal></HiDotsHorizontal> </span>

            </>}
        </div>
    )
}
export default Toolbar;