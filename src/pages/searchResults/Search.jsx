import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
// import MovieCard from "../../components/movieCard/MovieCard";

import noResults from "../../assets/no-results.png";
import "./Search.scss"
import Spiner from "../../components/spiner/Spiner";
import MovieCard from "../../components/movieCard/MovieCard";

const Search = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();
    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
            setData(res)
            setPageNum((prev) => prev + 1)
            setLoading(false)
        })

    }

    useEffect(() => {
        setPageNum(1)
        fetchInitialData()
    }, [query])

    const nextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
            if (data?.results) {
                setData({
                    ...data, results: [...data?.results, ...res.results]
                })
            } else {
                setData(res)
            }
            setPageNum((prev) => prev + 1)
        })
    }

    return (
        <div className="searchResultsPage">
            {loading && <Spiner initial={true} />}
            {!loading && (<ContentWrapper>{
                data?.results?.length > 0 ? (
                    <>
                        <div className="pageTitle">
                            {`Search ${data?.total_results > 1 ? "Results" : "result"} of "${query}" `}
                        </div>
                        <InfiniteScroll className="content" dataLength={data?.results?.length || []} next={nextPageData}
                            hasMore={pageNum <= data?.total_pages} loader={<Spiner />}>
                            {
                                data?.results?.map((item, i) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard key={i} data={item} fromSearch={true} />
                                    )
                                })
                            }
                        </InfiniteScroll>

                    </>
                ) : (<span className="resultNotFound">Sorry, No Result</span>)
            }</ContentWrapper>)
            }
        </div >
    )
}

export default Search