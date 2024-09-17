import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

const baseUrl = 'https://aniweebu-api.onrender.com';

function Watch() {
  const { episodeId } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const episodeParam = queryParams.get('ep');
  const fullEpisodeId = useMemo(() => `${episodeId}?ep=${episodeParam}`, [episodeId, episodeParam]);

  const [episode, setEpisode] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [englishSubtitle, setEnglishSubtitle] = useState('');
  const playerRef = useRef(null);

  const getEpisodes = async (fullEpisodeId) => {
    try {
      const response = await fetch(`${baseUrl}/anime/episode-srcs?id=${fullEpisodeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('API Response:', data);

      if (data.sources && data.sources.length > 0) {
        setVideoUrl(data.sources[0].url);
      }

      const englishTrack = data.tracks.find(track => track.label === 'English' && track.kind === 'captions');
      if (englishTrack) {
        console.log('English Subtitle:', englishTrack.file);
        setEnglishSubtitle(englishTrack.file);
      }

      setEpisode(data);
    } catch (error) {
      console.error('Error fetching episode data:', error);
    }
  };

  useEffect(() => {
    if (episodeParam) {
      getEpisodes(fullEpisodeId);
    }
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

  return (
    <>
      {videoUrl && (
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          controls
          width="100%"
          height="100%"
          onReady={handlePlayerReady}
          config={{
            file: {
              attributes: {
                crossOrigin: 'anonymous',
              },
            },
          }}
        />
      )}
      {!videoUrl && <p>Loading video...</p>}
    </>
  );
}

export default Watch;