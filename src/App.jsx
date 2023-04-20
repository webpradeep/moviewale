import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './App.css'
import { fetchDataFromApi } from "./utils/api.js"
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./pages/home/Home.jsx"
import NotFound from "./pages/404/NotFound.jsx"
import Details from './pages/details/Details.jsx'
import Explore from './pages/explore/Explore.jsx'
import Search from './pages/searchResults/Search.jsx'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const dispatch = useDispatch()
  const { url } = useSelector((state) => state.home);
  console.log(url)

  const [count, setCount] = useState(0)
  useEffect(() => {
    fetchApiConfig()
    genresAll()
  }, [])
  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res)
      const url = {
        backdrop: res?.images.secure_base_url + "original",
        poster: res?.images.secure_base_url + "original",
        profile: res?.images.secure_base_url + "original",
      }
      dispatch(getApiConfiguration(url))
    })
  }

  const genresAll = async () => {
    let promises = []
    let endpoints = ["tv", "movie"]
    let allGenres = {}
    endpoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises)
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:mediaType/:id' element={<Details />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/explore/:mediaType' element={<Explore />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
