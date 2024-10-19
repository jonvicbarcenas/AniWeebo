'use client'

import { Button } from '@mui/material'
import Particles from './ui/particles'
import PlanetEarth from '../assets/planet-earth.svg'

export default function Enhanced404Page() {

  return (
    (<div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="text-center z-10 px-4">
        <h1 className="text-6xl md:text-9xl font-bold mb-4">404</h1>
        <p className="text-xl md:text-2xl mb-8">Oops! You've ventured into unknown space.</p>
        <Button
          href="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Return Home
        </Button>
      </div>
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {/* Planet */}
          <img src={PlanetEarth} 
            alt="Planet Earth"
            className="absolute top-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 animate-float"
          />

          {/* Astronaut */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            className="absolute top-1/4 left-1/4 w-16 h-16 md:w-24 md:h-24 animate-float">
            <circle cx="50" cy="50" r="35" fill="#E5E7EB" /> {/* Suit */}
            <circle cx="50" cy="35" r="20" fill="#D1D5DB" /> {/* Helmet */}
            <rect x="30" y="55" width="40" height="30" fill="#E5E7EB" rx="10" /> {/* Body */}
            <circle cx="45" cy="35" r="5" fill="#1E40AF" /> {/* Visor */}
            <rect x="40" y="85" width="7" height="15" fill="#9CA3AF" /> {/* Left leg */}
            <rect x="53" y="85" width="7" height="15" fill="#9CA3AF" /> {/* Right leg */}
            <rect x="25" y="60" width="15" height="7" fill="#9CA3AF" rx="3" /> {/* Left arm */}
            <rect x="60" y="60" width="15" height="7" fill="#9CA3AF" rx="3" /> {/* Right arm */}
          </svg>

          {/* Star */}
          <Particles quantity={200} className='w-full h-full overflow-hidden'/>
        </div>
      </div>
    </div>)
  );
}