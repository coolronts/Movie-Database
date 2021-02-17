import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Scrollbars } from 'react-custom-scrollbars'
import CardUI from '../components/CardsCarousel/Card/CardUI'

const styles = {
 trailerOn: "opacity-100 h-screen w-screen",
 trailerOff: "opacity-0",
}

const api = "https://api.themoviedb.org/3/"

const Detail = ({ match }) => {

  const [url, setUrl] = useState([])
  const [ytUrl, setYtUrl] = useState([])
  const [data, setData] = useState([])
  const [castData, setCastData] = useState([])
  const [toggleTrailer, setToggleTrailer] = useState(false)
  const [tooltip, setTooltip] = useState(false)
  const [tooltipName, setTooltipName] = useState([])
  const [actorData, setActorData] = useState([])
  const [recommendationData, setRecommendationData] = useState([])
  const [videoData, setVideoData] =useState([])

  
  function Movie(movieId) {
    const movieApi = api + match.params.mediaType + "/" + movieId + `?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    fetch(movieApi)
    .then(res => res.json())
    .then(movie => {
      setData(movie)
      MovieCast(movieId)
    })
  }

  function MovieCast(movieId) {
    const movieCastApi = api + match.params.mediaType + "/" + movieId + `/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    fetch(movieCastApi)
    .then(res => res.json())
    .then(cast => {
      setCastData(cast.cast)
    })
  }

  function Trailer() {
    let videoApi = api + match.params.mediaType + "/" + match.params.movieId +`/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    fetch(videoApi)
    .then(res => res.json())
      .then(video => setVideoData(video.results))
  
  if(videoData.length>0){ setUrl( "https://www.youtube.com/watch?v="+ videoData[0].key) }
    setToggleTrailer(true)
  }
  
  function actorDetails(personId) {
    const personApi = api + "person/" + personId + `?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    fetch(personApi)
    .then(res => res.json())
    .then(person => {
      setActorData(person)
    })
  }
 
  function Recommendation(id) {
    const recommendationApi = api + match.params.mediaType + "/" + id + `/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    fetch(recommendationApi)
    .then(res => res.json())
    .then(recommendations => {
      setRecommendationData(recommendations.results)
    })
    if (recommendationData.length < 1) {
      let trendingTVShowsApi = `https://api.themoviedb.org/3/trending/tv/day?api_key=${process.env.REACT_APP_API_KEY}`
      fetch(trendingTVShowsApi)
      .then(res => res.json())
      .then(tvShows => {
          setRecommendationData(tvShows.results)
      })  
    }
  }
  useEffect(() => {
    Movie(match.params.movieId)
    MovieCast(match.params.movieId)
    Recommendation(match.params.movieId)
    Trailer();
    setToggleTrailer(false)
  }, [match.params.movieId, ytUrl])

  return (
    <div class="bg-gray-800 h-full">
      {toggleTrailer ?
        <div className='player-wrapper' class={styles.trailerOn}>
          <button onClick={()=>setToggleTrailer(false)} class="my-6 ring-4 text-white ring-red-500  bg-red-700 px-6 py-2 rounded-lg font-bold">Close</button>
          <div class="flex h-full  bg-gray-800 ">
            <div class="w-1/6" /> 
            <ReactPlayer
              className='react-player'
              url={url}
              width='100%'
              height='100%'
            />
            <div class="w-1/6" />
          </div>
        </div> :
        <>
          {(data.backdrop_path || data.poster_path) ?
            <img src={"https://image.tmdb.org/t/p/w500" + (data.backdrop_path || data.poster_path)} class="text-white bg-cover w-screen h-screen" alt="as" />
            : <img src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKPOYAEaqyXZvza3f_gBy6A8di3TN7V25MQ&usqp=CAU"} class="text-white bg-cover w-screen h-screen" alt="as" />
        
          }
            <div class="absolute inset-0 h-screen w-screen flex">
            <div class="w-full flex flex-col justify-center ml-5">
              <div class="flex overflow-hidden flex-col my-4 px-3 border-l-8 text-white text-left">
                <p class=" text-4xl font-bold text-white "> {data.original_title || data.name} </p>
                <p class="font-semibold text-white my-4 text-justify"> {data.overview} </p>
                <p class="font-bold text-xl text-center ">Casting</p>
                <Scrollbars style={{  height: 200 }}>
                <div class="flex flex-wrap pr-2 mb-2 flex-grow overflow-auto">
                  {castData&& castData.map(cast => (cast.profile_path &&
                    <>
                      <div class="mx-2 ">
                        <img onMouseEnter={(e) => { actorDetails(cast.id); setTooltipName(cast.name); setTooltip(true) }} onMouseLeave={() => setTooltip(false)} src={"https://image.tmdb.org/t/p/w500" + cast.profile_path} class=" transition transform hover:-translate-y-0  hover:scale-60 hover:shadow-3xl motion-reduce:transition-none motion-reduce:transform-none mx-1 my-2 rounded-full h-8 w-8" alt="as" />
                      </div>
                    </>
                  ))}
                  </div>
                  </Scrollbars>
                <div class="flex flex-wrap">
                  <button onClick={Trailer} class="mx-2 my-2 ring-4 text-white ring-red-500 ring-opacity-50 bg-red-800 px-6 py-2 rounded-lg font-bold" href="#trailer">Watch Trailer</button>
                  <button class="mx-2 my-2 ring-4 ring-red-500 ring-opacity-50 bg-red-800 px-6 py-2 rounded-lg font-bold">Add to Favorite</button>
                </div>
              </div>
            </div>
            <div class="w-full h-screen flex flex-col justify-end">
              {castData&& castData.map(cast => (cast.profile_path && tooltip && tooltipName === cast.name) &&
                <>
                  <div class="w-full flex opacity-80 bg-gray-900 p-4 border-l-8 border-red-700 rounded-lg mb-4 mr-1 overflow-y-auto ">
                    <div class="text-center w-1/6">
                      <img class="rounded-full h-28 w-22 ring ring-8 ring-red-900" src={"https://image.tmdb.org/t/p/w500" + cast.profile_path} alt="pro_pic" />
                      <p class="text-white text-lg mt-2 font-bold "> {actorData.name} </p>
                    </div>
                    <div class="w-full flex flex-col justify-start ml-6" >
                      <p class="text-white text-xs text-justify overflow-ellipsis overflow-hidden"> {actorData.biography} </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <>
            <h3 class="text-red-600 mt-6 text-4xl font-bold border-b-4 mx-28 py-6 my-12">Recommended</h3>
            <div class="flex flex-wrap justify-center mb-1 ">
              {recommendationData&& recommendationData.map(list => (
                <div class="m-3 rounded-2xl transition transform hover:-translate-y-3 hover:shadow-3xl motion-reduce:transition-none motion-reduce:transform-none">
                  <CardUI item={list} media_type={"movie"} />
                </div>
              ))}
            </div>
          </>
        </>
      }
    </div>
  )
}

export default Detail
