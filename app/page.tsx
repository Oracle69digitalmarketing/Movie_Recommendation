import { AuthProvider } from "@/contexts/auth-context"

export default function Home() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Enhanced Movie App
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            AI-powered movie recommendations with streaming availability, social features, and advanced analytics.
          </p>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">New Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">AI Features</h3>
                <ul className="text-left space-y-2 text-gray-300">
                  <li>• Smart movie recommendations</li>
                  <li>• Natural language search</li>
                  <li>• Review sentiment analysis</li>
                  <li>• Movie trivia generator</li>
                  <li>• Voice search support</li>
                </ul>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">Enhanced Features</h3>
                <ul className="text-left space-y-2 text-gray-300">
                  <li>• Streaming availability checker</li>
                  <li>• Social feed and sharing</li>
                  <li>• Advanced analytics dashboard</li>
                  <li>• Personalized insights</li>
                  <li>• Cross-platform search</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
