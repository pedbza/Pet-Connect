const express = require('express');
const cors = require('cors');

const app = express();

// Middleware CORS deve vir antes das rotas
app.use(cors());
app.use(express.json());

// Rotas
const tutoresRoutes = require('./routes/tutores');
const clinicasRoutes = require('./routes/clinicas'); // <- GARANTA que essa linha exista

app.use('/tutores', tutoresRoutes);
app.use('/clinicas', clinicasRoutes); // <- E essa também

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
