import './Hero.css'

function Hero({ name = 'MOHAMMED AYMAN HABBASH', role = 'Software Developer | C++ • C# • SQL' }) {
  return (
    <main className="hero" aria-labelledby="hero-title">
      <div className="hero__glow hero__glow--blue" />
      <div className="hero__glow hero__glow--violet" />
      <div className="hero__grid" aria-hidden="true" />

      <section className="hero__content" id="top">
        <p className="hero__intro">Hello, I’m</p>
        <h1 id="hero-title">{name}<span className="hero__period">.</span></h1>
        <p className="hero__role">{role}</p>
        <p className="hero__description">
          Computer Engineering student at Selçuk University, with a strong specialization in C++, C#, and SQL/SQL Server, built through intensive structured training and hands-on project development. I have designed and built multiple structured software systems — including pharmacy management, point-of-sale, and banking applications — applying layered architecture and solid software design principles across the full development lifecycle. I am continuously expanding my technical range while maintaining a deep foundation in the fundamentals of software engineering.
        </p>
      </section>

      <aside className="hero__signal" aria-label="Current focus">
        <span className="hero__signal-label">CURRENTLY FOCUSED ON</span>
        <strong>Building with intent.</strong>
        <span className="hero__signal-line" />
      </aside>

    </main>
  )
}

export default Hero
