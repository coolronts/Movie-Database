import React, { useState, useEffect } from 'react'
import CardUI from '../../CardsCarousel/Card/CardUI'

const Dropdown = ({ data,match }) => {
  
 let api = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=`

 const [active, setActive] = useState(28)
 const [lists, setLists] = useState([])
 const [isLoading, setIsLoading] =useState(false)
 
 function renderItem() {
   return (
      <>
        {data.map((genre) => ((active == genre.id) ?
          <button onClick={getGenreID} key={genre.id} value={genre.id} class='my-2 mx-1 p-2 bg-red-800 shadow-2xl text-white ring-4 ring-red-900 font-bold rounded-lg'>{genre.name}</button> : 
          <button onClick={getGenreID} key={genre.id} value={genre.id} class='my-2 mx-1 p-2 bg-red-700 text-white font-semibold rounded-lg'>{genre.name}</button> 
        ))}
     </>
   )
  }
  
  function getGenreID(e) {
    setActive(e.target.value)
    fetchGenreList()
    renderItem()
    tabsDetail()
  }
 
  function tabsDetail() {
   return (!isLoading &&
      <>
        <div class="flex flex-wrap justify-center mb-1 ">
          {lists.map(list => (
            <div class="m-3 rounded-2xl transition transform hover:-translate-y-3 hover:shadow-3xl motion-reduce:transition-none motion-reduce:transform-none">
              <CardUI item={list} media_type={"movie"} />
            </div>
          ))}
       </div>
      </>
    )
  }
 
  function fetchGenreList() {
    const genreListApi = api + active + "&page=1"
    setIsLoading(true)
    fetch(genreListApi)
    .then(res => res.json())
    .then(genreList => {
      setLists(genreList.results)
    })  
    setIsLoading(false)
  }

  useEffect(() => {
    fetchGenreList(active)
    tabsDetail()
  }, [lists])
  
  return (
    <div class='mx-3'>
      {renderItem()}
      {tabsDetail()}
    </div>
  )
}

export default Dropdown
