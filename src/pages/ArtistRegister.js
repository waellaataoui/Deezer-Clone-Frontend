import { useState, useEffect } from "react";
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from 'react-toastify';

import styles from "../assets/styles/ArtistLoginPage.module.scss"
const ArtistRegister = () => {
    const history = useHistory()
    const auth = useSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [errors, setErrors] = useState(null)
    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/artist/register', {
                name,
                password,
                email,
                password_confirmation: passwordConfirmation
            });
            // console.log(res.data);
            toast.success('Account created successfully', {
                icon: false
            })
            history.push('/artist/login')
        } catch (error) {
            console.log(Object.values(error.response.data.errors))
            setErrors(error.response.data.errors)
        }

    }
    useEffect(() => {
        if (auth.user && auth.user.isArtist) history.push("/artist")
        axios.get('/sanctum/csrf-cookie').then(response => {
        }).catch(e => console.log(e))

    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>

                <h1>Register</h1>

                {errors && Object.values(errors).map(error => <p className={styles.error}>{error} </p>)
                }                <form autoComplete="on">
                    <input name="name" onChange={(e) => setName(e.target.value)} type="text" placeholder="name" />
                    <input value={email} name="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
                    <input name="password" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                    <input name="password_confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} type="password" placeholder="confirm password" />

                    <button className="btn" onClick={registerHandler}>Register</button>
                </form>
                <p>Already got an account? <Link to="/artist/login">Log in</Link> </p>
            </div>
            <div className={styles.imageBackground}>
            </div>
        </div>
    )
}
export default ArtistRegister