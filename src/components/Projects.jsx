import React from 'react'

const PROJECTS = [
	{
		title: 'Agendamento Pet Mobile',
		desc: 'Aplicativo mobile para agendamento de serviços pet, permitindo cadastro de pets, agendamento de horários, notificações e integração com backend. Projeto disponível em: https://github.com/davinegreiiros/agendamento-app-pet',
		tech: 'Flutter, Firebase, Bloc, API-REST',
	},
	{
		title: 'MyBookStore (Flutter)',
		desc: 'App de gerenciamento de livros e funcionários criado como teste prático. Arquitetura com BLoC, suporte a flavors (QA/Produção), integração com Firebase Analytics, imagens em base64 e papéis ADMIN/EMPLOYEE.',
		tech: 'Flutter, BLoC, Firebase',
	},
	{
		title: 'Chess System Java',
		desc: 'Sistema de jogo de xadrez em Java com testes automatizados e integração com bancos de dados.',
		tech: 'Java, Mockito',
	},
	{
		title: 'Cypress Básico V2',
		desc: 'Projeto de automação de testes end-to-end utilizando Cypress. Inclui exemplos práticos de testes automatizados para aplicações web, abordando boas práticas, comandos customizados e integração com relatórios. Repositório: https://github.com/davinegreiiros/cypress-basico-v2',
		tech: 'Cypress, JavaScript',
	},
]

export default function Projects() {
	return (
		<section id="projects" className="section">
			<h2>Projetos</h2>
			{PROJECTS.map((p) => (
				<article className="card" key={p.title}>
					<h3>{p.title}</h3>
					<p>{p.desc}</p>
					<p>
						<strong>Tecnologias:</strong> {p.tech}
					</p>
				</article>
			))}
		</section>
	)
}
