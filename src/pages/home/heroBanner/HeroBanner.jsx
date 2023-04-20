import React, { useEffect, useState } from 'react'
import "./HeroBanner.scss"
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../hooks/useFetch'
import { useSelector } from 'react-redux'
import Img from '../../../components/lazyloadImage/Img';

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
const HeroBanner = () => {

    const [bghero, setBghero] = useState("")
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const { url } = useSelector((state) => state.home)
    const { data, loading } = useFetch("/movie/upcoming")

    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBghero(bg)
    }, [data])


    const searchQueryHandle = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }

    return (
        <>
            <div className="heroBanner">
                <div className="backdrop_img">
                    {!loading && <Img src={bghero || ""} />}
                </div>
                <div className="opacity_layer"></div>
                <ContentWrapper>
                    <div className="heroBannerContent">
                        <span className='title'>Welcome</span>
                        <span className='Subtitle'>Millions of Movies, TV Show Are One Places MovieWale</span>
                        <div className="searchInput">
                            <input type="text" placeholder='Search movies, TV show and More ....'
                                onChange={e => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandle} />
                            <button>Search</button>
                        </div>

                    </div>
                </ContentWrapper>
            </div>
        </>
    )
}

export default HeroBanner