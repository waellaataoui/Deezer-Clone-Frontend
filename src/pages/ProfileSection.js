import { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from "../assets/styles/SearchPage.module.scss"
import Toolbar from "../components/Toolbar"

import TrackList from '../components/TrackList';
import ArtistList from '../components/ArtistList';
import AlbumList from '../components/AlbumList';
import PlaylistList from '../components/PlaylistList';
import ProfileHeader from '../components/ProfileHeader';
const ProfileSection = () => {
    const params = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState({}) //later populate attributes 
    const sideBarFolded = useSelector(state => state.settings.sideBarFolded)
    const user = useSelector(state => state.auth.user)
    const removeHandler = (trackId) => {
        setData({
            ...data,
            data: data.data.filter(track => track.id !== trackId),
            meta: { ...data.meta, total: data.meta.total - 1 }
        })
    }
    const renderResults = () => {
        switch (params.section) {
            case "loved": return <>
                {user && !user.isArtist && user.favouriteTracks && <Toolbar minimal={true} data={user.favouriteTracks}></Toolbar>
                }
                <TrackList playedFrom={user?.favouriteTracks?.id} withHeader={true} tracks={data.data} removeFromPlaylist={removeHandler}></TrackList>

            </>
            case "playlist": return <PlaylistList playlists={data.data}></PlaylistList>

            // case "artist": return <ArtistList artists={data.data}></ArtistList>
            // case "album": return <AlbumList albums={data.data}></AlbumList>

        }
    }
    const search = async () => {
        const res = await axios.get(`/api/favourites/${params.id}/${params.section}?page=${currentPage}`)
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
            <ProfileHeader></ProfileHeader>
            <div className={styles.results}>
                {data.meta && <h1 className={styles.count}>{`${data?.meta?.total} ${params.section === 'loved' ? 'favourite tracks' : `${params.section}s`}`}</h1>}
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
export default ProfileSection;