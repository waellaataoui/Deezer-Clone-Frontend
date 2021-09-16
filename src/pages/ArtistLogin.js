import { useState, useEffect } from "react";
import axios from "axios"
import { useHistory, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/authSlice"
import styles from "../assets/styles/ArtistLoginPage.module.scss"
const ArtistLogin = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const loginHandler = async (e) => {
        e.preventDefault();
        dispatch(login({ email, password })).then(res => {
            // redirect!!
            if (!res.error) history.push('/artist')

        })
        // const res = await axios.post('/logout')
        // const res = await axios.post('/artist/register', {
        //     name: 'wael', password: '12345678', email,
        //     password_confirmation: '12345678'
        // });
        // console.log(res.data)
    }
    useEffect(() => {
        if (auth.user && auth.user.isArtist) history.push("/artist")
        axios.get('/sanctum/csrf-cookie').then(response => {
        }).catch(e => console.log(e))

    }, [])
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>

                <h1>Login</h1>

                <p className={styles.error}>{auth.loginError} </p>
                <form autoComplete="on">
                    <input value={email} name="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" />
                    <input name="password" onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
                    <button className="btn" disabled={auth.loginLoading} onClick={loginHandler}>Login</button>
                </form>
                <p>Not registered yet? <Link to="/artist/register">Sign up</Link> </p>
            </div>
            <div className={styles.imageBackground}>
            </div>
        </div>
    )
}
export default ArtistLogin