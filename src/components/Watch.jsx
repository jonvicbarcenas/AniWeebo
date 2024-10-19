import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Play, SkipForward, Maximize2, VolumeX, Volume2 } from 'lucide-react';
import Anilist from './watch-support/Anilist';
import Loader from './screens/Loader';
import SelectedAnimeDesc from './watch-support/SelectedAnimeDesc';

const baseUrl = 'https://jvbarcenas.tech/api';

export default function Watch() {
  const { episodeId } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const episodeParam = queryParams.get('ep');
  const fullEpisodeId = useMemo(() => `${episodeId}?ep=${episodeParam}`, [episodeId, episodeParam]);

  const [episode, setEpisode] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [englishSubtitle, setEnglishSubtitle] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (episode && Object.keys(episode).length > 0) {
      setLoading(false);
    }
  }, [episode]);

  const getEpisodes = async (fullEpisodeId) => {
    try {
      const response = await fetch(`${baseUrl}/anime/episode-srcs?id=${fullEpisodeId}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      if (data.sources && data.sources.length > 0) setVideoUrl(data.sources[0].url);
      const englishTrack = data.tracks.find(track => track.label === 'English' && track.kind === 'captions');
      if (englishTrack) setEnglishSubtitle(englishTrack.file);
      setEpisode(data);
    } catch (error) {
      console.error('Error fetching episode data:', error);
    }
  };

  useEffect(() => {
    if (episodeParam) getEpisodes(fullEpisodeId);
  }, [fullEpisodeId, episodeParam]);

  const handlePlayerReady = () => {
    if (playerRef.current && englishSubtitle) {
      const videoElement = playerRef.current.getInternalPlayer();
      if (videoElement) {
        const track = document.createElement('track');
        track.kind = 'captions';
        track.label = 'English';
        track.srclang = 'en';
        track.src = englishSubtitle;
        track.default = true;
        videoElement.appendChild(track);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-gray-900 text-white min-h-screen p-12">
          <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row">
              {/* Episode List */}
              <div className="w-full lg:w-1/4 pr-4 mb-4 lg:mb-0">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">List of episodes:</h3>
                  </div>
                  <Anilist episodeId={episodeId} fullEpisodeId={fullEpisodeId} />
                </div>
              </div>

              {/* Main Content */}
              <div className="w-full lg:w-3/4">
                {/* Video Player */}
                <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  {videoUrl ? (
                    <ReactPlayer
                      ref={playerRef}
                      url={videoUrl}
                      controls
                      width="100%"
                      height="100%"
                      onReady={handlePlayerReady}
                      muted={isMuted}
                      config={{
                        file: {
                          attributes: {
                            crossOrigin: 'anonymous',
                          },
                        },
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Play className="w-16 h-16 text-gray-600" />
                    </div>
                  )}
                </div>

                {/* Player Controls */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-2">
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
                      <Play className="w-5 h-5" />
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded">
                      <SkipForward className="w-5 h-5" />
                    </button>
                      <button className="bg-gray-700 hover:bg-gray-600 p-2 rounded" onClick={toggleMute}>
                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">
                      Light On
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">
                      Auto Play Off
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">
                      Auto Next On
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm">
                      Auto Skip Intro On
                    </button>
                  </div>
                </div>

                {/* Anime Details */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex">
                    <img 
                      src="/path-to-anime-image.jpg" 
                      alt="Anime Cover" 
                      className="w-24 h-36 object-cover rounded mr-4"
                    />
                    <div>
                      <h2 className="text-2xl font-bold mb-2"></h2>
                      <div className="flex space-x-2 mb-2">
                        <span className="bg-gray-700 px-2 py-1 rounded text-xs">PG-13</span>
                        <span className="bg-purple-700 px-2 py-1 rounded text-xs">HD</span>
                        <span className="bg-green-700 px-2 py-1 rounded text-xs">CC 3</span>
                        <span className="text-gray-400 text-sm">23 • TV • 22m</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">
                        TITLE ANIME nisi nisi eu commodo aliquip aliquip excepteur exercitation.(2023).
                      </p>
                      <p className="text-sm">
                        jvbarcenas tech is awesome to watch chuchu chu Voluptate eu quis velit mollit dolor anim ut officia dolore reprehenderit sit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}