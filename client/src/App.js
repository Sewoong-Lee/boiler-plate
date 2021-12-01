import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage'
import LogInPage from './components/views/LogInPage/LogInPage'
import NavBar from './components/views/NavBar/NavBar'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import Footer from './components/views/Footer/Footer'
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path={"/"} element={<NavBar />} />
        <Route path={"/"} element={<Footer />} /> */}
        <Route path={"/login"} element={<LogInPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={process.env.PUBLIC_URL + "/"} element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

export default App

