import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import SplashScreen from './pages/SplashScreen.jsx'
import Home from "./pages/Home.jsx";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
