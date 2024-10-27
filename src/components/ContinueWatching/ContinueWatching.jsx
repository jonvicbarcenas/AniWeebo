import { useContext } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import AuthContext from '../../context/authContext';
import MyLottieAnimation from '../screens/MyLottieAnimation';
import { Link } from 'react-router-dom'


const ContinueWatching = () => {
  const { watchedTime, loggedIn } = useContext(AuthContext);
  const data = watchedTime || []; // Ensure data is an array

  console.log(data);
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDuration = (duration) => {
    return duration.replace('m', ':00');
  };

  if (!loggedIn) {
    return (
      <div className="m-16 bg-transparent p-6 flex flex-col justify-center items-center h-48">
        <span className="text-white text-lg">Please login to save your watch history</span>
        <MyLottieAnimation />
      </div>
    );
  }

  return (
    <div className="bg-slate-900 p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-pink-500" />
          <h2 className="text-white text-xl font-semibold">Continue Watching</h2>
        </div>
        {/* <p className="flex items-center text-gray-400 hover:text-white">
          View more
          <ChevronRight className="w-4 h-4 ml-1" />
        </p> */}
      </div>

      {data.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <span className="text-white text-lg">No data</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data.map((anime) => {
            const lastEpisode = anime.episodes[anime.episodes.length - 1];
            const progress = (lastEpisode.time / (parseFloat(anime.duration) * 60)) * 100;

            return (
              <div key={anime._id} className="relative group">
                <Link to={`/anime/watch/${lastEpisode.fullEpisodeParams}`} className="block">
                <div className="relative">
                  <img
                    src={anime.poster}
                    alt={anime.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center gap-2 text-white text-sm">
                      <span className="bg-blue-600 px-2 py-0.5 rounded text-xs">
                        SUB:{anime.stats.cc.sub}
                      </span>
                      {anime.stats.cc.dub && (
                        <span className="bg-pink-100 px-2 py-0.5 rounded text-xs text-black">
                          DUB: {anime.stats.cc.dub}
                        </span>
                      )}
                      <span>{anime.stats.rating}</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                    <div
                      className="h-full bg-pink-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <h3 className="text-white font-medium text-sm truncate">
                    {anime.name}
                  </h3>
                  <div className="flex items-center text-gray-400 text-xs mt-1">
                    <span>EP {lastEpisode.episodeNumber}</span>
                    <span className="mx-2">•</span>
                    <span>{formatTime(lastEpisode.time)} / {formatDuration(anime.duration)}</span>
                  </div>
                </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContinueWatching;