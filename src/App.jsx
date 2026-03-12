import { ThemeProvider } from './context/ThemeContext'
import { NewsProvider } from './context/NewsContext'
import Header from './components/Header'
import DailySummary from './components/DailySummary'
import PMAnalysis from './components/PMAnalysis'
import CategoryNav from './components/CategoryNav'
import NewsList from './components/NewsList'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NewsProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            
            <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
                <div className="flex-1 min-w-0 w-full">
                  <DailySummary />
                  <PMAnalysis />
                  <CategoryNav />
                  <NewsList />
                </div>
                <div className="hidden xl:block w-80 flex-shrink-0">
                  <Sidebar />
                </div>
              </div>
            </main>
            
            <Footer />
          </div>
        </NewsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
