import { useState } from "react"
import axios from "axios"
import { toast } from 'react-toastify';
import { FaRegHeart, FaHeart, FaPlus, FaPlayCircle, FaPauseCircle, FaTrashAlt } from 'react-icons/fa';
import { Link, useHistory } from "react-router-dom";
import { formatTrackDuration } from "../utils/formatDuration"
import { updateQueue } from "../store/playerSlice"
import { addFavourite, removeFavourite } from "../store/authSlice"
import { useSelector, useDispatch } from "react-redux"
import AddToPlaylistMenu from "../components/AddToPlaylistMenu"
import ClickAwayListener from "@material-ui/core/ClickAwayListener"
import prepareQueue from '../utils/prepareQueue'
import waves from "../assets/audio waves.gif"
import styles from "../assets/styles/Track.module.scss"
const Track = ({ track, isAlbum, parentTracks,
    playedFrom, listOwner,
    removeFromPlaylist, }) => {
    const history = useHistory()
    const player = useSelector(state => state.player)
    const theme = useSelector(state => state.settings.theme)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false)
    const id = open ? 'simple-popper' : undefined;
    const onClickAway = () => {
        setOpen(false)
        setAnchorEl(null)
    };

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setOpen(!open)
    };
    const closeMenu = () => {
        setOpen(false)
    }
    const playTrack = async (track) => {
        var playerNode = document.querySelector('audio.music-player-audio')

        await dispatch(updateQueue(prepareQueue(parentTracks, playedFrom)))
        if (playerNode.currentSrc === track.source) {
            playerNode.play()
        }
        else {
            playerNode.updatePlayIndex(parentTracks.indexOf(track))
            // playerNode.playByIndex(parentTracks.indexOf(track))
        }

    }
    const pause = () => {
        const player = document.querySelector('audio.music-player-audio')
        player.pause()

    }
    const handleRemoveTrack = async () => {

        try {
            const res = await axios.post('/api/playlists/removeTracks',
                {
                    playlistId: playedFrom,
                    tracks: [track.id]
                })
            toast.info(`The playlist has been updated`, {
                icon: false
            })
            removeFromPlaylist(track.id)


        } catch (error) {
            toast.info(error.response.data.message, {
                icon: false
            })
        }
    }
    const addToFavourites = async () => {
        if (!user || user.isArtist) return history.push('/login')
        try {
            const res = await axios.post(`/api/favourites/loved`,
                {
                    track: track.id
                })
            dispatch(addFavourite(track))
            toast.info(res.data.message, {
                icon: false
            })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message, {
                
                icon: false
            })
        }
    }
    const removeFromFavourites = async () => {
        try {

            const res = await axios.delete(`/api/favourites/loved`,
                {
                    data: {
                        track: track.id

                    }
                })
            dispatch(removeFavourite(track))

            toast.info(res.data.message, {
                icon: false
            })
            if (playedFrom === user.favouriteTracks.id) removeFromPlaylist(track.id)
        } catch (error) {
            toast.error(error.response.data.message, {
                icon: false
            })
        }
    }
    return (
        <div className={`${styles.trackWrapper} 
        ${isAlbum ? styles.album : ''}
         ${track.id === player.currentTrack?.id && player.playing ? styles.playing : ''}   `}
        >
            <img className={styles.cover} src={track.album?.cover || ''} alt="" />
            <div className={styles.waves}>
                <img className={theme == 'dark' ? styles.inverted : ''} src={waves} alt="" />
            </div>
            <FaPlayCircle className={styles.play} onClick={() => playTrack(track)}></FaPlayCircle>
            <FaPauseCircle className={styles.pause} onClick={() => pause()}></FaPauseCircle>
            {user?.favouriteTracks?.tracks.find(favourite => favourite.id === track.id) ? <FaHeart onClick={removeFromFavourites} className={styles.favourite}></FaHeart> : <FaRegHeart onClick={addToFavourites} ></FaRegHeart>}
            <span className={styles.track}>
                <p onClick={() => playTrack(track)}>{track.name} </p>
                {track.explicit && <><p className={styles.explicit}>EXPLICIT</p>
                    <p className={styles.explicitAbv} title={'explicit'} >E</p>
                </>}
                {user && !user.isArtist && <div className={styles.actionButtons}>
                    <ClickAwayListener onClickAway={onClickAway}>

                        <span >
                            <AddToPlaylistMenu anchorEl={anchorEl} id={id} open={open} track={track} closeMenu={closeMenu} ></AddToPlaylistMenu>
                            <FaPlus aria-describedby={id} onClick={handleClick}></FaPlus> </span>
                    </ClickAwayListener>
                    {user.model_id === listOwner && <span> <FaTrashAlt className={styles.remove} onClick={handleRemoveTrack} ></FaTrashAlt>  </span>}

                </div>}



            </span>
            {!isAlbum && <span>
                <Link className={styles.artist} to={`/artists/${track.artist.id}`}>{track.artist.name} </Link>

            </span>}
            {!isAlbum && <span>
                <Link className={styles.album} to={`/album/${track.album.id}`}>{track.album.name} </Link>

            </span>}
            <span className={styles.duration}>{formatTrackDuration(track.duration)} </span>
        </div>
    )
}
export default Track;