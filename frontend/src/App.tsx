import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { Toaster } from "react-hot-toast"

// Components
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MovieDetails from "./pages/MovieDetails"
import Favorites from "./pages/Favorites"
import Watchlists from "./pages/Watchlists"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/watchlists"
                element={
                  <ProtectedRoute>
                    <Watchlists />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
