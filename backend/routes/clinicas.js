// backend/routes/clinicas.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
try {
    const {
      nome_estabelecimento, email, telefone, endereco, cep,
      cnpj, servicos, tipo, infraestrutura, senha
    } = req.body;

    // Verifica se o CNPJ ou e-mail já existem
    const existing = await db.query(
      'SELECT * FROM clinicas WHERE email = $1 OR cnpj = $2',
      [email, cnpj]
    );
    if (existing.rows.length > 0) {
      return res.status(400).json({ message: 'Email ou CNPJ já cadastrados.' });
    }

    await db.query(`
      INSERT INTO clinicas (nome_estabelecimento, email, telefone, endereco, cep, cnpj, servicos, tipo, infraestrutura, senha)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `, [nome_estabelecimento, email, telefone, endereco, cep, cnpj, servicos, tipo, infraestrutura, senha]);

    res.status(201).json({ message: 'Clínica cadastrada com sucesso.' });
  } catch (err) {
    console.error('Erro ao cadastrar clínica:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});
// Rota de login da clínica
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const result = await db.query('SELECT * FROM clinicas WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Email não cadastrado.' });
    }

    const clinica = result.rows[0];

    if (senha !== clinica.senha) {
      return res.status(401).json({ message: 'Senha inválida.' });
    }

    return res.status(200).json({ message: 'Login realizado com sucesso', nome: clinica.nome_estabelecimento });
  } catch (err) {
    console.error('Erro no login da clínica:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});


module.exports = router;
