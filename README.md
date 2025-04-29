# Sistema de Cadastro de Produtos

Este é um sistema de cadastro de produtos desenvolvido em React.js com Bootstrap para o frontend e json-server como backend.

## User Stories

### [US01] Cadastro de Categorias
**Descrição:**
COMO um usuário do sistema
QUERO cadastrar categorias de produtos
PARA organizar melhor o catálogo de produtos

**Critérios de Aceite:**
- Deve ser possível criar uma nova categoria
- Deve ser possível editar uma categoria existente
- Deve ser possível excluir uma categoria
- Deve ser possível visualizar todas as categorias cadastradas
- Cada categoria deve ter um nome e uma descrição

**Regras de Negócio:**
- O nome da categoria é obrigatório
- Não é permitido cadastrar categorias com o mesmo nome
- Ao excluir uma categoria, todos os produtos associados devem ser atualizados

### [US02] Cadastro de Produtos
**Descrição:**
COMO um usuário do sistema
QUERO cadastrar produtos
PARA manter um inventário atualizado dos itens disponíveis

**Critérios de Aceite:**
- Deve ser possível criar um novo produto
- Deve ser possível editar um produto existente
- Deve ser possível excluir um produto
- Deve ser possível visualizar todos os produtos cadastrados
- Cada produto deve ter nome, quantidade, valor e categoria

**Regras de Negócio:**
- O nome do produto é obrigatório
- A quantidade deve ser um número inteiro positivo
- O valor deve ser um número positivo
- O produto deve estar associado a uma categoria existente
- Não é permitido cadastrar produtos com o mesmo nome

### [US03] Visualização de Produtos por Categoria
**Descrição:**
COMO um usuário do sistema
QUERO visualizar produtos agrupados por categoria
PARA facilitar a busca e organização dos produtos

**Critérios de Aceite:**
- Deve ser possível filtrar produtos por categoria
- Deve ser possível visualizar todos os produtos de uma categoria específica
- A lista deve mostrar o nome, quantidade e valor de cada produto

**Regras de Negócio:**
- Ao selecionar uma categoria, devem ser exibidos apenas os produtos pertencentes a ela
- A lista deve ser ordenada alfabeticamente pelo nome do produto

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

## Executando o projeto

1. Em um terminal, inicie o servidor backend (json-server):
```bash
npm run server
# ou
yarn server
```

2. Em outro terminal, inicie o frontend:
```bash
npm start
# ou
yarn start
```

O backend estará rodando em `http://localhost:3001` e o frontend em `http://localhost:3000`.

## Funcionalidades

- Cadastro de produtos
- Cadastro de categorias
- Listagem de produtos
- Listagem de categorias
- Edição e exclusão de produtos
- Edição e exclusão de categorias 