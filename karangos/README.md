# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Criando o projeto Karangos

Execute no terminal:

npm create vite@latest

Perguntas feitas pelo comando:
* OK to proceed? ~> y
* Project name ~> karangos
* Select a framework ~> React
* Select a variant ~> JavaScript + SWC

Após o término do comando, execute, ainda no terminal:

cd karangos
npm install
npm run dev

# Instalando a biblioteca Material UI e seus acessórios

(Derrube o projeto com Ctrl+C, caso ele esteja sendo executado. Assegure-se de estar dentro da pasta "karangos")

npm install @mui/material @emotion/react @emotion/styled

npm install @fontsource/roboto

npm install @mui/icons-material

npm install react-router-dom