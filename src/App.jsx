import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import SplashScreen from './pages/SplashScreen.jsx'
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SubjectOverview from "./pages/SubjectOverview.jsx";
import CategoryFiles from "./pages/CategoryFiles.jsx";
import DepartmentSubjects from "./pages/DepartmentSubjects.jsx";



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route
            path="/home"
            element={
                <Home />
            }
          />

        <Route 
          path="/departments/:deptKey" 
          element={
            <ProtectedRoute>
              <DepartmentSubjects />
            </ProtectedRoute>
          } 
        />


        <Route 
          path="/departments/:deptKey/:subjectCode"
          element={
            <ProtectedRoute>
              <SubjectOverview />
            </ProtectedRoute>
          }
        />


        <Route 
          path="/departments/:deptKey/:subjectCode/:sectionKey"
          element={
            <ProtectedRoute>
              <CategoryFiles />
            </ProtectedRoute>
          }
        />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
