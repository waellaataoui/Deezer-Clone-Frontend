import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import { useSelector, useDispatch } from "react-redux"
import { useHistory, useLocation } from "react-router-dom"
import { useState } from "react"
import { setCurrentTrack, setPlaying } from '../store/playerSlice'

const Player = () => {
    // const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const screenWidth = window.screen.width;
    const player = useSelector(state => state.player)
    const handlePlay = (info) => {
        dispatch(setPlaying(true))
        dispatch(setCurrentTrack({
            id: info.id,
            playedFrom: info.playedFrom
        }))
    }
    const handlePause = (info) => {
        dispatch(setPlaying(false))

    }

    return (

        !["/login", "/register"].includes(location.pathname) && (!location.pathname.match('^/artist') || location.pathname.match('^/artists')) && <ReactJkMusicPlayer
            className='player'
            //this removes the undefined func calls !?
            getAudioInstance={(audio) => {
                console.log(audio)

            }}
            clearPriorAudioLists
            defaultPlayMode='orderLoop'
            playMode='orderLoop'
            onAudioPlay={handlePlay}
            onAudioPause={handlePause}
            audioLists={player.queue}
            mode={screenWidth > 500 ? 'full' : 'mobile'}
            defaultPosition={{ top: '88%', left: '80%' }}
            mobileMediaQuery='(max-width: 500px) and (orientation : portrait)'
            responsive={true} glassBg={false}
            showReload={false}
            showDownload={false}
            autoPlay={false}
            showThemeSwitch={false}
        />

    )
}
export default Player