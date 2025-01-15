import React from 'react'
import { GifState } from '../context/GifContext'
import { useState, useEffect } from 'react'
import Gif from '../components/Gif'

const Favourites = () => {
  const [favouritesGIFs, setFavouritesGIFs] = useState([])
  const {gf,favourites} = GifState()
  const fetchFavouritesGIFs = async () => {
    const {data : gifs} = await gf.gifs(favourites)
    setFavouritesGIFs(gifs)
  };
  useEffect(() => {
    fetchFavouritesGIFs()
  }, [])
  return (
    <div className='mt-2'>
      <span className='faded-text'>
        My Favourites

      </span>
      <div className='columns-2 md:columns-3 lg:columns-4 gap-2 xl:columns-5 mt-2'>
        {favouritesGIFs.map((gif) => (
          <Gif key={gif.id} gif={gif} />

        ))}
      </div>

    </div>
  )
}

export default Favourites