import React, { useState, useEffect } from 'react'

export default function Header(){
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        <div className="brand">
          <span className="brand-icon">{'{ DN }'}</span>
          <span className="brand-name">Davi Negreiros</span>
        </div>
        <div className="nav-menu">
          <a href="#about" className="nav-link">Sobre</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#experience" className="nav-link">Experiência</a>
          <a href="#projects" className="nav-link">Projetos</a>
          <a href="#contact" className="nav-link">Contato</a>
          <a className="btn-cv" href="/Profile.pdf" download>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            CV
          </a>
        </div>
      </nav>
    </header>
  )
}
