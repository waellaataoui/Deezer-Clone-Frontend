import styles from "../assets/styles/ArtistList.module.scss"
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/sam.jpg"
const ArtistList = ({ artists }) => {
    return (
        <div className={styles.container}>
            {artists.map((artist) => <div key={artist.id} className={styles.artist}>
                <Link key={artist.id} to={`/artists/${artist.id}`}>
                    <img src={artist.avatar || defaultAvatar} alt="avatar" />
                </Link>
                <Link to={`/artist/${artist.id}`} >{artist.name} </Link>
            </div>)}
        </div>
    )
}
export default ArtistList;