<h1 align="center">🤝 Hand 2 Hand</h1>

<p align="center">
  <strong>Marketplace de aluguel ponto a ponto</strong> — conecte quem tem objetos parados a quem precisa deles, com retirada segura em <em>lockers</em> digitais.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white">
  <img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white">
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white">
</p>

---

## 📖 Sobre

O **Hand 2 Hand** é uma plataforma onde um **locador** anuncia objetos para alugar e um **locatário** os reserva por período, com retirada e devolução em **armários digitais (lockers)**. O objetivo é transformar objetos sem uso em renda, de forma segura e sustentável.

> ⚠️ **Projeto em desenvolvimento.** Os dados ainda são *mockados* (sem backend) — veja [Roadmap](#-roadmap).

---

## ✨ Funcionalidades

- 🏠 **Início** com destaques e busca
- 🔎 **Busca** de itens com filtro por categoria e ordenação
- 📄 **Detalhes do item** (por `id`) com widget de agendamento e cálculo de total
- 📢 **Anunciar item** (fluxo do locador)
- 🔐 **Autenticação completa**: login, cadastro e recuperação de senha — com validações, estados de carregando e acessibilidade

---

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| UI | [React 19](https://react.dev/) |
| Build / Dev server | [Vite 8](https://vite.dev/) |
| Estilo | [Bootstrap 5.3](https://getbootstrap.com/) + [react-bootstrap](https://react-bootstrap.netlify.app/) |
| Rotas | [react-router-dom 7](https://reactrouter.com/) |
| Ícones | [lucide-react](https://lucide.dev/) |
| Lint | ESLint |

---

## 🗺️ Rotas

| Rota | Página | Descrição |
|---|---|---|
| `/` | `HomePage` | Início: hero, destaques e busca |
| `/busca` | `Busca` | Resultados com filtro e ordenação |
| `/detalhes/:id` | `DetalhesAgendamento` | Detalhes do item + agendamento |
| `/anunciar` | `Anunciar` | Formulário para anunciar um item |
| `/login` | `Login` | Entrar |
| `/cadastro` | `Cadastro` | Criar conta |
| `/esqueci-senha` | `EsqueciSenha` | Recuperação de senha |

---

## 📂 Estrutura

```
project_umbrella/
├── public/
├── src/
│   ├── assets/                  # imagens e ícones
│   ├── data/
│   │   └── itens.js             # fonte única de dados dos itens (mock)
│   ├── pages/                   # uma tela por arquivo
│   │   ├── HomePage.jsx
│   │   ├── Busca.jsx
│   │   ├── DetalhesAgendamento.jsx
│   │   ├── Anunciar.jsx
│   │   ├── Login.jsx
│   │   ├── Cadastro.jsx
│   │   └── EsqueciSenha.jsx
│   ├── App.jsx                  # mapa de rotas
│   ├── main.jsx                 # ponto de entrada (React + Bootstrap + Router)
│   └── index.css                # reset mínimo (o Bootstrap cuida do resto)
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Como rodar

**Pré-requisitos:** [Node.js](https://nodejs.org/) 20+ (recomendado 24) e npm.

```bash
# 1. Instalar as dependências
npm install

# 2. Subir o servidor de desenvolvimento (http://localhost:5173)
npm run dev
```

### Outros comandos

```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve o build de produção localmente
npm run lint      # roda o ESLint
```

---

## 🧩 Convenções

- **Tema visual "aqua":** cor `#38b2ac` (classes `.text-aqua`, `.btn-aqua`, ...), cantos retos (`rounded-0`) e largura cheia (`container-fluid`).
- **Dados centralizados:** `src/data/itens.js` é a fonte única; as telas leem de lá (sem duplicar listas).
- **Mock de API:** os formulários simulam chamadas com `setTimeout` e marcam o ponto de integração real com `// TODO`.

## 🌿 Fluxo de versionamento

- Uma branch por trabalho, criada a partir da `main`: `feature/<nome>`, `bug/<nome>`, `docs/<nome>`.
- Toda mudança na `main` entra via **Pull Request** (a branch é protegida por ruleset).

---

## 🧭 Roadmap

- [ ] Integração com backend real (itens, autenticação, anúncios)
- [ ] Fluxo de reserva ("Reservar e Gerar Chave" → confirmação + chave do locker)
- [ ] Área "Minha conta" (aluguéis e anúncios)
- [ ] Upload real de imagens no anúncio
- [ ] Páginas institucionais do rodapé
