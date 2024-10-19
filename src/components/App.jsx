import React from 'react'
import Homepage from './Homepage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AnimeItem from './AnimeItem'
import Watch from './Watch'
import ResponsiveAppBar from './navbar/myNavbar'
import SignupForm from './Forms/SignupForm'
import LoginForm from './Forms/LoginForm'
import Dashboard from './Forms/Dashboard'
import { AccountPage } from './Forms/account-page'

function App() {
  return (
  <>
    <BrowserRouter>
        <ResponsiveAppBar  />
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/anime/:id" element={<AnimeItem />} />
            <Route path="/anime/watch/:episodeId" element={<Watch />} />
            <Route path="/signup" element={<SignupForm/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/account" element={<AccountPage/>} />
        </Routes>
    </BrowserRouter>
  </>
  )
}

export default App

//YT: 53 mins pa ata?