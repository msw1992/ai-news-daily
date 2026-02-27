import { ThemeProvider } from './context/ThemeContext'
import { NewsProvider } from './context/NewsContext'
import Header from './components/Header'
import DailySummary from './components/DailySummary'
import CategoryNav from './components/CategoryNav'
import NewsList from './components/NewsList'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <NewsProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header />
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex gap-8">
              <div className="flex-1 min-w-0">
                <DailySummary />
                <CategoryNav />
                <NewsList />
              </div>
              <Sidebar />
            </div>
          </main>
          
          <Footer />
        </div>
      </NewsProvider>
    </ThemeProvider>
  )
}

export default App
