import React from 'react'
import "./Details.scss"
import useFetch from "../../hooks/useFetch"
import { useParams } from 'react-router-dom'
import DetailBanner from './detailBanner/DetailBanner'
import Cast from './cast/Cast'
import VideoSection from './videoSection/VideoSection'
import Similar from './carousel/Similar'
import Recommendation from './carousel/Recommendation'

const Details = () => {


    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
    const { data: credits, creditLoading } = useFetch(`/${mediaType}/${id}/credits`)

    return (
        <div>
            <DetailBanner data={data?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditLoading} />
            <VideoSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    )
}

export default Details