import React, { useEffect, useState } from 'react';

const baseUrl = 'https://jvbarcenas.tech/api/v2/hianime';

export default function AniDescription({ episodeId }) {
  const [anime, setAnime] = useState({});
  console.log("anime id: ", episodeId);

  const getAnime = async (episodeId) => {
    const response = await fetch(`${baseUrl}/anime/${episodeId}`);
    const res = await response.json();
    console.log("anime data: ", res.data.anime.info);
    setAnime(res.data.anime.info);
  };

  useEffect(() => {
    if (episodeId) {
      getAnime(episodeId);
    }
  }, [episodeId]);

  return (
    <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={anime.poster || '/path-to-anime-image.jpg'}
          alt="Anime Cover"
          className="w-24 h-36 object-cover rounded-lg shadow-md"
        />
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">{anime.name}</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-800 px-2 py-1 rounded-full text-xs font-medium">{anime?.stats?.rating}</span>
            <span className="bg-purple-700 px-2 py-1 rounded-full text-xs font-medium">{anime?.stats?.quality}</span>
            <span className="bg-green-700 px-2 py-1 rounded-full text-xs font-medium">{anime?.stats?.type}</span>
            <span className="text-gray-400 text-sm">SUB {anime?.stats?.episodes?.sub} • DUB {anime?.stats?.episodes?.dub} • {anime?.stats?.duration}</span>
          </div>
          <p className="text-sm text-gray-400">
            {anime.description}
          </p>
          <p className="text-sm leading-relaxed">
              jvbarcenas tech is awesome to watch <span className="text-purple-300">{anime.name}</span> anime!!! 
          </p>
        </div>
      </div>
    </div>
  );
}