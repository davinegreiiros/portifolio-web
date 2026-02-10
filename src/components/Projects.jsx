import React from 'react'

const PROJECTS = [
	{
		title: 'Agendamento Pet Mobile',
		desc: 'Aplicativo mobile para agendamento de serviços pet com cadastro de pets, agendamento de horários, notificações push e integração completa com backend.',
		tech: ['Flutter', 'Firebase', 'Bloc', 'REST API'],
		github: 'https://github.com/davinegreiiros/agendamento-app-pet',
		highlight: true,
	},
	{
		title: 'MyBookStore',
		desc: 'App de gerenciamento de livros e funcionários com arquitetura BLoC, suporte a flavors (QA/Produção), integração com Firebase Analytics e controle de acesso ADMIN/EMPLOYEE.',
		tech: ['Flutter', 'BLoC', 'Firebase', 'Clean Architecture'],
		highlight: true,
	},
	{
		title: 'Chess System Java',
		desc: 'Sistema de jogo de xadrez implementado em Java com testes automatizados, integração com bancos de dados e aplicação de padrões de projeto.',
		tech: ['Java', 'Mockito', 'JUnit', 'MySQL'],
		github: 'https://github.com/davinegreiiros/chess-system-java',
	},
	{
		title: 'Cypress Básico V2',
		desc: 'Projeto de automação de testes end-to-end com exemplos práticos, boas práticas, comandos customizados e integração com relatórios.',
		tech: ['Cypress', 'JavaScript', 'Automation'],
		github: 'https://github.com/davinegreiiros/cypress-basico-v2',
	},
	{
		title: 'App Clima',
		desc: 'Aplicação de previsão do tempo com integração de API, interface responsiva e visualização de dados meteorológicos em tempo real.',
		tech: ['JavaScript', 'API REST', 'HTML', 'CSS'],
		github: 'https://github.com/davinegreiiros/app-clima',
	},
]

export default function Projects() {
	return (
		<section id="projects" className="section">
			<h2>Projetos em Destaque</h2>

			<div className="projects-grid">
				{PROJECTS.map((project, index) => (
					<article
						key={index}
						className={`project-card ${project.highlight ? 'project-highlight' : ''}`}
					>
						<div className="project-header">
							<h3 className="project-title">{project.title}</h3>
							{project.highlight && (
								<span className="project-badge">Destaque</span>
							)}
						</div>

						<p className="project-description">{project.desc}</p>

						<div className="project-tech">
							{project.tech.map((tech, idx) => (
								<span key={idx} className="tech-badge">{tech}</span>
							))}
						</div>

						{project.github && (
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								className="project-link"
							>
								<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
									<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
								</svg>
								Ver no GitHub
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M7 17L17 7M17 7H7M17 7V17"/>
								</svg>
							</a>
						)}
					</article>
				))}
			</div>
		</section>
	)
}
