# Pet-Connect

Projeto PetConnect (Teste de Software)

Este é um projeto acadêmico desenvolvido para a disciplina de Teste de Software. A aplicação simula uma plataforma de conexão entre tutores de pets e clínicas veterinárias, permitindo cadastros, logins e consultas.

O foco principal do projeto é a implementação de uma suíte de testes automatizados em múltiplas camadas, demonstrando a aplicação prática de diferentes tipos e ferramentas de teste em um sistema web completo.

---

## Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
- **Backend:** Node.js
- **Banco de Dados:** PostgreSQL
- **Testes Automatizados:**
  - Testes Unitários: Jest
  - Testes de API: Supertest (com Jest)
  - Testes End-to-End (E2E): Robot Framework (com SeleniumLibrary)

---

## Pré-requisitos

- Node.js
- Python 
- PostgreSQL
- Git

---

## Instalação e Configuração

### 1. Clonar o Repositório
```bash
git clone https://github.com/pedbza/Pet-Connect.git
cd Pet-Connect
```

### 2. Configurar o Banco de Dados
- Abra o PostgreSQL (psql ou pgAdmin).
- Crie um banco de dados chamado `petconnect`.
- Edite o arquivo `backend/db.js` se necessário:
  - Usuário: `postgres`
  - Senha: `93579220`
  - Porta: `5432`
  - Banco: `petconnect`

### SQL Script

```sql
-- Criação do banco de dados
CREATE DATABASE petconnect;

-- Conectar ao banco de dados petconnect antes de criar as tabelas
\c petconnect;

-- Criação da tabela de tutores
CREATE TABLE tutores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL,
    genero VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Criação da tabela de clínicas
CREATE TABLE clinicas (
    id SERIAL PRIMARY KEY,
    nome_estabelecimento VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    telefone VARCHAR(11) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    servicos TEXT[],
    tipo VARCHAR(100) NOT NULL,
    infraestrutura TEXT,
    senha VARCHAR(255) NOT NULL,
    imagem VARCHAR(255)
);  

  ```

### 3. Instalar Dependências do Backend
```bash
cd backend
npm install
```

### 4. Instalar Dependências dos Testes E2E (Python)
Crie um arquivo `requirements.txt` na pasta `robot/` com:
```txt
robotframework
robotframework-seleniumlibrary
```
Instale com:
```bash
pip install -r robot/requirements.txt
```

---

## Executando o Projeto

Para rodar a aplicação manualmente:
```bash
cd backend
npm start
```
O backend estará em http://localhost:3000.
Abra o arquivo `index.html` (na raiz do projeto) no navegador para acessar o frontend.

---

## Executando os Testes Automatizados

### Testes Unitários e de API (Jest/Supertest)
Execute dentro da pasta `backend/`:
- Testes Unitários:
  ```bash
  npm run test:unit
  ```
- Testes de API:
  ```bash
  npm run test:api
  ```
- Todos os testes (unitário + API):
  ```bash
  npm test
  ```

### Testes End-to-End (Robot Framework)
Pré-requisito: O backend deve estar rodando (`npm start`).

Na raiz do projeto, execute:
```bash
robot -d results robot/tests
```
Os relatórios (`log.html` e `report.html`) estarão na pasta `results`.

---



## Estrutura de Testes

- **Unitários (Jest):** `backend/__tests__/unit/`
- **API (Supertest):** `backend/__tests__/api/`
- **End-to-End (Robot Framework):** `robot/tests/`

---

## Observações
- O backend serve apenas a API e arquivos estáticos.
- O frontend é composto por arquivos HTML/CSS/JS na raiz e em `assets/`.
- Ajuste as credenciais do banco conforme sua máquina.

---

## Alunos

- RICHARD RODRIGUES 
- PEDRO HENRIQUE MARTINS    
- MICHAEL GABRIEL   
- PABLO HENRIQUE DOURADO    
- MICAEL ARTHUR FERRO 


---


