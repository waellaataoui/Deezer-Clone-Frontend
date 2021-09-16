import styles from "../assets/styles/Card.module.scss"

import PlaylistCard from "./PlayListCard";
const PlaylistList = ({ playlists }) => {


    return (
        <div className={styles.container}>
            {playlists.map((playlist) => <PlaylistCard key={playlist.id} playlist={playlist}></PlaylistCard>)
            }
        </div>
    )
}
export default PlaylistList;