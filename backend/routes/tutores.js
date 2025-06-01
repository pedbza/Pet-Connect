const express = require('express');
const router = express.Router();
const pool = require('../db');
const db = require('../db');
// Rota para cadastro de tutor
router.post('/', async (req, res) => {
  const { nome, email, telefone, genero, senha } = req.body;

  if (!nome || !email || !telefone || !genero || !senha) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

 try {
    const { nome, email, telefone, genero, senha } = req.body;

    // Verifica se o e-mail já existe
    const existingTutor = await db.query('SELECT * FROM tutores WHERE email = $1', [email]);
    if (existingTutor.rows.length > 0) {
      return res.status(400).json({ message: 'Email já cadastrado.' });
    }

    await db.query(`
      INSERT INTO tutores (nome, email, telefone, genero, senha)
      VALUES ($1, $2, $3, $4, $5)
    `, [nome, email, telefone, genero, senha]);

    res.status(201).json({ message: 'Tutor cadastrado com sucesso.' });
  } catch (err) {
    console.error('Erro ao cadastrar tutor:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});
// Rota de login do tutor
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const result = await db.query('SELECT * FROM tutores WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Email não cadastrado.' });
    }

    const tutor = result.rows[0];

    if (senha !== tutor.senha) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    return res.status(200).json({ message: 'Login realizado com sucesso', nome: tutor.nome });
  } catch (err) {
    console.error('Erro no login do tutor:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});


module.exports = router;
