import { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import genresList from "../assets/genres.json"


const TrackModal = ({ onClose, open, track }) => {
    const [genres, setGenres] = useState([])
    const genresSuggestions = genresList.map(genre => genre.title)

    const [name, setName] = useState('')
    const [explicit, setExplicit] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const trackInfos = { name, explicit, genres }
        onClose(trackInfos)

    }
    const handleClose = () => {
        onClose()
    };

    const onGenresChange = (e, value) => {
        setGenres(value)
    }

    const onExplicitChange = (e) => {
        setExplicit(e.target.value === 'true')
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit} className="form modal">
                <button type="button" className="close-modal" onClick={handleClose}>x</button>

                <div className="labeled-input">
                    <label htmlFor="name">
                        Name
    </label>
                    <input defaultValue={track?.name} onChange={(e) => setName(e.target.value)} type="text" />
                </div>
                <div className="labeled-input">
                    <label htmlFor="explicit">
                        Explicit
    </label>
                    <label className="checkcontainer">
                        <span>yes</span> <input onChange={onExplicitChange} value={true} type="radio" name="explicit" defaultChecked={track?.explicit == true} />
                        <span className="radiobtn"></span>
                    </label>
                    <label className="checkcontainer">
                        <span>no</span> <input onChange={onExplicitChange} value={false} type="radio" name="explicit" defaultChecked={track?.explicit == false || track?.explicit == undefined} />
                        <span className="radiobtn"></span>
                    </label>
                </div>

                <div id="autocomplete-wrapper">
                    <label htmlFor="genres">Genres</label>
                    <Autocomplete
                        id="autocomplete"
                        multiple
                        defaultValue={track?.genres}
                        // defaultChecked={track?.genres}
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
                <button className="btn center" type="submit">Save</button>

            </form>
        </Dialog>

    )
}
export default TrackModal;