# Metodologia — Arquivo Vivo da Sabedoria Prática

Parte do Eixo SELVA. Licença CC0 1.0.

## Propósito

Documentar, com padrão evidencial verificável, casos reais de indivíduos ou grupos brasileiros que geraram valor prático e duradouro — resolução de problemas concretos, transmissão de conhecimento, ou contribuição coletiva mensurável — sem depender de capital, fama ou métricas de engajamento como critério de valor.

Este arquivo não é conteúdo motivacional. É um corpus de dados verificáveis, no mesmo padrão evidencial usado no lawfare-timeline, aplicado a um domínio diferente.

## Trilhas

1. **Resolução Prática** — problema concreto resolvido (saúde, trabalho, justiça, comunidade), com rastro verificável.
2. **Transmissão de Conhecimento** — ofício, método ou saber passado adiante de forma documentável.
3. **Contribuição Coletiva Mensurável** — impacto comunitário com evidência auditável (reportagem, registro público, testemunho cruzado — nunca autodeclaração isolada).

## Taxonomia de evidência (herdada do Eixo SELVA)

- `ev-confirmed` — 2+ fontes independentes
- `ev-alleged` — fonte única, não promovido sem corroboração
- `ev-contested` — versões conflitantes documentadas lado a lado
- `ev-inference` — leitura interpretativa, sempre isolada no campo `analise`, nunca misturada ao `resumo`

Regra R1 (herdada do JusMonitor): nenhuma entrada `ev-confirmed` é publicada com `fontes[]` vazio.

## Teste de genericização (adaptado)

Antes de aceitar uma entrada, ela precisa passar por três filtros:

1. **Fonte verificável** — não é boato, é rastreável a uma fonte concreta e datada.
2. **Especificidade** — é concreta o bastante para não virar "conteúdo motivacional" genérico e substituível.
3. **Teste dos 20 anos** — o caso plausivelmente ainda importa daqui a 20 anos, não é relevante só pelo ciclo de notícia atual.

Uma entrada que falha em qualquer um dos três não é aceita, ou é marcada como `lacuna_investigativa` até ser resolvida.

## Disciplina anti-viés

- Casos não precisam ter final "inspirador" — resultados parciais, fracassos parciais, ou contribuições contestadas por parte de quem se beneficiou são documentados com o mesmo rigor.
- `lacuna_investigativa` nomeia precisamente o que é desconhecido, sem implicar suspeita.
- Separar conduta individual de padrão sistêmico — são analiticamente distintos (mesma regra do corpus lawfare).

## Fluxo de produção

1. Sourcing via firecrawl (matérias jornalísticas regionais/locais) + formulário público de submissão.
2. Verificação manual contra os três filtros do teste de genericização.
3. Classificação evidencial (`ev-confirmed`/`ev-alleged`/`ev-contested`).
4. Entrada adicionada a `data/catalog.json`, ID sequencial `AV-NNNN`, nunca reutilizado.
5. Publicação no site estático (Vercel), filtro por trilha/região.
