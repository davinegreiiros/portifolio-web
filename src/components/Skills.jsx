import React from 'react'

const SKILL_CATEGORIES = [
  {
    title: 'Mobile & Frontend',
    icon: '📱',
    skills: ['Flutter', 'Dart', 'React', 'JavaScript', 'HTML/CSS', 'Android', 'iOS']
  },
  {
    title: 'Backend & APIs',
    icon: '⚙️',
    skills: ['Node.js', 'Java', 'Spring Boot', 'REST APIs', 'GraphQL', 'MongoDB', 'MySQL']
  },
  {
    title: 'State Management & Architecture',
    icon: '🏗️',
    skills: ['BLoC', 'Cubit', 'Clean Architecture', 'Design Patterns', 'SOLID']
  },
  {
    title: 'Testing & QA',
    icon: '🧪',
    skills: ['Cypress', 'Robot Framework', 'Postman', 'Flutter Testing', 'Unit Tests', 'Integration Tests']
  },
  {
    title: 'DevOps & Tools',
    icon: '🔧',
    skills: ['Git', 'CI/CD', 'Firebase', 'Kibana', 'Elastic Stack', 'Jira', 'SCRUM']
  }
]

export default function Skills(){
  return (
    <section id="skills" className="section">
      <h2>Habilidades Técnicas</h2>

      <div className="skills-container">
        {SKILL_CATEGORIES.map((category, index) => (
          <div key={index} className="skill-category">
            <div className="skill-category-header">
              <span className="skill-icon">{category.icon}</span>
              <h3 className="skill-category-title">{category.title}</h3>
            </div>
            <div className="skill-tags">
              {category.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
