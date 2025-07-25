# 🎬 Movie Recommendation Platform

AI-powered movie and TV show discovery engine with personalized recommendations, streaming availability, and real-time data from TMDB and other APIs.



## 🚀 Overview

This project is a full-stack entertainment platform designed for scalability, personalization, and seamless discovery. It integrates external APIs (TMDB, streaming providers), modular backend services, and an interactive frontend.



## 🎯 Core Features

- 🔍 **Search & Discover**: Real-time movie & TV show search via TMDB
- 🧠 **Smart Recommendations**: Personalized by genre, rating, user watchlist
- 📍 **Streaming Availability**: Know where to watch movies instantly
- 🧾 **User System**: Signup, login, profile, and watchlist tracking
- 💾 **Backend API**: Modular Node.js/Express API with clean service layers
- 🌐 **Frontend Interface**: React (or other) for responsive experience
- 🔐 **Security**: JWT authentication, environment variables for config



## 🧱 Tech Stack

| Layer     | Tech Used                                      |
|-----------|------------------------------------------------|
| Frontend  | React • Axios • TailwindCSS (optional)         |
| Backend   | Node.js • Express • TMDB API • JustWatch API   |
| Auth      | JWT • bcrypt • Middleware                      |
| Tools     | GitHub • dotenv • Prettier • Postman           |
| Hosting   | Vercel/Netlify (Frontend), Render/Heroku (Backend) |



## 📁 Folder Structure

Movie_Recommendation/ ├── backend/ │   ├── controllers/ │   ├── routes/ │   ├── services/ │   ├── utils/ │   └── app.js ├── frontend/ │   ├── components/ │   ├── pages/ │   └── App.js └── README.md



## 🔌 API Endpoints

| Route                      | Method | Description                            |
|----------------------------|--------|----------------------------------------|
| `/api/movies`              | GET    | Fetch popular/trending movies          |
| `/api/movies/:id`          | GET    | Fetch movie details + streaming links  |
| `/api/tvshows`             | GET    | Fetch TV shows                         |
| `/api/users/register`      | POST   | Register user                          |
| `/api/users/login`         | POST   | User authentication                    |
| `/api/users/profile`       | GET    | Fetch user data                        |
| `/api/users/watchlist`     | GET/POST/DELETE | Watchlist operations         |



## 🎥 TMDB Integration

This platform uses [TMDB (The Movie Database)](https://www.themoviedb.org/documentation/api) as the primary source for movie and TV metadata.

### 🔄 What We Fetch:
- Movie & TV titles
- Genres
- Posters and backdrops
- Cast and crew
- Ratings
- Trailers and media
- Synopses
- Release dates

### 📦 Backend Integration:
- TMDB API is called inside:
  - `services/movieService.js`
  - `routes/movies.js`
- Calls are made on-demand when:
  - User searches or selects a movie
  - Frontend loads a details page

### 🔐 Configuration:
- Requires a TMDB API key stored in `.env`:

TMDB_API_KEY=your_tmdb_key



## 📡 Streaming Availability

To show where users can watch movies, we integrate with external streaming availability APIs.

### 🌍 API Used:
- **[Watchmode API](https://www.watchmode.com/)** or **JustWatch API** (select one as used)

### 🔄 How We Use It:
- Backend service `streamingService.js` fetches real-time availability (country-specific)
- Combined into the `/api/movies/:id` endpoint response
- Frontend displays:
  - Platform icons (Netflix, Prime, Disney+)
  - Watch links or pricing (if available)

### ⚙️ Configuration:
- `.env` key setup:

STREAMING_API_KEY=your_watchmode_or_justwatch_key



## 🧪 Frontend Real-time Behavior

- ✅ Movie details page triggers a fetch to `/api/movies/:id`
- ✅ Streaming platforms are dynamically fetched and displayed per request
- ❌ No static or hardcoded availability — always real-time

Ensure this flow is maintained in `MovieDetails.jsx` (or equivalent component).



## 🛠️ Local Development Setup

1. **Clone the repo**

```bash
git clone https://github.com/Oracle69digitalmarketing/Movie_Recommendation.git
cd Movie_Recommendation

2. Backend Setup



cd backend
npm install
touch .env

Add to .env:

PORT=5000
TMDB_API_KEY=your_tmdb_key
STREAMING_API_KEY=your_watchmode_key
JWT_SECRET=your_secret_key

Start server:

npm start

3. Frontend Setup



cd frontend
npm install
npm start



🔮 Future Roadmap

AI-based recommendation engine (user behavior + ratings)

Genre clustering + collaborative filtering

User-generated ratings, likes, and comments

Push notifications for trending movies

Native mobile app (React Native)



🤝 Contributing

git checkout -b feature/my-feature
git commit -m "Added my feature"
git push origin feature/my-feature

Pull requests welcome.



📜 License

MIT © Oracle69 Digital Marketing



🎖️ Maintainers

Prince Adewumi Adewale — Product Owner, Backend Architect

Contributors welcome
