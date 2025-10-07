import React from 'react'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Davi Negreiros</h1>
        <p>Desenvolvedor Flutter & QA | Fortaleza, CE</p>
        <div className="hero-buttons">
          <a
            href="#projects"
            className="btn btn-primary"
          >
            Ver projetos
          </a>
          <a
            href="https://www.linkedin.com/in/davinegreiiros/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-linkedin"
          >
            LinkedIn
          </a>
          <a
            href="/Davi_Negreiros_CV.pdf"
            download
            className="btn btn-download"
          >
            <span role="img" aria-label="download" style={{marginRight: 6}}>⬇️</span>
            Baixar CV
          </a>
        </div>
      </div>
    </section>
  )
}

// Adicione este CSS ao seu arquivo global ou ao Hero.module.css
/*
.hero {
  padding-top: 60px; // reduzido para mostrar mais conteúdo
  padding-bottom: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}
.hero-content {
  text-align: center;
}
.hero-buttons {
  margin-top: 32px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.btn {
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-primary {
  background: #007bff;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0,123,255,0.15);
}
.btn-primary:hover {
  background: #0056b3;
  transform: scale(1.07);
  box-shadow: 0 4px 16px rgba(0,123,255,0.25);
}
.btn-linkedin {
  background: #fff;
  color: #0a66c2;
  border: 2px solid #0a66c2;
  box-shadow: 0 2px 8px rgba(10,102,194,0.10);
}
.btn-linkedin:hover {
  background: #0a66c2;
  color: #fff;
  border-color: #0a66c2;
  transform: scale(1.07);
}
.btn-download {
  background: #fff;
  color: #28a745;
  border: 2px solid #28a745;
  box-shadow: 0 2px 8px rgba(40,167,69,0.10);
}
.btn-download:hover {
  background: #28a745;
  color: #fff;
  border-color: #28a745;
  transform: scale(1.07);
}
@media (max-width: 600px) {
  .hero {
    padding-top: 24px;
    min-height: 40vh;
  }
  .hero-content h1 {
    font-size: 2rem;
  }
  .hero-content p {
    font-size: 1rem;
  }
  .btn {
    font-size: 1rem;
    padding: 10px 18px;
  }
  .hero-buttons {
    gap: 10px;
  }
}
*/