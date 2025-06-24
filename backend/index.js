const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../')));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
const tutoresRoutes = require('./routes/tutores');
const clinicasRoutes = require('./routes/clinicas');

app.use('/tutores', tutoresRoutes);
app.use('/clinicas', clinicasRoutes);

// Apenas inicie o servidor se este arquivo for executado diretamente
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
}

// Exporte o app para que os testes possam usá-lo
module.exports = app;