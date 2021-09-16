import { useState, useEffect, Suspense } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaChevronRight } from 'react-icons/fa';
import AlbumCard from "../components/AlbumCard"
import Loader from "../components/Loader"
import PlayListCard from "../components/PlayListCard"
import Carousel from "../components/Carousel"
import genres from "../assets/genres.json"
import shadeColor from "../utils/shadeColor"
function HomePage() {
    const sideBarFolded = useSelector(state => state.settings.sideBarFolded)
    const [latest, setLatest] = useState(null)
    const [popPlaylists, setPopPlaylists] = useState(null)

    const getLatest = async () => {
        const res = await axios.get('/api/albums/latest');
        setLatest(res.data.data)
    }
    const getPopPlaylists = async () => {
        const res = await axios.get(`/api/playlists?tags=pop`);
        setPopPlaylists(res.data.data)
    }
    useEffect(() => {
        getLatest()
        getPopPlaylists()
    }, [])


    return (
        <div className={sideBarFolded ? 'container' : 'container--expanded'}>

            {latest ? <Carousel title={{ text: "New Releases" }}>

                {latest.map(elem => <AlbumCard key={elem.id} album={elem}> </AlbumCard>)}

            </Carousel> : <Loader></Loader>}
            {popPlaylists ? <Carousel title={{ text: "Top Pop" }}>

                {popPlaylists.map(elem => <PlayListCard key={elem.id} playlist={elem}> </PlayListCard>)}

            </Carousel> : <Loader></Loader>}
            {
                <Carousel title={{ text: 'Genres', isLink: true, to: '/explore' }}>
                    {
                        genres.slice(0, 11).map(genre => (<div key={genre} className="carousel-card"
                            style={{
                                background: genre.background,
                                background: `linear-gradient(to right, ${genre.background}, ${shadeColor(genre.background, 60)})`
                            }
                            }>
                            <Link to={`/explore/${genre.title}`}>{genre.title} </Link>
                        </div>)).concat(<div className="carousel-card view-all">
                            <h1 className="heading--clickable">
                                <Link to={'/explore#'}>View all <FaChevronRight></FaChevronRight> </Link>

                            </h1>
                        </div>)

                    }


                </Carousel>
            }
        </div>
    );
}

export default HomePage;
