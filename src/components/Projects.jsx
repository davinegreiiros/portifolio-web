import React from 'react'

const PROJECTS = [
  {
    title: 'MyBookStore (Flutter)',
    desc: 'App de gerenciamento de livros e funcionários criado como teste prático. Arquitetura com BLoC, suporte a flavors (QA/Produção), integração com Firebase Analytics, imagens em base64 e papéis ADMIN/EMPLOYEE.',
    tech: 'Flutter, BLoC, Firebase'
  },
  {
    title: 'Office Notices Screen (UI + Animações)',
    desc: 'Implementação de tela de avisos com animações e contadores de lidos/não lidos.',
    tech: 'Flutter, animações customizadas'
  },
  {
    title: 'Chess System Java',
    desc: 'Sistema de jogo de xadrez em Java com testes automatizados e integração com bancos de dados.',
    tech: 'Java, Mockito'
  }
]

export default function Projects(){
  return (
    <section id="projects" className="section">
      <h2>Projetos</h2>
      {PROJECTS.map(p=> (
        <article className="card" key={p.title}>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <p><strong>Tecnologias:</strong> {p.tech}</p>
        </article>
      ))}
    </section>
  )
}
