import React from 'react'
import Homepage from './Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AnimeItem from './AnimeItem'
import Watch from './Watch'

function App() {
  return (
  <>
    <BrowserRouter>
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