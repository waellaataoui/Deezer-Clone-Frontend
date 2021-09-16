const prepareQueue = (tracks, playedFrom) => {
    return tracks.map(track => ({
        id: track.id,
        name: track.name,
        singer: track.artist.name,
        musicSrc: track.source,
        cover: track.album.cover,
        duration: track.duration,
        playedFrom
    }))

}
export default prepareQueue