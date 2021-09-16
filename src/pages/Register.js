import { useState, useEffect } from "react";
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { toast } from 'react-toastify';

import styles from "../assets/styles/LoginPage.module.scss"
import video from "../assets/djsona.m4v"
const Register = () => {
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
            const res = await axios.post('/api/auth/register', {
                name,
                password,
                email,
                password_confirmation: passwordConfirmation
            });
            // console.log(res.data);
            toast.success('Account created successfully', {
                icon: false
            })
            history.push('/login')
        } catch (error) {
            console.log(Object.values(error.response.data.errors))
            setErrors(error.response.data.errors)
        }
    }
    useEffect(() => {
        if (auth.user && !auth.user.isArtist) history.push("/")
        axios.get('/sanctum/csrf-cookie').then(response => {
        }).catch(e => console.log(e))

    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>

                <h1>Register</h1>
                <div className={styles.socials} >
                    <a className={styles.facebook} href={`${process.env.API_URL || 'http://localhost:8000'}/api/auth/login/facebook`} >
                        <svg className={styles.socialIcon} fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M20 12a8 8 0 10-9.25 7.9v-5.59H8.72V12h2.03v-1.76c0-2 1.2-3.12 3.02-3.12.88 0 1.8.16 1.8.16v1.97h-1.02c-.99 0-1.3.62-1.3 1.25V12h2.22l-.36 2.31h-1.86v5.6A8 8 0 0020 12z" fill="#fff"></path></svg>
                    Facebook</a>
                    <a className={styles.google} href={`${process.env.API_URL || 'http://localhost:8000'}/api/auth/login/google`}>
                        <svg className={styles.socialIcon} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.55 13.67l-.56 2.08-2.04.04a7.96 7.96 0 01-.06-7.47l1.82.33.8 1.8a4.76 4.76 0 00.04 3.22z" fill="#FBBB00"></path><path d="M19.86 10.5a8 8 0 01-2.85 7.74l-2.28-.12-.33-2.01a4.77 4.77 0 002.05-2.44h-4.27v-3.16h7.68z" fill="#518EF8"></path><path d="M17 18.24a8 8 0 01-12.05-2.45l2.6-2.12a4.76 4.76 0 006.85 2.44l2.6 2.13z" fill="#28B446"></path><path d="M17.1 5.84l-2.59 2.12a4.76 4.76 0 00-7.01 2.5L4.9 8.31a8 8 0 0112.2-2.48z" fill="#F14336"></path></svg>
                    Google</a>
                </div>
                {errors && Object.values(errors).map(error => <p className={styles.error}>{error} </p>)
                }
                <form autoComplete="on">

                    <input name="name" onChange={(e) => setName(e.target.value)} type="text" placeholder="name" />
                    <input name="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
                    <input name="password" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                    <input name="password_confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} type="password" placeholder="confirm password" />
                    <button className="btn" onClick={registerHandler}>Register</button>
                </form>
                <p>Already a member? <Link to="/login">Log in</Link> </p>

            </div>
            <div className={styles.videoContainer}>
                <video autoPlay muted loop id="myVideo">
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}
export default Register