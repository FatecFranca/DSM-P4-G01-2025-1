# PI Frontend – 4º Semestre  

Este é o frontend do projeto interdisciplinar (PI) desenvolvido no 4º semestre do curso, utilizando o framework Next.js. O objetivo é aplicar conceitos avançados de desenvolvimento web com foco em experiência do usuário, autenticação, consumo de APIs e boas práticas de código.  

---

## 🚀 Tecnologias e Ferramentas Utilizadas
- **Next.js 14**  
- **React 18**  
- **Material UI (MUI)**  
- **Emotion (styled components)**  
- **Framer Motion (animações)**  
- **Heroicons**  
- **Axios (requisições HTTP)**  
- **Bootstrap**  
- **TailwindCSS**  
- **ESLint + Prettier** (padronização de código)  
- **Husky + Lint-staged** (hooks de commit)  
- **Dotenv** (variáveis de ambiente)

---

## 📁 Estrutura do Projeto
``` plaintext
├── _components/            # Componentes reutilizáveis da interface
├── _serializer/            # Serialização de dados  
├── _service/authentication # Serviços de autenticação
├── auth/                   # Lógica relacionada à autenticação (páginas, handlers etc.)
├── fonts/                  # Fontes personalizadas utilizadas no projeto
├── home/                   # Páginas e lógica da home (usuário logado)
├── globals.css             # Estilos globais do projeto
├── layout.js               # Layout base da aplicação
└── page.js                 # Página inicial  
```
---

## 🛠️ Instalação e Uso  

**Pré-requisitos**
  - Node.js v18+  
  - npm ou yarn

**Instalação**
```bash
  git clone https://github.com/akcio23/pi-frontend.git  
  cd pi-frontend  
  npm install
```
**Rodando o Projeto**  
```javascript
  npm run dev
```  

  O projeto estará disponível em: http://localhost:3000  

---

## ✅ Boas Práticas
- Padronização de código com **Prettier**  
- Lint automático com **ESLint**  
- Hooks de pré-commit com **Husky** e **lint-staged**  
- Componentização e reutilização com pastas bem definidas  
- Separação de responsabilidades: componentes, serviços, autenticação, etc.

---

## 📌 Observações  
- Este projeto se conecta a um backend (API) que deve estar rodando para que o projeto funcione de forma adequada.  
- As variáveis de ambiente devem ser definidas em um arquivo .env.local.

   .env.local
      ``` NEXT_PUBLIC_BACKEND_URL=http://localhost:9000 ```  
      
