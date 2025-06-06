// index.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Leitura explícita do .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Debug da URI
console.log('🔍 URI carregada do .env:', process.env.MONGODB_URI);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado ao MongoDB Atlas via .env'))
.catch(err => console.error('❌ Erro na conexão:', err));

// Schema do Livro
const Book = mongoose.model('Book', {
  name: String,
  description: String,
  photo: String,
  latitude: Number,
  longitude: Number,
});

// Configuração de upload com multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

// Rota GET para buscar livros
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Rota POST para criar um livro
app.post('/books', upload.single('photo'), async (req, res) => {
  try {
    const { name, description, latitude, longitude } = req.body;
    const photo = req.file ? req.file.path : null;
    const book = new Book({ name, description, photo, latitude, longitude });
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao salvar livro' });
  }
});

// Inicialização do servidor
app.listen(3000, () => console.log('🚀 Backend listening on port 3000'));
