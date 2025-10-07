import React from 'react'

export default function Header(){
  return (
    <header className="hero">
      <nav className="nav">
        <div className="brand">Davi Negreiros</div>
        <div className="menu">
          <a href="#about">Sobre</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experiência</a>
          <a href="#projects">Projetos</a>
          <a href="#contact">Contato</a>
          <a className="btn ghost" href="/Profile.pdf" target="_blank" rel="noreferrer">Baixar CV</a>
        </div>
      </nav>
      <div className="hero-content">
        <h1>Olá — eu sou <span className="accent">Davi Negreiros</span></h1>
        <p>Flutter Developer | QA | Mobile & Web | Unimed Fortaleza</p>
        <div className="cta">
          <a className="btn" href="#projects">Ver projetos</a>
          <a className="btn ghost" href="https://www.linkedin.com/in/davi-negreiros-31b942286/" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </header>
  )
}
