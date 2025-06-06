

## 🛠️ `README.md` do Back-End (Express + MongoDB)

```markdown
# 🛠️ Book App - Backend

Este é o backend do Book App, desenvolvido em **Node.js com Express** e conectado ao **MongoDB Atlas**. Ele oferece uma API REST para cadastrar livros com foto e localização.

---

## 🔧 Tecnologias

- Node.js
- Express
- MongoDB Atlas + Mongoose
- Multer (upload de arquivos)
- dotenv
- CORS

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/raissabispo/book-app-backend.git
cd book-app/backend
````

2. Instale as dependências:

```bash
npm install
```

3. Crie o arquivo `.env` com sua URI do MongoDB:

```
MONGODB_URI=mongodb+srv://usuario:senha@seu-cluster.mongodb.net/meubanco
```

4. Inicie o servidor:

```bash
node index.js
```

---

## 📡 Rotas

### `GET /books`

Retorna todos os livros cadastrados.

### `POST /books`

Cria um novo livro. Espera:

* `name` (string)
* `description` (string)
* `latitude` (number)
* `longitude` (number)
* `photo` (file - imagem)

---


