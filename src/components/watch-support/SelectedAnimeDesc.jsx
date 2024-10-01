import React, { useEffect, useState } from 'react';
import '../Watch.css'
import { Link } from 'react-router-dom';

const baseUrl = 'https://jvbarcenas.tech/api';

function SelectedAnimeDesc({episodeId}) {
    //state
    const [anime, setAnime] = useState({}); //anime
    const [showMore, setShowMore] = useState(false); //showMore

    //destructure anime
    const {
            info,  moreInfo
        } = anime;
    

    //get anime base on id
    const getAnime = async (anime) => {
        const response = await fetch(`${baseUrl}/anime/info?id=${anime}`);
        const data = await response.json();
        console.log(data.anime) 
        setAnime(data.anime);
        
    }
    useEffect(() => {
        if (episodeId) {
          getAnime(episodeId);
        }
      }, [episodeId]);

  return (
    <>
      <div className="anime-info">
        <img
          src={info?.poster}
          alt={info?.name}
          className="anime-thumbnail"
        />
        <h3>{info?.name}</h3>
        <p className="description">
            {showMore ? info.description : info?.description.substring(0, 450) + '...'}
            <button onClick={() => {
                setShowMore(!showMore)
            }}>{showMore ? 'Show Less' : 'Read More'}</button>
        </p>
      </div>
    </>
  )
}

export default SelectedAnimeDesc