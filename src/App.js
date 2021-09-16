import { useEffect, useState } from 'react';
import Router from "./routers/AppRouter"
import { getUser } from "./store/authSlice"
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)
  const [themeName, setThemeName] = useState('light')
  useEffect(() => {
    dispatch(getUser())
    //used this instead of useSelector bcoz its causing rerenders on theme switch
    //had to remove extra double quotes too caused by redux persist maybe?
    const theme = JSON.parse(localStorage.getItem('persist:root'))?.theme?.replace(/['"]+/g, '');

    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
      setThemeName(theme)
    }
    else {
      document.documentElement.dataset.theme = "light";
    }
  }, [])
  return (
    !loading && <>
      <Router></Router>
      <ToastContainer
        autoClose={3000}
        icon={false} theme={themeName} />
    </>
  )
}

export default App;
