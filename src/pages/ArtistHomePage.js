import axios from 'axios';
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useSelector } from "react-redux"
import styles from "../assets/styles/ArtistHomePage.module.scss"
import { FaUpload } from "react-icons/fa"

import AlbumCard from '../components/AlbumCard';
const ArtistHomePage = () => {
    const user = useSelector(state => state.auth.user)
    const [albums, setAlbums] = useState([])
    useEffect(() => {

        const fetchAlbums = async () => {
            const res = await axios.get(`/api/artists/${user.model_id}/albums`)
            setAlbums(res.data.data)

        }
        if (user?.isArtist) fetchAlbums()

    }, [user])
    return (


        user && user.isArtist ?
            <div className={styles.wrapper}>
                <p className={styles.welcome}> welcome back, <span>{user.name}</span></p>
                <h1 className="heading">your releases :</h1>
                {/* just render the cards (minimal) and add album's title and wrapper */}
                <div className={styles.container}>
                    {albums && albums.map(album => <div className={styles.item} key={album.id}>

                        <AlbumCard album={album} minimal={true}></AlbumCard>
                        <p> {album.name} </p>
                    </div>)}
                    <Link to="/artist/upload" className={styles.upload}>
                        <FaUpload></FaUpload>
                        <p>Upload a new album</p>
                    </Link>
                </div>
            </div>
            : <div className={styles['wrapper--guest']}>
                <h1>Amplify your voice</h1>
                <Link to='/artist/register' className='btn'>SIGN UP</Link>
                <Link to='/artist/login' className='btn outline'>LOG IN</Link>
            </div>




    )
}
export default ArtistHomePage;