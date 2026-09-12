# Arquivo Vivo da Sabedoria Prática

## 🛡️ Sentinel Status
- **Status:** 🟢 Produção
- **Tier:** A
- **Health:** 80% / **ROI Potencial:** open data cívico (CC0) — corpus verificável de ofício e resolução prática no Eixo SELVA
- **Stack:** HTML/CSS/JS, JSON estático, PWA, Vercel

---

Catálogo aberto, CC0, de casos brasileiros verificáveis de resolução prática, transmissão de conhecimento e contribuição coletiva — valor documentado, não autodeclarado.

**URL canônica:** [arquivo-vivo-omega.vercel.app](https://arquivo-vivo-omega.vercel.app/)  
**Repositório:** [github.com/araguaci/arquivo-vivo](https://github.com/araguaci/arquivo-vivo)  
**Licença:** CC0 1.0  
**Dados:** [`data/catalog.json`](./data/catalog.json) · **Schema:** [`data/schema.json`](./data/schema.json) · **Metodologia:** [`METHODOLOGY.md`](./METHODOLOGY.md)

### Estado atual (set/2026)

| | |
|---|---|
| Entradas publicadas | **22** (`AV-0001`–`AV-0022`) |
| Próximo ID livre | `AV-0023` |
| `ev-confirmed` | 21 |
| `ev-contested` | 1 (`AV-0016`) |
| `ev-alleged` | 0 |
| Trilha 1 — Resolução Prática | 10 |
| Trilha 2 — Transmissão de Conhecimento | 6 |
| Trilha 3 — Contribuição Coletiva | 6 |

Dashboard estático com filtro por trilha e evidência, ficha com imagem e detalhamento (`data/details.json`), protocolo de leitura 6/6 por ID (localStorage) e PWA (`sw.js` cache `arquivo-vivo-v3`).

## Ecossistema SELVA

Mesma disciplina: **fonte auditável, hipótese ≠ fato**, deploy público rastreável. Cada hub tem escopo próprio — não misturar categorias.

| Projeto | URL | Papel |
|---|---|---|
| **Arquivo Vivo** (este) | [arquivo-vivo-omega.vercel.app](https://arquivo-vivo-omega.vercel.app/) | Catálogo de sabedoria prática com rastro — ofício, método e contribuição coletiva |
| **Ecosistema Selva** | [ecosistema-selva.vercel.app](https://ecosistema-selva.vercel.app/) | Meta-hub Sentinel — saúde e navegação dos hubs |
| **Sabor Brazil** | [sabor-brazil.vercel.app](https://sabor-brazil.vercel.app/) | Catálogo — o nome não é a coisa |
| **Série Demográfica** | [serie-demografica.vercel.app](https://serie-demografica.vercel.app/) | Observatório de mortalidade 2014–2025 |
| **Vítimas do Estado** | [vitimas-do-estado.vercel.app](https://vitimas-do-estado.vercel.app/) | Registro de falha estatal com dano irreversível |
| **JusMonitor** | [jusmonitor.vercel.app](https://jusmonitor.vercel.app/) | Captura institucional + decisões de impacto (R1–R7, CC0) |
| **Lawfare Timeline** | [lawfare-timeline.vercel.app](https://lawfare-timeline.vercel.app/) | Linha do tempo investigativa com fonte auditável |
| **Observatório Civil BR** | [observatorio-civil-br.vercel.app](https://observatorio-civil-br.vercel.app/) | Hub investigativo — artefatos e padrões P01–P11 |
| **GoSurf** | [gosurf.site](https://gosurf.site) | Análises, dossiês e insights (ponte editorial) |
| **República Sequestrada** | [republica-sequestrada-hub.vercel.app](https://republica-sequestrada-hub.vercel.app/) | Hub narrativo do eixo |
| **Geoengenharia** | [geoengenharia.vercel.app](https://geoengenharia.vercel.app/) | Patentes e modificação climática |
| **O Dragão e a Onça** | [odragaoeaonca.vercel.app](https://odragaoeaonca.vercel.app/) | Série Brasil × China |
| **Abuso Supremo** | [abusosupremo.vercel.app](https://abusosupremo.vercel.app/) | Cronologia de censura 2019–2025 |

Nav canônica (monorepo): `sabor-brazil/data/ecosystem.json`. Snippet pronto para inclusão: [`ecosystem-entry-snippet.json`](./ecosystem-entry-snippet.json).  
Eixo Sentinel: [`SENTINEL-EIXO-SELVA.md`](https://github.com/araguaci/ai-projects/blob/main/docs/estrategia/SENTINEL-EIXO-SELVA.md) · meta-hub: [ecosistema-selva.vercel.app](https://ecosistema-selva.vercel.app/).

## 🎯 Visão Geral

O arquivo público de “histórias inspiradoras” no Brasil mistura lenda, marketing e caso real sem marcar a diferença. O Arquivo Vivo aplica o padrão evidencial do Eixo SELVA a outro domínio: quem resolveu um problema concreto, quem passou um ofício adiante, quem gerou contribuição coletiva mensurável — com fonte datada, sem depender de fama ou métrica de engajamento.

Três trilhas, um schema (`1.0.0`): `ev-confirmed` exige duas fontes independentes (regra R1 herdada do JusMonitor). Republicação do mesmo comunicado não conta como corroboração. Hipótese fica em `analise` (`ev-inference`); o `resumo` só admite fato.

## 📊 Viabilidade & ROI (Sentinel-Viability Focus)
- **Modelo de Receita:** Open data / CC0 (não SaaS) — valor em reputação, citação e ponte editorial com o Eixo SELVA
- **Ticket Médio:** R$ 0 (domínio público)
- **ROI Projetado:** corpus cívico de ofício e resolução prática; monetização indireta via ecossistema de dossiês, não paywall no catálogo

## 🏗️ Arquitetura & Infra (Sentinel-TechHealth Focus)
- **Frontend:** `index.html` + `app.js` (busca, filtros, overlay de ficha, protocolo 6/6)
- **Backend:** nenhum servidor de aplicação — site estático
- **Persistência:** JSON versionado em `data/` (`catalog.json`, `details.json`, `schema.json`)
- **Infra:** Vercel (root estático) + PWA (`manifest.json`, `sw.js`)

| Arquivo | Papel |
|---------|--------|
| `index.html` + `app.js` | Dashboard Cyber-Growth, overlay `#AV-NNNN`, créditos `@artesdosul` |
| `data/catalog.json` | Corpus (`entradas[]`), IDs sequenciais nunca reutilizados |
| `data/details.json` | Detalhamento factual e caminho da imagem por ID |
| `data/schema.json` | JSON Schema Draft 2020-12 |
| `assets/casos/AV-NNNN.png` | Visual de cada ficha |
| `METHODOLOGY.md` | Trilhas, taxonomia evidencial, teste de genericização |
| `sw.js` | Precache PWA (`arquivo-vivo-v3`) |

## 🛡️ Segurança & LGPD (Sentinel-Security Focus)
> [!IMPORTANT]
> O catálogo **não coleta** dados pessoais identificáveis de visitantes. Não há conta, formulário de identificação nem cookie de tracking próprio. O protocolo de leitura (6 passos por ficha) e o marcador “lido” ficam só no `localStorage` deste aparelho (`arquivo_vivo_protocol_by_id`, `arquivo_vivo_completed`). As entradas descrevem **casos públicos** já documentados em fontes institucionais ou jornalísticas. Uma ficha no arquivo **não é endosso** e **não implica** mérito moral automático — registra rastro verificável. Contribuições futuras passam por curadoria humana e pelo teste de genericização antes de entrar no corpus.

## 🚀 Roadmap de Execução
- [x] **Fase 1: MVP Estrutural** — schema, metodologia, corpus inicial, dashboard e deploy Vercel
- [x] **Fase 2: Ficha e evidência** — imagens, `details.json`, protocolo 6/6, PWA; cinco `ev-alleged` promovidos a `ev-confirmed` com segunda fonte independente
- [ ] **Fase 3: Ecossistema** — registrar em `sabor-brazil/data/ecosystem.json` e espelhos SELVA
- [ ] **Fase 4: Corpus** — sourcing `AV-0023`+, resolver a lacuna de `AV-0016` (`ev-contested`), formulário público de submissão com curadoria

## 🛠️ Instruções de Setup

```bash
# servir localmente
python -m http.server 8765
# abrir http://127.0.0.1:8765
```

Fonte de verdade do corpus: `data/catalog.json`. IDs `AV-NNNN` são sequenciais e nunca reutilizados. Antes de aceitar uma entrada: fonte verificável, especificidade (não conteúdo motivacional) e teste dos 20 anos — ver [`METHODOLOGY.md`](./METHODOLOGY.md).

## Estrutura

```
arquivo-vivo/
├── assets/
│   ├── arquivo-vivo-hero.png
│   ├── arquivo-vivo-icon.png
│   └── casos/              # AV-0001.png … AV-0022.png
├── data/
│   ├── catalog.json        # corpus (entradas[])
│   ├── details.json        # detalhamento por ID
│   └── schema.json         # JSON Schema Draft 2020-12
├── METHODOLOGY.md
├── ecosystem-entry-snippet.json
├── index.html
├── app.js
├── manifest.json
└── sw.js
```

---
*Este documento segue o Padrão Sentinel para Documentação Estruturada.*
