import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const baseUrl = 'https://jvbarcenas.tech/api';

function Anilist({ episodeId, fullEpisodeId }) {
  const { episodeId: currentEpisodeId } = useParams(); // Get current episodeId from the URL
  const [episodes, setEpisodes] = useState([]);

  const getEpisodes = async (animeId) => {
    try {
      const response = await fetch(`${baseUrl}/anime/episodes/${animeId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEpisodes(data.episodes);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    if (episodeId) {
      getEpisodes(episodeId);
    }
  }, [episodeId]);

  console.log('episode:', episodeId);

  const handleClick = (url) => (event) => {
    event.preventDefault();
    window.location.href = url;
  };

  return (
    <div>
      <ol>
        {episodes.map((episode) => (
          <li
            key={episode.number}
            className={`border border-gray-300 p-2 mb-2 ${
              episode.episodeId === fullEpisodeId ? 'bg-blue-100 text-white' :
              episode.episodeId === currentEpisodeId ? 'bg-yellow-500 text-black' : ''
            }`} // Highlight the current episode
          >
            <Link to={`/anime/watch/${episode.episodeId}`} onClick={handleClick(`/anime/watch/${episode.episodeId}`)}>
              {episode.number}. {episode.title ? (episode.title.length > 20 ? `${episode.title.substring(0, 20)}...` : episode.title) : ''}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Anilist;