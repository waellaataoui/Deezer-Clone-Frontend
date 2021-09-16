import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import Popper from '@material-ui/core/Popper';
import { toast } from 'react-toastify';
import { addFavourite } from "../store/authSlice"

import NewPlaylistModal from "../components/NewPlaylistModal"

import styles from "../assets/styles/AddToPlaylistMenu.module.scss"
const AddToPlaylistMenu = ({ open, id, anchorEl, track, closeMenu }) => {
    const [playlists, setPlaylists] = useState([])
    const [filteredPlaylists, setFilteredPlaylists] = useState([])
    const favouriteTracks = useSelector(state => state.auth.user.favouriteTracks)
    const [openModal, setOpenModal] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch()
    const findPlaylist = (e) => {
        setFilteredPlaylists(playlists.filter(playlist => playlist.name.toLowerCase().includes(e.target.value.toLowerCase())
        ))
    }
    const handleAddToPlaylist = async (playlistId, playlistName) => {

        try {
            if (playlistId === favouriteTracks.id) {
                const res = await axios.post(`/api/favourites/loved`,
                    {
                        track: track.id
                    })
                toast.info(res.data.message, {
                    icon: false
                })
                dispatch(addFavourite(track))

                return closeMenu()

            }
            const res = await axios.post(`/api/playlists/addTracks`,
                {
                    playlistId,
                    tracks: [track.id]
                })
            toast.info(`The playlist "${playlistName}" has been updated`, {
                icon: false
            })
        } catch (error) {
            console.log(error)
        
        
            toast.info(error.response.data.message, {
                icon: false
            })
        }
        closeMenu()

    }
    const handleModalClose = (playlist, showAlert) => {
        setOpenModal(false)
        if (playlist) {
            toast.info('A new playlist has been created', {
                icon: false
            })
            history.push(`/playlist/${playlist.id}`)
        }
        else if (showAlert) toast.error('An error has occured')

    }

    useEffect(() => {
        const fetchUserPlaylists = async () => {
            const res = await axios.get(`/api/playlists/mine`)
            setPlaylists(res.data)
            setFilteredPlaylists(res.data)
        }
        if (open) fetchUserPlaylists()
    }, [open])
    return (

        <Popper className={styles.container} placement="left" id={id} open={open} anchorEl={anchorEl}>
            <div className={styles.menu}>

                <input onChange={findPlaylist} type="text" placeholder="Search" />
                <ul className={styles.playlists}>
                    <li onClick={() => setOpenModal(true)} className={styles.new}> <span> + </span>New Playlist</li>
                    {filteredPlaylists?.map((playlist) => (<li onClick={() => handleAddToPlaylist(playlist.id, playlist.name)} key={playlist.id}>{playlist.name}</li>))}
                </ul>
            </div>
            <NewPlaylistModal open={openModal} onClose={handleModalClose} trackId={track.id} />

        </Popper>

    )
}
export default AddToPlaylistMenu