import styles from "../assets/styles/Card.module.scss"
import AlbumCard from "../components/AlbumCard"
const AlbumList = ({ albums }) => {

    return (
        <div className={styles.container}>
            {albums.map((album) => <AlbumCard album={album}></AlbumCard>)
            }
        </div>
    )
}
export default AlbumList;