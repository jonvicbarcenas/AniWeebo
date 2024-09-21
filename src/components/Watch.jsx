import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Anilist from './watch-support/Anilist';
import SelectedAnimeDesc from './watch-support/SelectedAnimeDesc';
import './Watch.css';

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
    <div className="container">
      {/* Episode List Section */}
      <Anilist episodeId={episodeId} /> {/* pass the episode */}

      {/* Main Player Section */}
      <div className="main-section">
        <div className="video-section">
          {videoUrl ? (
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
          ) : (
            <img
              src="example-video-placeholder.jpg"
              alt="Video"
              className="video-placeholder"
            />
          )}
        </div>

        {/* Next Episode Section */}
        {/* <div className="next-episode">
          <h3>Next episode</h3>
          <div className="next-episode-info">
            <img
              src="next-episode-thumbnail.jpg"
              alt="Next Episode"
              className="episode-thumbnail"
            />
            <div className="episode-text">
              <p>The Beginning</p>
              <p>Episode 2</p>
            </div>
          </div>
        </div> */}

        {/* Subtitles Section */}
        <div className="subtitles">
          <h3>Subtitles</h3>
          <div className="subtitle-options">
            <label>
              <input type="radio" name="subtitle" defaultChecked /> English
            </label>
            <label>
              <input type="radio" name="subtitle" /> Japanese
            </label>
            <label>
              <input type="radio" name="subtitle" /> Spanish
            </label>
            <label>
              <input type="radio" name="subtitle" /> French
            </label>
          </div>
        </div>

        {/* Quality Section */}
        <div className="quality">
          <h3>Quality</h3>
          <div className="quality-options">
            <label>
              <input type="radio" name="quality" defaultChecked /> Auto
            </label>
            <label>
              <input type="radio" name="quality" /> 1080p
            </label>
            <label>
              <input type="radio" name="quality" /> 720p
            </label>
          </div>
        </div>
      </div>

      {/* Anime Info Section */}
      <SelectedAnimeDesc episodeId={episodeId}/>
    </div>
  );
}

export default Watch;