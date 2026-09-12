# Arquivo Vivo da Sabedoria Prática

Catálogo aberto, CC0, de casos verificáveis de resolução prática, transmissão de conhecimento e contribuição coletiva no Brasil. Parte do Eixo SELVA.

- Site: [arquivo-vivo-omega.vercel.app](https://arquivo-vivo-omega.vercel.app/)
- Repo: `github.com/araguaci/arquivo-vivo`
- Dados: [`data/catalog.json`](./data/catalog.json)
- Schema: [`data/schema.json`](./data/schema.json)
- Metodologia: [`METHODOLOGY.md`](./METHODOLOGY.md)

## Estado atual

Publicado. Corpus inicial com 22 entradas sourceadas (`AV-0001`–`AV-0022`), filtro por trilha/evidência, tracker de leitura e PWA.

## Estrutura

```
arquivo-vivo/
├── assets/                 # hero e ícone PWA
├── data/
│   ├── catalog.json        # corpus (entradas[])
│   └── schema.json         # JSON Schema Draft 2020-12
├── docs/
├── METHODOLOGY.md
├── index.html              # dashboard estático
├── manifest.json
└── sw.js
```

## Próximos passos

1. Continuar sourcing e verificação (próximo ID livre: `AV-0023`)
2. Rodar cada caso pelo teste de genericização (ver METHODOLOGY.md)
3. Corpus atual sem `ev-alleged`; a lacuna restante está em `AV-0016` (`ev-contested`)
4. Registrar em `sabor-brazil/data/ecosystem.json` (fonte canônica do ecossistema)
