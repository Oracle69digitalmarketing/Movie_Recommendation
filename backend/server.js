const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

// Import routes
const authRoutes = require("./routes/auth")
const movieRoutes = require("./routes/movies")
const userRoutes = require("./routes/users")
const aiRoutes = require("./routes/ai")
const streamingRoutes = require("./routes/streaming")
const socialRoutes = require("./routes/social")
const analyticsRoutes = require("./routes/analytics")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection

console.log('Attempting MongoDB connection with URI:', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/movieapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // Give up trying to connect after 30 seconds
    socketTimeoutMS: 45000,  // Close sockets after 45 seconds of inactivity
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/movies", movieRoutes)
app.use("/api/tvshows", require("./routes/tvshows"))
app.use("/api/users", userRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/streaming", streamingRoutes)
app.use("/api/social", socialRoutes)
app.use("/api/analytics", analyticsRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    message: "Enhanced Movie App API is running!",
    features: [
      "AI-powered recommendations",
      "Smart search",
      "Streaming availability",
      "Social features",
      "Analytics dashboard",
      "Voice search support",
    ],
  })
})

app.listen(PORT, () => {
  console.log(`Enhanced Movie App Server running on port ${PORT}`)
})
