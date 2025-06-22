const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

// Import routes
const authRoutes = require("./routes/auth")
const movieRoutes = require("./routes/movies")
const userRoutes = require("./routes/users")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/movieapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/movies", movieRoutes)
app.use("/api/users", userRoutes)

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "Movie App API is running!" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
