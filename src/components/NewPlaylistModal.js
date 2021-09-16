import { useState, useEffect } from 'react'
import axios from "axios"
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import genresList from "../assets/genres.json"

const NewPlaylistModal = ({ onClose, open, trackId }) => {
    const genresSuggestions = genresList.map(genre => genre.title)
    const [genres, setGenres] = useState([])
    const [name, setName] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [description, setDescription] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`/api/playlists`, {
                name,
                description,
                private: isPrivate,
                tags: genres
            })
            await axios.post(`/api/playlists/addTracks`,
                {
                    playlistId: res.data.id,
                    tracks: [trackId]
                })
            onClose(res.data)
        } catch (error) {
            console.log(error)
            onClose(null, true)
        }

    }
    const handleClose = () => {
        onClose()
    };

    const onGenresChange = (e, value) => {
        setGenres(value)
    }

    const onPrivateChange = (e) => {
        setIsPrivate(e.target.value === 'true')
    }
    useEffect(() => {

    }
        , [])
    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit} className="form modal">
                <button type="button" className="close-modal" onClick={handleClose}>x</button>

                <div className="labeled-input">
                    <label htmlFor="name">
                        Name
    </label>
                    <input onChange={(e) => setName(e.target.value)} type="text" />
                </div>
                <div className="labeled-input">
                    <label htmlFor="private">
                        Private
    </label>
                    <label className="checkcontainer">
                        <span>yes</span> <input onChange={onPrivateChange} value={true} type="radio" name="private" />
                        <span className="radiobtn"></span>
                    </label>
                    <label className="checkcontainer">
                        <span>no</span> <input onChange={onPrivateChange} value={false} type="radio" name="private" defaultChecked={true} />
                        <span className="radiobtn"></span>
                    </label>
                </div>

                <div id="autocomplete-wrapper">
                    <label htmlFor="genres">Genres</label>
                    <Autocomplete
                        id="autocomplete"
                        multiple
                        options={genresSuggestions}
                        onChange={onGenresChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                placeholder=""
                            />
                        )}
                    />
                </div>
                <div className="labeled-input">
                    <label htmlFor="description">
                        Description
    </label>
                    <textarea onChange={(e) => setDescription(e.target.value)} type="text" />
                </div>
                <button className="btn center" type="submit">Create</button>

            </form>
        </Dialog>

    )
}
export default NewPlaylistModal;