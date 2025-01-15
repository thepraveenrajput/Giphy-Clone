import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifState } from '../context/GifContext'
import Gif from '../components/Gif'
import { HiMiniChevronUp, HiMiniChevronDown, HiMiniHeart } from 'react-icons/hi2'
import FollowOn from '../components/FollowOn'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { FaPaperPlane } from 'react-icons/fa6'
import { IoCodeSharp } from 'react-icons/io5'



const contentType = ['gifs', 'stickers', 'text']

const GifPage = () => {
  const { type, slug } = useParams()
  const [gif, setGif] = useState({})
  const [relatedGifs, setRelatedGifs] = useState([])
  const [readMore, setReadMore] = useState(false)

  const { gf, addToFavourites, favourites } = GifState()

  const shareGif = () => {
    navigator.clipboard.writeText(`https://gifs.com/${type}/${slug}`)

    


  }
  const EmbedGif = () => {
    


  }

  const fetchGif = async () => {
    const gifId = slug.split('-');
    const { data } = await gf.gif(gifId[gifId.length - 1]);
    setGif(data);

    const { data: related } = await gf.related(gifId[gifId.length - 1], {
      limit: 10,
    });
    setGif(data);
    setRelatedGifs(related);

  }

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error('Invalid content type')
    }
    fetchGif();
  }, [])

  return (
    <div className='grid grid-cols-4 my-10 gap-4'>
      <div className='hidden sm:block'>
        {gif?.user && (
          <>
            <div className='flex gap-1'>
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className='h-14' />
              <div className='px-2'>
                <div className='font-bold'>{gif?.user?.display_name}</div>
                <div className='faded-text'>@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description && (
              <p className='py-4 whitespace-pre-line text-sm text-gray-400 '>
                {!readMore ? gif?.user?.description : gif?.user?.description.slice(0, 100) + "..."}
                <div className='flex items-center faded-text cursor-pointer' onClick={() => setReadMore(!readMore)}>
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}

                </div>


              </p>
            )}



          </>

        )}

        <FollowOn />
        <div className='divider'>
          {gif?.source && (
            <div>
              <span className='faded-text'>Source</span>
              <div className='flex items-center text-sm font-bold gap-1'>
                <HiOutlineExternalLink size={25} />
                <a href={gif.source} target='_blank' className='truncate'>{gif.source}</a>

              </div>
            </div>
          )}
        </div>


      </div>

      <div className='col-span-4 sm:col-span-3'>
        <div className='flex gap-6'>
          <div className='w-full sm:w-3/4'>
            <div className='faded-text truncate mb-2'>{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* mobile ui */}
            <div className='flex sm:hidden gap-1'>
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className='h-14' />
              <div className='px-2'>
                <div className='font-bold'>{gif?.user?.display_name}</div>
                <div className='faded-text'>@{gif?.user?.username}</div>
              </div>
              <button className='ml-auto' >
                {/* // onClick={shareGif} */}
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          <div className='hidden sm:flex flex-col gap-5 mt-6'>
            <button className='flex gap-5 items-center font-bold text-lg'
              onClick={() => addToFavourites(gif.id)}>
              <HiMiniHeart size={30} className={`${favourites.includes(gif.id) ? 'text-red-500' : ''
                }`} /> Favourite

            </button>

            <button
              onClick={shareGif}
              className='flex gap-6 items-center font-bold text-lg'>
              <FaPaperPlane size={25} /> Share</button>

            <button onClick={EmbedGif} className='flex gap-5 items-center font-bold text-lg'>
              <IoCodeSharp size={30} /> Embed

            </button>

          </div>

        </div>

        <div>
          <span className='font-extrabold'>Related GIFs</span>
          <div className='columns-2 md:column-3 gap-2'>
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>


      </div>

    </div>
  )
}

export default GifPage
