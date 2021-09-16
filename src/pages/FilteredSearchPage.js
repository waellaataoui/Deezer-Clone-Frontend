import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from "../assets/styles/SearchPage.module.scss"
import SearchFilters from '../components/SearchFilters';
import TrackList from '../components/TrackList';
import ArtistList from '../components/ArtistList';
import AlbumList from '../components/AlbumList';
import PlaylistList from '../components/PlaylistList';
const FilteredSearchPage = () => {
    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState({}) //later populate attributes 
    const sideBarFolded = useSelector(state => state.settings.sideBarFolded)
    const renderResults = () => {
        switch (params.filter) {
            case "track": return <TrackList withHeader={true} tracks={data.data}></TrackList>
            case "artist": return <ArtistList artists={data.data}></ArtistList>
            case "album": return <AlbumList albums={data.data}></AlbumList>
            case "playlist": return <PlaylistList playlists={data.data}></PlaylistList>
        }
    }
    const search = async () => {
        const res = await axios.get(`/api/search/${params.keywords}/${params.filter}?page=${currentPage}`)
        console.log(res.data);
        if (currentPage == 1)
            setData(res.data)
        else {
            let previousData = data.data
            setData({ ...res.data, data: [...previousData, ...res.data.data] })
        }
        setCurrentPage(currentPage + 1)

    }
    useEffect(() => {

        search()
    }, [])
    return (
        <div className={sideBarFolded ? 'container' : 'container--expanded'}>
            <SearchFilters></SearchFilters>
            <div className={styles.results}>
                {data.meta && <h1 className={styles.count}>{`${data?.meta?.total} ${params.filter}s`}</h1>}
                {data.data &&
                    <InfiniteScroll
                        dataLength={data.data.length}
                        next={search}
                        hasMore={!(data.meta.current_page == data.meta.last_page)}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            currentPage !== 2 && <p className={styles.endResults}>
                                Yay! You have seen it all
                            </p>
                        }

                    >
                        {renderResults()}
                    </InfiniteScroll>
                }
            </div>
        </div>


    )
}
export default FilteredSearchPage;