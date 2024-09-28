import React from 'react'
import Homepage from './Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AnimeItem from './AnimeItem'
import Watch from './Watch'
import ResponsiveAppBar from './navbar/myNavbar'

function App() {
  return (
  <>
    <BrowserRouter>
        <ResponsiveAppBar  />
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/anime/:id" element={<AnimeItem />} />
            <Route path="/anime/watch/:episodeId" element={<Watch />} />
        </Routes>
    </BrowserRouter>
  </>
  )
}

export default App

//YT: 53 mins pa ata?