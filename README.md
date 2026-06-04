# Portfólio — Davi Negreiros

Estrutura dos arquivos:

```
index.html              → marcação + conteúdo (PT/EN via data-pt / data-en)
portfolio/styles.css    → todo o sistema visual (cores, type, layout, temas)
portfolio/app.js        → interações: i18n PT/EN, terminal animado, typed role,
                          reveal no scroll, scrollspy, count-up, glow nos cards
portfolio/tweaks-panel.jsx → painel de Tweaks (SÓ preview — não precisa no site final)
portfolio/tweaks.jsx       → controles dos 3 temas (SÓ preview)
```

## Como abrir
Abra `index.html` em qualquer navegador. Tudo é estático (sem build).

## Bilíngue (PT/EN)
Cada texto traduzível tem `data-pt="..."` e `data-en="..."`.
O `app.js` troca o conteúdo conforme o idioma e salva a escolha em localStorage.

## Temas (3 variações)
Definidos em `styles.css` como `[data-theme="mint"]` (padrão), `[data-theme="cobalt"]`
e `[data-theme="amber"]`. Basta setar `document.documentElement.setAttribute('data-theme', 'cobalt')`.
Cada tema é um conjunto de variáveis CSS (`--bg`, `--acc`, `--glow`, etc.).

## Portando para Vite/React
- Os blocos de cada seção (hero, sobre, skills, experiência, projetos, contato)
  viram componentes facilmente — o HTML já está organizado por `<section id="...">`.
- Mantenha `styles.css` como global ou converta para CSS Modules.
- As funções de `app.js` (reveal, typed, terminal) podem virar hooks/useEffect.
- O painel de Tweaks (React/Babel) é só ferramenta de preview — descarte no build final.
- A foto foi removida a pedido; o hero usa terminal + card "atualmente".

## Conteúdo
Dados extraídos do seu currículo e dos READMEs reais dos repositórios:
agendamento-app-pet, PomodoroQuest, sas_barber, cypress-basico-v2, projeto-app-despesas.
