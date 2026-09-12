# Arquivo Vivo da Sabedoria Prática

Catálogo aberto, CC0, de casos verificáveis de resolução prática, transmissão de conhecimento e contribuição coletiva no Brasil. Parte do Eixo SELVA.

- Site: `arquivo-vivo.vercel.app` (a publicar)
- Repo: `github.com/araguaci/arquivo-vivo`
- Dados: [`data/catalog.json`](./data/catalog.json)
- Schema: [`data/schema.json`](./data/schema.json)
- Metodologia: [`METHODOLOGY.md`](./METHODOLOGY.md)

## Estado atual

Scaffold inicial — schema e metodologia definidos, catálogo vazio, aguardando primeira leva de 10–15 casos sourceados e verificados antes do primeiro deploy.

## Estrutura

```
arquivo-vivo/
├── data/
│   ├── catalog.json      # corpus (entradas[])
│   └── schema.json        # JSON Schema Draft 2020-12
├── docs/
├── METHODOLOGY.md
├── index.html              # site estático
└── README.md
```

## Próximos passos

1. Levantar e verificar 10–15 casos reais (trilhas 1–3)
2. Rodar cada caso pelo teste de genericização (ver METHODOLOGY.md)
3. Popular `catalog.json`, IDs sequenciais `AV-0001` em diante
4. Deploy no Vercel
5. Registrar em `sabor-brazil/data/ecosystem.json` (fonte canônica do ecossistema)
