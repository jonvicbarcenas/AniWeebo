import React, { useEffect, useState, useMemo, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Play, SkipForward, Maximize2, VolumeX, Volume2 } from 'lucide-react';
import Anilist from './watch-support/Anilist';
import Loader from './screens/Loader';
import AuthContext from '../context/authContext';
import axios from "axios";
import AniDescription from './watch-support/anidescription';

//* vidstack like plyr
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import { Track } from "@vidstack/react";

const baseUrl = 'https://jvbarcenas.tech/api/v2';

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

  //* Autoskip & User Config
  const { config, watchedTime } = useContext(AuthContext);
  const [autoskip, setAutoskip] = useState(null);
  const [animeData, setAnimeData] = useState(null);
  const [episodeNumber, setEpisodeNumber] = useState();

  //* STATE VARIABLE for sending the id, episode, and time to the server for tracking
  const [progress, setProgress] = useState(0);

  // console.log("Anime Data:", animeData);

  const payload = animeData ? {
    id: episodeId,
    name: animeData.name,
    duration: animeData.stats?.duration,
    poster: animeData.poster,
    stats: {
      rating: animeData.stats?.rating,
      quality: animeData.stats?.quality,
      cc: {
        sub: animeData.stats?.episodes?.sub,
        dub: animeData.stats?.episodes?.dub || 0
      }
    },
    episodes: [
      {
        episodeNumber: episodeNumber?.number,
        episodeTitle: episodeNumber?.title,
        episodeId: episodeParam.toString(),
        fullEpisodeParams: fullEpisodeId,
        time: progress
      }
    ]
  } : null;

  // console.log('Payload:', payload);
  // console.log('epsiode num:', episodeNumber.number);

  const getEpisodeNumber = async (animeId) => {
    const response = await fetch(`${baseUrl}/hianime/anime/${animeId}/episodes`);
    const res = await response.json();
    const data = res.data.episodes;
    const episode = data.find(episode => episode.episodeId === fullEpisodeId);
    setEpisodeNumber(episode);

  }

  async function updateWatchedEpisode(payload, progress) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Delay for 1.5 seconds
      const response = await axios.post(`${axios.defaults.serverURL}/auth/profile/watched`, payload);

      // console.log('Episode updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating episode:', error);
    }
  }

  const getAnimeData = async (episodeId) => {
    try {
      const response = await fetch(`${baseUrl}/hianime/anime/${episodeId}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();

      // Set animeData directly to result.data
      setAnimeData(result.data?.anime?.info);

    } catch (error) {
      console.error('Error fetching episode data:', error);
    }
  };


  useEffect(() => {
    if (config) {
      setAutoskip(config.autoskip);
    }
  }, [config]);

  useEffect(() => {
    if (episode && Object.keys(episode).length > 0) {
      setLoading(false);

      // Log the episode details related to the intro
      // console.log('Intro start:', episode?.intro?.start);
      // console.log('Intro end:', episode?.intro?.end);
    }
  }, [episode, episodeId, episodeParam, watchedTime]);

  useEffect(() => {
    if (episodeParam) getAnimeData(episodeId);
    getEpisodeNumber(episodeId);
  }, [episodeParam, episodeId]);

  const getEpisodes = async (fullEpisodeId) => {
    try {
      const response = await fetch(`${baseUrl}/hianime/episode/sources?animeEpisodeId=${fullEpisodeId}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const result = await response.json();
      const data = result.data;
      //  console.log('API response data:', data); // Debugging line
      if (data.sources && data.sources.length > 0)
        setVideoUrl(data.sources[0].url);
      const englishTrack = data.tracks.find(track => track.label === 'English' && track.kind === 'captions');
      if (englishTrack)
        setEnglishSubtitle(englishTrack.file);
      setEpisode(data);
    } catch (error) {
      console.error('Error fetching episode data:', error);
    }
  };

  useEffect(() => {
    if (episodeParam) getEpisodes(fullEpisodeId);
  }, [fullEpisodeId, episodeParam]);

  const handleReady = () => {
    setVideoUrl("https://mmd.biananset.net/_v7/cd914ffc0cb17d4af1017fa6c1a9cd6d4db33887d1f03f2af365496646f8dfc442c671a686d1b459eb0ffe7b4b795eee172a232f946a2d93b3d5f0873c3137bbf632cfcb0602e96f3ad6ab9187dcb737b5449ba9ef6b2d870c3c4beadc4e0aac13d8d2b165de94c873794b42136609bf22e530c3887d0e336be062f224eb7e29/master.m3u8");
  };

  // const handlePlayerReady = () => {
  //   if (playerRef.current && episode?.tracks) {
  //     const videoElement = playerRef.current.getInternalPlayer();
  //     if (videoElement) {
  //       const existingTracks = videoElement.querySelectorAll('track');
  //       existingTracks.forEach((track) => videoElement.removeChild(track));

  //       // Add English subtitles if available
  //       if (englishSubtitle) {
  //         const track = document.createElement('track');
  //         track.kind = 'captions';
  //         track.label = 'English';
  //         track.srclang = 'en';
  //         track.src = englishSubtitle;
  //         track.default = true;
  //         videoElement.appendChild(track);
  //       }

  //       episode.tracks
  //         .filter(track => track.kind === 'captions' && track.label !== 'English')
  //         .forEach(trackData => {
  //           const track = document.createElement('track');
  //           track.kind = trackData.kind;
  //           track.label = trackData.label;
  //           track.srclang = trackData.label.toLowerCase();
  //           track.src = trackData.file;
  //           track.default = trackData.default || false;
  //           videoElement.appendChild(track);
  //         });
  //     }
  //   }
  // };

  const handleVideoProgress = (progress) => {
    const introStart = episode?.intro?.start || 0;
    const introEnd = episode?.intro?.end || 0;

    // Store the real-time progress in the state variable
    setProgress(progress.playedSeconds);

    // Skip intro if autoskip is enabled and the video is currently in the intro segment
    if (autoskip && progress.playedSeconds >= introStart && progress.playedSeconds <= introEnd) {
      playerRef.current.seekTo(introEnd, 'seconds');
    }
    // Update watched episode in real-time

    if (progress.playedSeconds >= 60) {
      updateWatchedEpisode(payload, progress.playedSeconds);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleAutoskip = () => {
    const newAutoskipValue = !autoskip;
    setAutoskip(newAutoskipValue);
    axios.put(`${axios.defaults.serverURL}/auth/profile`, {
      config: {
        autoskip: newAutoskipValue.toString(),
      }
    });
  };

  const [hasPlayed, setHasPlayed] = useState(false);
  const handlePlay = () => {
    if (!hasPlayed) {
      // console.log('episodeId:', episodeId);
      // console.log('episodeParam:', episodeParam);

      const watchedAnime = watchedTime?.find(ep => ep.id === episodeId);

      // console.log('watchedAnime:', watchedAnime);

      const watchedEpisode = watchedAnime?.episodes?.find(ep => ep.episodeId === episodeParam);
      // console.log('watchedEpisode:', watchedEpisode);

      if (watchedEpisode) {
        console.log(`Seeking to time: ${watchedEpisode.time}`);
        playerRef.current.seekTo(watchedEpisode.time, 'seconds');
      } else {
        console.log('No matching watched episode found', watchedTime);
      }

      setHasPlayed(true);
    }
  };


  return (
    <div className="pt-8 min-h-screen text-gray-100">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="w-full lg:w-3/4 space-y-6">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                {videoUrl ? (
                  <MediaPlayer title="Sprite Fight" 
                    src={videoUrl}
                    load='eager'
                  >
                    <MediaProvider/>
                    <Track
                      src= {englishSubtitle}
                      kind="subtitles"
                      label="English"
                      lang="en-US"
                      default
                    />
                    <PlyrLayout thumbnails="https://s.megastatics.com/subtitle/dc13e106ce815098ee70a00760ea916d/eng-2.vtt" icons={plyrLayoutIcons} />
                  </MediaPlayer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Play className="w-16 h-16 text-gray-600" />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex space-x-2">
                  {[Maximize2, Play, SkipForward, isMuted ? VolumeX : Volume2].map((Icon, index) => (
                    <button
                      key={index}
                      className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors duration-200"
                      onClick={index === 3 ? toggleMute : undefined}
                    >
                      <Icon className="w-5 h-5" />
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Light On", "Auto Play Off", "Auto Next On"].map((text, index) => (
                    <button
                      key={index}
                      className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-sm transition-colors duration-200"
                    >
                      {text}
                    </button>
                  ))}
                  <button
                    className={`px-3 py-1 rounded-full text-sm border ${autoskip
                        ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-900"
                        : "border-red-500 text-red-500 hover:bg-red-500 hover:text-gray-900"
                      } transition-colors duration-200`}
                    onClick={toggleAutoskip}
                  >
                    {autoskip ? "Skip Intro On" : "Skip Intro Off"}
                  </button>
                </div>
              </div>

              <AniDescription episodeId={episodeId} />
            </div>

            <div className="w-full lg:w-1/4 mt-6 lg:mt-0">
              <div className="bg-gray-900 rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-bold mb-4">List of episodes:</h3>
                <div className="h-96 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                  <Anilist episodeId={episodeId} fullEpisodeId={fullEpisodeId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}