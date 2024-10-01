import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const baseUrl = 'http://13.127.169.105:4000';

function Anilist({ episodeId }) {
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

  return (
    <div className="episode-list">
      <h2>Episode Lists</h2>
      <ol>
        {episodes.map((episode) => (
          <li key={episode.number}>
            <Link to={`/anime/watch/${episode.episodeId}`}>
              {episode.number}. {episode.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Anilist;