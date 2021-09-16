import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { FaChevronRight } from 'react-icons/fa';
import genres from "../assets/genres.json"
import styles from "../assets/styles/ExplorePage.module.scss"
import shadeColor from "../utils/shadeColor"
function ExplorePage() {
    const sideBarFolded = useSelector(state => state.settings.sideBarFolded)




    return (
        <div className={sideBarFolded ? 'container' : 'container--expanded'}>
            <h1 className="heading"> Genres      </h1>
            <div className={styles.grid}>

                {genres.map(genre => (<div className="carousel-card"
                    style={{
                        background: genre.background,
                        background: `linear-gradient(to right, ${genre.background}, ${shadeColor(genre.background, 60)})`
                    }
                    }>
                    <Link to={`/explore/${genre.title}`}>{genre.title} </Link>
                </div>))}
            </div>

        </div>
    );
}

export default ExplorePage;
