import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import axios from "axios"
import * as yup from 'yup';

import { useSelector } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TrackModal from "../components/TrackModal"
import genresList from "../assets/genres.json"
function UploadPage() {
    const history = useHistory();
    const sideBarFolded = useSelector(state => state.settings.sideBarFolded)
    const user = useSelector(state => state.auth.user)
    const [audioUploadFailed, setAudioUploadFailed] = useState(false)
    const [audioSources, setAudioSources] = useState([])
    const [imageSource, setImageSource] = useState(null)
    const genresSuggestions = genresList.map(genre => genre.title)
    const [genres, setGenres] = useState([])
    const [name, setName] = useState("")
    const [explicit, setExplicit] = useState(false)
    const [single, setSingle] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [trackIndex, setTrackIndex] = useState(null)
    const [selectedTrack, setSelectedTrack] = useState(null)
    let formSchema = yup.object().shape({
        name: yup.string().required("please provide a name"),
        cover: yup.string().required("please upload the album's cover "),
        genres: yup.array().required().min(1, "please select at least one genre"),
        source: yup.array().required().min(1, "please upload the audio file(s)"),

    });
    const [errors, setErrors] = useState({})
    const [widget, setWidget] = useState(window.cloudinary?.createUploadWidget({
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: "music-source",
        sources: ['local', 'google_drive'],
        thumbnails: false,
        maxFileSize: 30000000, //30mb,
        clientAllowedFormats: ['mp3', 'm4a', 'wav', 'aac'],
        showUploadMoreButton: false,
        multiple: !single,
        buttonClass: "upload-btn",
        imageMetadata: true

    },
        (error, result) => {
            if (!error && result.event === "queues-end") {

                let sources = [];
                for (let i = 0; i < result.info.files.length; i++) {
                    const file = result.info.files[i];
                    if (file.failed) {
                        setAudioUploadFailed(true)
                        setAudioSources([])
                        break;
                    }
                    else {
                        sources = [...sources,
                        {
                            url: file.uploadInfo.url,
                            public_id: file.uploadInfo.public_id,
                            deleteToken: file.uploadInfo.delete_token,
                            fileName: file.uploadInfo.original_filename,
                            duration: file.uploadInfo.duration
                        }]
                    }

                }
                if (!audioUploadFailed) setAudioSources(sources)
            }
        })
    )
    const deleteAudio = async (e) => {
        e.stopPropagation()
        const token = e.target.getAttribute("deletetoken")
        try {
            await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/delete_by_token`, {
                method: "POST",
                mode: "cors",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            }
            )
            setAudioSources(audioSources.filter(source => source.deleteToken != token))
        } catch (error) {
            console.log(error);
        }
    }
    const deleteCurrentSources = () => {
        audioSources.forEach(async (source) => {
            try {
                await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/delete_by_token`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: source.deleteToken })
                }
                )
            } catch (error) {
                console.log(error);
            }
        })
        setAudioSources([])
    }
    const deletCurrentImageSource = async () => {
        if (imageSource)
            try {
                await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/delete_by_token`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: imageSource.deleteToken })
                }
                )
            } catch (error) {
                console.log(error);
            }
        setImageSource(null)
    }

    const onGenresChange = (e, value) => {
        setGenres(value)
    }

    const onExplicitChange = (e) => {
        setExplicit(e.target.value === "true")
    }
    const handleChoice = (e) => {
        setSingle(e.target.htmlFor === 'single')
        widget.update({ multiple: !(e.target.htmlFor === 'single') })

    }
    const handleSubmitSingle = async (e) => {
        e.preventDefault();
        const data = {
            name,
            cover: imageSource?.url,
            genres,
            source: audioSources
        }
        formSchema.validate(data, { abortEarly: false }).then(
            async valid => {

                const res = await axios.post('/api/artist/album/single', {
                    ...data,
                    explicit,
                    source: audioSources[0].url,
                    source_id: audioSources[0].public_id,
                    cover_id: imageSource?.public_id,
                    duration: Math.floor(audioSources[0].duration),
                })
                console.log(res);
                history.push('/artist')
            })

            .catch(errors => {
                let schemaErrors = {}
                errors.inner?.forEach(err => {
                    schemaErrors[err.path] = err.message
                });
                console.log(errors);
                setErrors(schemaErrors)
            })

    }

    const handleSubmitAlbum = (e) => {
        e.preventDefault();
        console.log(explicit);
        setErrors({})
        const data = {
            name,
            explicit,
            cover: imageSource?.url,
            genres,
            source: audioSources
        }

        formSchema.validate(data, { abortEarly: false }).then(
            async valid => {
                console.log(valid);
                let tracks = []
                for (let i = 0; i < audioSources.length; i++) {
                    const track = audioSources[i];
                    if (track.name && track.genres) tracks.push({
                        name: track.name,
                        genres: track.genres,
                        explicit: track.explicit,
                        url: track.url,
                        public_id: track.public_id,
                        duration: Math.floor(track.duration)
                    })
                    else {
                        setErrors({ tracksInfos: 'please fill in each track information' })
                        return;
                    }


                }
                const res = await axios.post('/api/artist/album/', {
                    ...data,
                    cover_id: imageSource?.public_id,
                    tracks
                })
                history.push('/artist')

            })

            .catch(errors => {
                let schemaErrors = {}
                errors.inner?.forEach(err => {
                    schemaErrors[err.path] = err.message
                });
                console.log(errors);
                setErrors(schemaErrors)
            })

    }
    const handleOpenModal = (e) => {
        setTrackIndex(e.target.getAttribute('data-index'))
        setSelectedTrack(audioSources[e.target.getAttribute('data-index')])
        setOpenModal(true)
    }
    const handleModalClose = (trackInfos) => {
        setOpenModal(false)
        if (trackInfos) {
            let tracks = audioSources;
            tracks[trackIndex] = { ...tracks[trackIndex], ...trackInfos }
            setAudioSources(tracks)
        }
    }
    useEffect(() => {
        if (!user || !user.isArtist) history.push('/artist')
        var imageWidget = window.cloudinary?.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: "image-source",
            sources: ['local', 'google_drive'],
            thumbnails: "false",
            maxFileSize: 10000000, //10mb,
            clientAllowedFormats: ['png', 'jpg', 'jpeg'],
            showUploadMoreButton: false,
            multiple: false,
            buttonClass: "image-upload-btn"
        },
            (error, result) => {
                if (!error && result.event === "success") {
                    console.log(result);
                    console.log("state", imageSource);

                    setImageSource({
                        public_id: result.info.public_id,
                        deleteToken: result.info.delete_token,
                        url: result.info.url
                    })
                    document.getElementById("image_replace")?.addEventListener(
                        "click",
                        function () {
                            imageWidget.open()
                        },
                    );

                }


            })
        document.getElementById("image_upload_widget").addEventListener(
            "click",
            function () {
                imageWidget.open();
            },
        );

    }, [])

    return (
        <div className={sideBarFolded ? 'container' : 'container--expanded'}>

            <div className="two-columns">
                <div className="image-upload-wrapper">
                    <div style={imageSource ? {
                        background: `url(${imageSource.url}) no-repeat center`,
                        // backgroundSize: 'contain'
                        backgroundSize: 'cover'
                    } : {}} className="image-thumbnail">
                        <div
                            //  onClick={deleteCurrentSources} 
                            id="image_upload_widget" className={!imageSource ? 'image-upload-btn' : 'image-upload-btn hidden'}>Upload image</div>
                    </div>
                    {imageSource ? <button className="upload-btn" onClick={deletCurrentImageSource} id="image_replace">replace</button> : null}
                    <p className="error"> {errors.cover} </p>

                </div>

                <form className="form">
                    <div onClick={handleChoice} className="choice-wrapper">
                        <label htmlFor='single' className={single ? 'selected' : ''}>Single</label>
                        <label htmlFor='album' className={!single ? 'selected' : ''}>Album</label>
                    </div>
                    <div className="labeled-input">
                        <p className="error"> {errors.name} </p>
                        <label htmlFor="name">
                            Name
    </label>
                        <input className={errors.name && 'invalid'} onChange={(e) => setName(e.target.value)} type="text" />
                    </div>
                    <div className="labeled-input">
                        <label htmlFor="explicit">
                            Explicit
    </label>
                        <label className="checkcontainer">
                            <span>yes</span> <input onChange={onExplicitChange} value={true} type="radio" name="explicit" />
                            <span className="radiobtn"></span>
                        </label>
                        <label className="checkcontainer">
                            <span>no</span> <input onChange={onExplicitChange} value={false} type="radio" name="explicit" defaultChecked={true} />
                            <span className="radiobtn"></span>
                        </label>
                    </div>

                    <div id="autocomplete-wrapper">
                        <p className="error"> {errors.genres} </p>

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
                                    error={genres.length == 0}
                                // className={errors.genres && 'invalid'}
                                />
                            )}
                        />
                    </div>

                    <div id="audio-upload-wrapper">
                        {audioSources.length == 1 && single && <ul key={audioSources[0].public_id}
                        >{audioSources[0].fileName} <button type="button" deletetoken={audioSources[0].deleteToken} onClick={deleteAudio} className="remove">x</button> </ul>
                        }
                        {audioSources && !single &&
                            <ul>
                                <p className="error">{errors.tracksInfos} </p>

                                {audioSources.map((source, index) => <li
                                    onClick={handleOpenModal}
                                    data-index={index}
                                    key={source.public_id}
                                >{source.fileName} <button type="button" deletetoken={source.deleteToken} onClick={deleteAudio} className="remove">x</button> </li>)}
                            </ul>}
                        <p className="error">{errors.source} </p>
                        <div onClick={() => {
                            deleteCurrentSources()
                            widget.open()
                        }} id="audio_upload_widget" className="upload-btn"> {single ? 'Upload Track' : 'Upload Tracks'} </div>

                    </div>
                </form>
            </div>
            <button onClick={single ? handleSubmitSingle : handleSubmitAlbum} className="btn center" type="submit">submit</button>
            <TrackModal track={selectedTrack} open={openModal} onClose={handleModalClose} />

        </div>


    );
}

export default UploadPage;
