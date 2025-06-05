const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware CORS deve vir antes das rotas
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta uploads para acesso das imagens
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
const tutoresRoutes = require('./routes/tutores');
const clinicasRoutes = require('./routes/clinicas'); // <- Certifique que essa linha existe

app.use('/tutores', tutoresRoutes);
app.use('/clinicas', clinicasRoutes); // <- E essa também

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
