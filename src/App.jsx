import Hero from './components/Hero'
import AboutMe from './components/AboutMe'
import Skills from './components/Skills'
import FeaturedProjects from './components/FeaturedProjects'
import OtherProjects from './components/OtherProjects'
import Education from './components/Education'
import Training from './components/Training'
import Achievements from './components/Achievements'
import SiteNavigation from './components/SiteNavigation'

function App() {
  return (
    <>
      <SiteNavigation />
      <Hero />
      <AboutMe />
      <Skills />
      <FeaturedProjects />
      <OtherProjects />
      <Education />
      <Training />
      <Achievements />
    </>
  )
}

export default App;
