import React from 'react'

const EDUCATION = [
  {
    degree: 'Bacharelado em Ciências da Computação',
    institution: 'Centro Universitário Farias Brito - FBUNI',
    period: '2019 - 2025',
    description: 'Graduação completa com formação sólida em desenvolvimento de software, estruturas de dados, algoritmos, arquitetura de sistemas, banco de dados e engenharia de software. Experiência prática em metodologias ágeis e desenvolvimento full-stack.'
  }
]

const CERTIFICATIONS = [
  {
    title: 'Testes Automatizados com Cypress',
    issuer: 'Talking About Testing',
    year: '2023'
  },
  {
    title: 'Flutter & Dart - Desenvolvimento Mobile',
    issuer: 'Udemy',
    year: '2023'
  },
  {
    title: 'Java Spring Boot',
    issuer: 'DevSuperior',
    year: '2022'
  }
]

export default function Education() {
  return (
    <section id="education" className="section">
      <h2>Formação & Certificações</h2>

      <div className="education-container">
        <div className="education-section">
          <h3 className="section-subtitle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
              <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
            Educação
          </h3>

          {EDUCATION.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-header">
                <h4>{edu.degree}</h4>
                <span className="education-period">{edu.period}</span>
              </div>
              <p className="education-institution">{edu.institution}</p>
              <p className="education-description">{edu.description}</p>
            </div>
          ))}
        </div>

        <div className="certifications-section">
          <h3 className="section-subtitle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            Certificações
          </h3>

          <div className="certifications-list">
            {CERTIFICATIONS.map((cert, index) => (
              <div key={index} className="certification-item">
                <div className="certification-dot"></div>
                <div className="certification-content">
                  <h4>{cert.title}</h4>
                  <p>{cert.issuer} · {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
