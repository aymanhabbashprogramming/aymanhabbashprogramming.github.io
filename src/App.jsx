import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import Skills from './components/Skills'
import FeaturedProjects from './components/FeaturedProjects'
import Training from './components/Training'
import SiteNavigation from './components/SiteNavigation'
import { LanguageProvider } from './i18n/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <SiteNavigation />
      <Hero />
      <AboutMe />
      <Skills />
      <FeaturedProjects />
      <Training />
    </LanguageProvider>
  )
}

export default App;
