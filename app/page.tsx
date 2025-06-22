export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
          Movie App Project
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          A comprehensive movie recommendation application with user authentication, favorites, and watchlists.
        </p>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Project Structure</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Backend Features</h3>
              <ul className="text-left space-y-2 text-gray-300">
                <li>• Express.js server with MongoDB</li>
                <li>• JWT authentication</li>
                <li>• TMDB API integration</li>
                <li>• User favorites & watchlists</li>
                <li>• RESTful API endpoints</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3 text-purple-400">Frontend Features</h3>
              <ul className="text-left space-y-2 text-gray-300">
                <li>• React with TypeScript</li>
                <li>• React Router for navigation</li>
                <li>• Responsive design with Tailwind</li>
                <li>• Movie search & details</li>
                <li>• User authentication flow</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
