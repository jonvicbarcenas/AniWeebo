import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'


const baseUrl = 'https://jvbarcenas.tech/api'

function AnimeItem() {

    const {id} = useParams();
    console.log(id)

    //state
    const [anime, setAnime] = useState({}); //anime
    const [showMore, setShowMore] = useState(false); //showMore
    const [episodes, setEpisodes] = useState([]); //episodes
    const [characters, setCharacters] = useState([]); //characters

    //destructure anime
    const {
            // name, poster, description, stats, aired, rating, 
            // rank, scored_by, 
            // popularity, status, score,
            // source, season, synopsis,
            // trailer, characters_staff
            info,  moreInfo
        } = anime;
    

    //get anime base on id
    const getAnime = async (anime) => {
        const response = await fetch(`${baseUrl}/anime/info?id=${anime}`);
        const data = await response.json();
        console.log(data.anime) 
        setAnime(data.anime);
        
    }

    //get episodes
    const getEpisodes = async (anime) => {
        const response = await fetch(`${baseUrl}/anime/episodes/${anime}`);
        const data = await response.json();
        console.log(data.episodes) //clg data
        setEpisodes(data.episodes);
    }

    //get characters
    // const getCharacters = async (anime) => {
    //     const response = await fetch(`${baseUrl}/${anime}/characters`);
    //     const data = await response.json();
    //     console.log(data.data) //clg data
    //     setCharacters(data.data.characters);
    // }


    useEffect(() => {
        getAnime(id);
        getEpisodes(id);
        // getCharacters(id);
    }, [])

  return (
    <>
    <AnimeItemStyled>
        <div className="anime-about">
            <h1>{info?.name}</h1>
            <div className="details">
                <div className="detail">
                    <div className="image">
                        <img src={info?.poster} alt={info?.name}/>
                    </div>
                    <div className="anime-details">
                            {/* <p><span>Rank: </span><span>{rank}</span></p> */}
                            {/* <p><span>Scored By: </span><span>{scored_by}</span></p> */}
                            {/* <p><span>Popularity: </span><span>{popularity}</span></p> */}
                            {/* <p><span>Source: </span><span>{source}</span></p> */}
                            {/* <p><span>Season: </span><span>{}</span></p> */}
                            <p><span>Aired:</span><span>{moreInfo?.aired}</span></p> 
                            <p><span>Score: </span><span>{moreInfo?.malscore}</span></p>
                            <p><span>Status: </span><span>{moreInfo?.status}</span></p>
                            <p><span>Rating: </span><span>{info?.stats.rating}</span></p>
                            <p><span>Duration: </span><span>{info?.stats.duration}</span></p>
                            <p><span>Sub Episodes: </span><span>{info?.stats.episodes.sub}</span></p>
                    </div>
                    <p className="description">
                        {showMore ? info.description : info?.description.substring(0, 450) + '...'}
                        <button onClick={() => {
                            setShowMore(!showMore)
                        }}>{showMore ? 'Show Less' : 'Read More'}</button>
                    </p>
                </div>
                {/* <h3 className="name">Trailer</h3>
                <div className="trailer-con">
                        {trailer?.embed_url ? 
                            <iframe 
                                src={trailer.embed_url} 
                                name="Inline Frame Example"
                                    width="800"
                                    height="450" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen>
                            </iframe> : <p>No Trailer</p>}
                </div> */}
            </div>
        </div>
        <div className="episodes">
            <h2>Episodes</h2>
            <div className="episode-list">
                {episodes.map((episode) => {
                    return (
                        <div className="episode" key={episode.number}>
                            <Link to={`/anime/watch/${episode.episodeId}`}>
                                <p>{episode.number}. {episode.title}</p>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    </AnimeItemStyled>
    </>
  )
}
//YT 54:06
export default AnimeItem

const AnimeItemStyled = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;

    .episodes{
        margin-right: 5rem;
        width: 550px;
        margin-left: 2rem;
    }
`;