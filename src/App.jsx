import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import Skills from './components/Skills'
import FeaturedProjects from './components/FeaturedProjects'
import OtherProjects from './components/OtherProjects'
import Training from './components/Training'
import Achievements from './components/Achievements'
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
      <OtherProjects />
      <Training />
      <Achievements />
    </LanguageProvider>
  )
}

export default App;
