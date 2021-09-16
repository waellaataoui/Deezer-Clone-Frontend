import { useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { useHistory } from "react-router-dom"

import styles from "../assets/styles/SearchBar.module.scss"
import axios from "axios"
import debounce from '../utils/debounce'
const SearchBar = ({ compact }) => {
    const [keywords, setKeywords] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const history = useHistory();

    const handleChange = async (e) => {
        setKeywords(e.target.value);
        const res = await axios.get(`/api/search/autocomplete?keywords=${e.target.value}`)
        setSuggestions(res.data)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!keywords) return;
        history.push(`/search/${encodeURIComponent(keywords)}`)
        //because react-router doesnt support url encoding
        window.history.pushState(null, '', `/search/${encodeURIComponent(keywords)}`)
    }
    const handleClick = (e) => {
        history.push(`/search/${encodeURIComponent(e.target.innerText)}`)
        window.history.pushState(null, '', `/search/${encodeURIComponent(e.target.innerText)}`)

    }
    return (
        <form onSubmit={handleSubmit} className={`${styles.searchForm} ${compact && styles.compact}`}>
            {!compact && <button>
                <FaSearch></FaSearch>
            </button>}
            <input onChange={debounce(handleChange, 500)} className={styles.searchBar} placeholder="Search" type="text" />
            {suggestions.length > 0 && <div key={suggestions} className={styles.results}>
                {suggestions.map(suggestion => <div key={suggestion} onClick={handleClick}> {suggestion} </div>)}
            </div>}
        </form>
    )
}
export default SearchBar;