<h1 align="center">Hand 2 Hand</h1>

<p align="center">
  <strong>Marketplace de aluguel ponto a ponto (P2P)</strong> — conecte quem tem objetos parados a quem precisa deles, com retirada 100% segura e autônoma em <em>lockers</em> digitais.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white">
  <img alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap&logoColor=white">
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white">
</p>

---

## Sobre o Projeto

O **Hand 2 Hand** é uma plataforma inovadora de economia circular. Ela permite que um **locador** anuncie objetos subutilizados (ferramentas, equipamentos esportivos, eletrônicos) para aluguel, e que um **locatário** faça a reserva por período determinado. O grande diferencial é a logística: retiradas e devoluções são feitas em **armários digitais (lockers)**, eliminando a necessidade de encontros presenciais e garantindo flexibilidade e segurança.

> **Status do Projeto:** Frontend em desenvolvimento avançado. A aplicação atualmente utiliza um módulo cliente (`api/client.js`) para simular chamadas assíncronas a um backend (Mock API).

---

## Funcionalidades Implementadas

* **Autenticação Completa:** Fluxo de cadastro e login com validações de formulário em tempo real (Regex para e-mail, força de senha) e gerenciamento de sessão no lado do cliente.
* **Motor de Busca e Filtros:** Pesquisa textual combinada com filtros de categoria e ordenação múltipla (relevância, maior/menor preço, avaliação) processados dinamicamente no frontend.
* **Sistema de Agendamento:** Cálculo dinâmico de diárias baseado em inputs de *datetime-local*, somado automaticamente a taxas de serviço do locker.
* **Chat P2P:** Interface de mensagens em tempo real simulada, permitindo a comunicação direta entre locatário e locador antes ou durante a reserva.
* **Design Responsivo e Temático:** Interface construída com *Mobile-First* em mente, utilizando Bootstrap 5 e um design system focado na cor primária "Aqua" (`#38b2ac`), com componentes de bordas retas (`rounded-0`) para um visual moderno e utilitário.

---

## Tecnologias e Stack

| Camada | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **UI Framework** | [React 19](https://react.dev/) | Construção de interfaces baseadas em componentes. |
| **Build Tool** | [Vite 8](https://vite.dev/) | Servidor de desenvolvimento rápido e empacotamento. |
| **Estilização** | [Bootstrap 5.3](https://getbootstrap.com/) | Sistema de grids, utilitários CSS e responsividade. |
| **Roteamento** | [React Router 7](https://reactrouter.com/) | Navegação SPA (Single Page Application). |
| **Iconografia** | [Lucide React](https://lucide.dev/) | Biblioteca de ícones consistentes e leves. |
| **Linter** | ESLint | Padronização e qualidade de código. |

---

## Mapa de Rotas

A navegação da aplicação está estruturada da seguinte forma:

| Rota | Componente | Descrição do Fluxo |
| :--- | :--- | :--- |
| `/` | `HomePage` | Landing page com hero section, destaques e atalho de busca. |
| `/busca` | `Busca` | Listagem de itens com sidebar de filtros e ordenação interativa. |
| `/detalhes/:id` | `DetalhesAgendamento`| Visão aprofundada do item, regras de multa, local do locker e widget de cálculo de reserva. |
| `/reserva/:id` | `Reserva` | Fluxo de checkout e geração da chave digital do locker. |
| `/chat/:id` | `Chat` | Ambiente de mensagens entre o usuário logado e o dono do item. |
| `/anunciar` | `Anunciar` | Formulário para locadores cadastrarem novos objetos no catálogo. |
| `/minha-conta` | `MinhaConta` | Painel de controle do usuário (histórico de aluguéis, pagamentos e anúncios). |
| `/login` | `Login` | Autenticação de usuários existentes. |
| `/cadastro` | `Cadastro` | Criação de novas contas com validação estrita. |
| `/esqueci-senha`| `EsqueciSenha` | Fluxo de recuperação de credenciais. |

---

## Como Executar Localmente

**Pré-requisitos:** Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 20 ou superior) instalado em sua máquina.

1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone <url-do-repositorio>
   cd project_umbrella

### Outros comandos
```bash
npm run build     # gera a versão de produção em dist/
npm run preview   # serve o build de produção localmente
npm run lint      # roda o ESLint
```
