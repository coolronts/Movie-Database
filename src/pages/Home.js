import React, { useState, useEffect } from 'react'
import CarouselUI from '../components/Carousel/CarouselUI'
import NavbarUI from '../components/Navbar/NavbarUI'
import Dropdown from '../components/UI/DropDown/Dropdown'
import CardsCarousel from '../components/CardsCarousel/CardsCarousel'

const Home = () => {

  const [trendingMovies, setTrendingMovies] = useState([])
  const [trendingTVShows, setTrendingTVShows] = useState([])
  const [genres, setGenres] = useState([])

  let trendingMoviesApi = `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
  let trendingTVShowsApi = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}`
  let genresApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  console.log(process.env)

  function fetchTrendingMovies() {
    fetch(trendingMoviesApi)
    .then(res => res.json())
    .then(movies => {
      setTrendingMovies(movies.results)
    })  
  }
  
  function fetchTrendingTVShows() {
    fetch(trendingTVShowsApi)
    .then(res => res.json())
    .then(tvShows => {
      setTrendingTVShows(tvShows.results)
    })  
  }

  function fetchGenres() {
    fetch(genresApi)
    .then(res => res.json())
    .then(listGenres=> setGenres(listGenres.genres))
  }

  useEffect(() => {
    fetchGenres()
    fetchTrendingMovies()
    fetchTrendingTVShows()
  }, [])


  return (
    <div class="bg-gray-800">
      <NavbarUI />
      <CarouselUI/>
      <h1 className="mt-6 text-red-600 font-bold border-b-4 mx-24 pb-4">Trending Movies</h1>
      <hr/>
      <div class="mx-8">
        <CardsCarousel items={trendingMovies} />
      </div>
      <h1 className="text-red-600 font-bold border-b-4 mx-24 pb-4">Trending TV Shows</h1>
      <hr/>
      <div class="mx-8">
        <CardsCarousel items={trendingTVShows} />
        <Dropdown data={genres} />
      </div>
    </div>
  )
}

export default Home