const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../db');

// Configuração do multer para upload da imagem
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // pasta para salvar as imagens
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Rota para cadastrar nova clínica (sem upload de imagem)
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

// Rota para login da clínica
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

// Rota para atualizar dados da clínica, incluindo upload de imagem
router.post('/:id', upload.single('imagem'), async (req, res) => {
  const { id } = req.params;
  const {
    nome_estabelecimento, email, telefone, endereco, cep,
    cnpj, servicos, tipo, infraestrutura, senha
  } = req.body;
  const imagem = req.file ? req.file.filename : null;

  try {
    // Montar query dinâmica para incluir ou não o campo imagem
    let query = `
      UPDATE clinicas SET 
        nome_estabelecimento = $1,
        email = $2,
        telefone = $3,
        endereco = $4,
        cep = $5,
        cnpj = $6,
        servicos = $7,
        tipo = $8,
        infraestrutura = $9,
        senha = $10
    `;
    const values = [nome_estabelecimento, email, telefone, endereco, cep, cnpj, servicos, tipo, infraestrutura, senha];

    if (imagem) {
      query += `, imagem = $11 WHERE id = $12 RETURNING *`;
      values.push(imagem, id);
    } else {
      query += ` WHERE id = $11 RETURNING *`;
      values.push(id);
    }

    const result = await db.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar clínica:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

// Rota para buscar dados da clínica pelo id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM clinicas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Clínica não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar clínica:', err);
    res.status(500).json({ message: 'Erro no servidor.' });
  }
});

module.exports = router;
