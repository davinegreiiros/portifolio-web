import React from 'react'

const SKILLS = [
  'Flutter & Dart','BLoC / Cubit','Firebase Analytics','REST / GraphQL','MongoDB / MySQL',
  'Java (Spring Boot)','React','Node.js','CI/CD','Automated Testing (Cypress, Robot Framework, Postman)',
  'SCRUM / Jira','Kibana (Elastic Stack)'
]

export default function Skills(){
  return (
    <section id="skills" className="section alt">
      <h2>Skills</h2>
      <ul className="skills-grid">
        {SKILLS.map(s=> <li key={s}>{s}</li>)}
      </ul>
    </section>
  )
}
