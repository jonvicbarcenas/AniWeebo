import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import Loader from './screens/Loader'
import SparklesText from './ui/sparkles-text'

const baseUrl = 'https://jvbarcenas.tech/api/v2/hianime'

function AnimeItem() {
    const { id } = useParams();
    const [anime, setAnime] = useState({});
    const [showMore, setShowMore] = useState(false);
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log("test: ", episodes);

    const { info, moreInfo } = anime;

    const getAnime = async (animeId) => {
        const response = await fetch(`${baseUrl}/anime/${animeId}`);
        const data = await response.json();
        setAnime(data.data.anime);
    }

    const getEpisodes = async (animeId) => {
        const response = await fetch(`${baseUrl}/anime/${animeId}/episodes`);
        const data = await response.json();
        setEpisodes(data.data.episodes);
    }

    useEffect(() => {
        getAnime(id);
        getEpisodes(id);
    }, [id])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (anime && Object.keys(anime).length > 0) {
                setLoading(false);
            }
        }, 100);
    
        return () => clearTimeout(timer);
    }, [anime]);

    return (
        <>
        {loading ? (
            <Loader />    
        ) : (
            <div className="p-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">{<SparklesText text={info.name}/>}</h1>
                <div className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 backdrop-blur-md">
                    <div className="md:flex">
                        <div className="md:w-1/3">
                            <img src={info?.poster} alt={info?.name} className="w-full h-auto rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="md:w-2/3 md:pl-8 mt-4 md:mt-0">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <p><span className="font-bold">Aired:</span> {moreInfo?.aired}</p>
                                <p><span className="font-bold">Score:</span> <span className="text-yellow-300">{moreInfo?.malscore}</span></p>
                                <p><span className="font-bold">Status:</span> {moreInfo?.status}</p>
                                <p><span className="font-bold">Rating:</span> {info?.stats.rating}</p>
                                <p><span className="font-bold">Duration:</span> {info?.stats.duration}</p>
                                <p><span className="font-bold">SUB Episodes:</span> {info?.stats.episodes.sub}</p>
                                <p><span className="font-bold">DUB Episodes:</span> {info?.stats.episodes.dub ?? 0}</p>
                            </div>
                            <p className="text-sm leading-relaxed">
                                {showMore ? info?.description : info?.description?.substring(0, 450) + (info?.description?.length > 450 ? '...' : '')}
                                {info?.description?.length > 450 && (
                                    <p
                                        onClick={() => setShowMore(!showMore)}
                                        className="ml-2 text-pink-300 hover:text-pink-100 transition-colors duration-300"
                                    >
                                        {showMore ? 'Show Less' : '+ Read More'}
                                    </p>
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold mb-6 text-center">Episodes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {episodes.map((episode) => (
                            <Link to={`/anime/watch/${episode.episodeId}`} key={episode.number} className="block">
                                <div className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-1">
                                    <p className="font-semibold text-lg">
                                        {episode.number}. {episode.title ? (episode.title.length > 25 ? `${episode.title.substring(0, 25)}...` : episode.title) : ''}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default AnimeItem