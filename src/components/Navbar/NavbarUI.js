import React, {useState} from 'react'
import { Link } from "react-router-dom";

const api = "https://api.themoviedb.org/3/search/multi?query="
const NavbarUI = () => {

  const [suggestions, setSuggestions] = useState([])
  const [suggestionsBar, setSuggestionsBar] = useState(false)

  function Search(e) {
    if (e.target.value) {
      let searchApi = api + e.target.value + `&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`
      fetch(searchApi)
        .then(res => res.json())
        .then(suggestion => setSuggestions(suggestion.results.slice(0, 4)))
      setSuggestionsBar(true)
    } else {
      setSuggestionsBar(false)
    }
  }

  return (

    <div class="absolute flex flex-wrap w-screen px-4 bg-black " >
      <img class="w-24 z-50" src="https://i.postimg.cc/kXR4Dq0x/logo.png" alt="Logo" />
      <div class=" flex-grow rounded z-40 relative py-2">
        <input onChange={(e) => Search(e)} type="search" class="focus:outline-none transition duration-500 ease-in-out transform hover:scale-x-150 bg-white border-0 shadow rounded-3xl p-1" />
        <Link>
          {suggestionsBar &&
            <div class="bg-white z-45 min-w-full rounded-lg pt-2 shadow absolute right-0 ">
              {suggestions.map((suggestion => (
                <>
                  <Link to={{ pathname: `/detail/${suggestion.media_type}/${suggestion.id}` }}>
                    <div class="flex pl-2 transition duration-500 ease-in-out transform hover:translate-x-4 hover:scale-110">
                      {suggestion.poster_path ?
                        <img class="h-12 w-8 rounded" src={"https://image.tmdb.org/t/p/w500" + suggestion.poster_path} alt="poster" /> :
                        <img class="h-12 w-8 rounded" src={"data:image/png;base64,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"} alt="poster" />
                      }
                      <div class="text-left mx-2 flex-grow">
                        <div class="flex flex-col">
                          <div class="flex">
                            <div class="text-xs font-bold text-black"> {suggestion.original_name || suggestion.title} </div>
                            <div class="text-xs capitalize text-black mx-1"> ({suggestion.media_type}) </div>
                          </div>
                          <span class="text-xs text-black">Released: {suggestion.release_date || suggestion.first_air_date} </span>
                          <div class="text-xs capitalize text-black"> Rating: {suggestion.vote_average} </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <hr />
                </>
              )))}
            </div>
          }
        </Link>
      </div>
    </div>
  )
}
export default NavbarUI
