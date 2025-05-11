"use client"

import { useEffect, useState, useMemo } from "react" // Added useMemo
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import Loader from "./screens/Loader"
import SparklesText from "./ui/sparkles-text"
import { API_BASE_URL } from "../lib/config"

const baseUrl = `${API_BASE_URL}/api/v2/hianime`

function AnimeItem() {
  const { id } = useParams()
  const [anime, setAnime] = useState({})
  const [showMore, setShowMore] = useState(false)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  // New state for episode ranging
  const [episodeRanges, setEpisodeRanges] = useState([])
  const [currentEpisodeRange, setCurrentEpisodeRange] = useState(null)
  const [isRangeDropdownOpen, setIsRangeDropdownOpen] = useState(false)

  const { info, moreInfo } = anime

  const getAnime = async (animeId) => {
    const response = await fetch(`${baseUrl}/anime/${animeId}`)
    const data = await response.json()
    setAnime(data.data.anime)
  }

  const getEpisodes = async (animeId) => {
    const response = await fetch(`${baseUrl}/anime/${animeId}/episodes`)
    const data = await response.json()
    setEpisodes(data.data.episodes)
  }

  useEffect(() => {
    getAnime(id)
    getEpisodes(id)
  }, [id])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (anime && Object.keys(anime).length > 0) {
        setLoading(false)
      }
    }, 100) // Keep a small delay to ensure data is stable for initial render

    return () => clearTimeout(timer)
  }, [anime])

  // Effect to calculate ranges (depends on anime info for total episode count)
  useEffect(() => {
    const totalEpisodesCountString = info?.stats?.episodes?.sub
    if (totalEpisodesCountString) {
      const totalEpisodesCount = parseInt(totalEpisodesCountString, 10)

      if (!isNaN(totalEpisodesCount) && totalEpisodesCount > 100) {
        const ranges = []
        for (let i = 0; i < totalEpisodesCount; i += 100) {
          const start = i + 1
          const end = Math.min(i + 100, totalEpisodesCount)
          ranges.push({
            start,
            end,
            label: `EPS: ${String(start).padStart(3, "0")}-${String(end).padStart(3, "0")}`,
          })
        }
        setEpisodeRanges(ranges)
        if (ranges.length > 0) {
          // Set the first range as default, only if not already set or if current is no longer valid
          if (!currentEpisodeRange || !ranges.find((r) => r.label === currentEpisodeRange.label)) {
            setCurrentEpisodeRange(ranges[0])
          }
        }
      } else {
        setEpisodeRanges([])
        setCurrentEpisodeRange(null) // Clear range if not applicable
      }
    } else {
      // If total episode count is not yet available, clear ranges
      setEpisodeRanges([])
      setCurrentEpisodeRange(null)
    }
  }, [info?.stats?.episodes?.sub]) // Re-calculate when total episode count changes

  // Memoized list of episodes to display
  const displayedEpisodes = useMemo(() => {
    const sortedEpisodes = [...episodes].sort((a, b) => a.number - b.number)

    if (currentEpisodeRange && episodeRanges.length > 0) {
      return sortedEpisodes.filter(
        (episode) => episode.number >= currentEpisodeRange.start && episode.number <= currentEpisodeRange.end,
      )
    }
    return sortedEpisodes // Default: all episodes, sorted
  }, [episodes, currentEpisodeRange, episodeRanges])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen p-6 md:p-12 bg-gradient-to-b from-gray-900 to-black">
          <div className="max-w-6xl mx-auto">
            <h1 className="mb-8 text-center">
              <SparklesText
                text={info?.name}
                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
              />
            </h1>

            <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 rounded-2xl shadow-2xl p-6 backdrop-blur-md border border-gray-700/50">
              <div className="md:flex gap-8">
                <div className="md:w-1/3 flex justify-center md:justify-start md:self-start">
                  <div className="relative group w-full max-w-[300px]">
                    <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                    <img
                      src={info?.poster || "/placeholder.svg"}
                      alt={info?.name}
                      className="relative w-full max-w-[300px] h-auto rounded-lg shadow-lg transform group-hover:scale-[1.02] transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="md:w-2/3 mt-8 md:mt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p>
                        <span className="font-bold text-gray-300">Aired:</span>{" "}
                        <span className="text-white">{moreInfo?.aired}</span>
                      </p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p>
                        <span className="font-bold text-gray-300">Score:</span>{" "}
                        <span className="text-yellow-300 font-bold">{moreInfo?.malscore}</span>
                      </p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p>
                        <span className="font-bold text-gray-300">Status:</span>{" "}
                        <span className="text-white">{moreInfo?.status}</span>
                      </p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p>
                        <span className="font-bold text-gray-300">Rating:</span>{" "}
                        <span className="text-white">{info?.stats.rating}</span>
                      </p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p>
                        <span className="font-bold text-gray-300">Duration:</span>{" "}
                        <span className="text-white">{info?.stats.duration}</span>
                      </p>
                    </div>
                    <div className="bg-gray-800/50 p-3 rounded-lg">
                      <p>
                        <span className="font-bold text-gray-300">Episodes:</span>{" "}
                        <span className="text-white">
                          SUB: {info?.stats.episodes.sub} | DUB: {info?.stats.episodes.dub ?? 0}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
                    <p className="font-bold text-gray-300 mb-2">Genres:</p>
                    <div className="flex flex-wrap gap-2">
                      {moreInfo?.genres?.map((genre, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-900/60 text-purple-100 rounded-full text-sm">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <p className="font-bold text-gray-300 mb-2">Description:</p>
                    <p className="text-sm leading-relaxed text-gray-200">
                      {showMore
                        ? info?.description
                        : info?.description?.substring(0, 450) + (info?.description?.length > 450 ? "..." : "")}
                    </p>
                    {info?.description?.length > 450 && (
                      <button
                        onClick={() => setShowMore(!showMore)}
                        className="mt-3 px-4 py-1 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-sm transition-colors duration-300"
                      >
                        {showMore ? "Show Less" : "Read More"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Episodes
              </h2>

              {/* EPISODE RANGE SELECTOR START */}
              {episodeRanges.length > 0 && (
                <div className="mb-6 flex justify-start">
                  <div className="relative inline-block text-left w-full max-w-xs">
                    <div>
                      <button
                        type="button"
                        className="inline-flex justify-between w-full rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded={isRangeDropdownOpen}
                        onClick={() => setIsRangeDropdownOpen(!isRangeDropdownOpen)}
                      >
                        {currentEpisodeRange ? currentEpisodeRange.label : "Select Range"}
                        <svg
                          className="-mr-1 ml-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>

                    {isRangeDropdownOpen && (
                      <div
                        className="origin-top-left absolute left-0 mt-2 w-full rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div className="py-1" role="none">
                          {episodeRanges.map((range) => (
                            <button
                              key={range.label}
                              onClick={() => {
                                setCurrentEpisodeRange(range)
                                setIsRangeDropdownOpen(false)
                              }}
                              className={`${
                                currentEpisodeRange?.label === range.label
                                  ? "bg-purple-600 text-white"
                                  : "text-gray-200 hover:bg-gray-700 hover:text-white"
                              } group flex items-center justify-between w-full px-4 py-2 text-sm`}
                              role="menuitem"
                            >
                              <span>{range.label}</span>
                              {currentEpisodeRange?.label === range.label && (
                                <svg
                                  className="w-5 h-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* EPISODE RANGE SELECTOR END */}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedEpisodes.map((episode) => (
                  <Link to={`/anime/watch/${episode.episodeId}`} key={episode.number} className="block">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                      <div className="relative bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-300 h-full flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center bg-purple-900 rounded-full mr-3 text-white font-bold">
                          {episode.number}
                        </div>
                        <p className="font-semibold text-lg text-gray-100">
                          {episode.title
                            ? episode.title.length > 25
                              ? `${episode.title.substring(0, 25)}...`
                              : episode.title
                            : "Episode " + episode.number}
                        </p>
                      </div>
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
