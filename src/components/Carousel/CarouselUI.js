import React, {useState,useEffect} from 'react'
import { Carousel } from 'react-bootstrap'; 
import {Link} from 'react-router-dom'

const CarouselUI = ({ data }) => {
  const trendingAPi =`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
  
  const [trendingData, setTrendingData] = useState([])

  function fetchTrending() {
    fetch(trendingAPi)
    .then(res => res.json())
    .then(jsonRes => {
      setTrendingData(jsonRes.results.slice(0,5))
    })  
  }

  useEffect(() => { fetchTrending() },[])
 
  return (
    <Carousel className="carousel">
      {trendingData.map((data) =>
        <Carousel.Item style={{ height: "80vh" }}>
          <Link to={{ pathname: `/detail/${data.media_type}/${data.id}` }}>
            <img className="d-block w-100 h-100 " 
              src={"https://image.tmdb.org/t/p/w500" + data.backdrop_path}
              alt="Poster"
            />
            <Carousel.Caption>
              <h3>{data.original_title}</h3>
              <p> {data.overview} </p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      )}  
    </Carousel>
  )
}

export default CarouselUI
