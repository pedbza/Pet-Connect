const request = require('supertest');
const app = require('../../index');
const db = require('../../db');

describe('API de Tutores', () => {
  /**
   * @id TUTOR-API-001
   * @description Deve cadastrar um novo tutor com sucesso usando dados únicos.
   * @steps
   * 1. Gerar dados de tutor com email e telefone únicos usando timestamp.
   * 2. Enviar requisição POST para /tutores.
   * 3. Verificar se a resposta tem status 201.
   * 4. Verificar a mensagem de sucesso.
   * @expectedResult A API deve retornar status 201 e a mensagem "Tutor cadastrado com sucesso.".
   */
  test('Deve cadastrar um novo tutor com sucesso', async () => {
    // Arrange
    const timestamp = Date.now();
    const tutorUnico = {
      nome: `Tutor Teste ${timestamp}`,
      email: `tutor-${timestamp}@teste.com`,
      telefone: `119${String(timestamp).slice(-8)}`,
      genero: 'outro',
      senha: 'senhaforte123',
    };

    // Act
    const response = await request(app).post('/tutores').send(tutorUnico);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Tutor cadastrado com sucesso.');
  });

  /**
   * @id TUTOR-API-002
   * @description Deve impedir o cadastro de um tutor com um email que já existe.
   * @steps
   * 1. Definir dados de um tutor com um email estático.
   * 2. Enviar a primeira requisição POST para garantir que o tutor exista.
   * 3. Enviar uma SEGUNDA requisição POST com os mesmos dados.
   * 4. Verificar se a segunda resposta tem status 400.
   * @expectedResult A API deve retornar status 400 e a mensagem "Email já cadastrado.".
   */
  test('Deve retornar erro ao tentar cadastrar um tutor com email duplicado', async () => {
    // Arrange
    const tutorDuplicado = {
      nome: 'Tutor Duplicado Teste',
      email: 'duplicado@teste.com', // Email estático
      telefone: '11987654321',
      genero: 'feminino',
      senha: 'senha123',
    };
    // Garante que o usuário exista (não importa a resposta da primeira chamada)
    await request(app).post('/tutores').send(tutorDuplicado);

    // Act: Tenta cadastrar o mesmo usuário novamente
    const response = await request(app).post('/tutores').send(tutorDuplicado);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email já cadastrado.');
  });

  /**
   * @id TUTOR-API-003
   * @description Deve realizar o login com um tutor sabidamente válido.
   * @steps
   * 1. Usar credenciais de um usuário que deve existir no banco de dados.
   * 2. Enviar requisição POST para /tutores/login.
   * 3. Verificar se a resposta tem status 200 e contém o nome do tutor.
   * @expectedResult A API deve retornar status 200 e os dados do login.
   */
  test('Deve realizar login com sucesso para um usuário existente', async () => {
    // Arrange
    // PRÉ-REQUISITO: Um usuário com este email deve existir no banco para este teste passar.
    // Pode ser o usuário do teste TUTOR-API-002 ou um criado manualmente.
    const credenciais = {
      email: 'duplicado@teste.com',
      senha: 'senha123',
    };

    // Act
    const response = await request(app).post('/tutores/login').send(credenciais);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login realizado com sucesso');
    expect(response.body).toHaveProperty('nome');
  });

  /**
   * @id TUTOR-API-004
   * @description Deve retornar erro ao tentar fazer login com senha incorreta.
   * @steps
   * 1. Usar email de um usuário válido, mas com senha errada.
   * 2. Enviar requisição POST para /tutores/login.
   * 3. Verificar se a resposta tem status 401.
   * @expectedResult A API deve retornar status 401 e a mensagem "Senha inválida.".
   */
  test('Deve retornar erro de senha inválida no login', async () => {
    // Arrange
    const credenciais = {
      email: 'duplicado@teste.com', // Email válido do teste anterior
      senha: 'senha-errada-propositalmente',
    };

    // Act
    const response = await request(app).post('/tutores/login').send(credenciais);

    // Assert
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Senha inválida.');
  });
});

afterAll(async () => {
  await db.end();
});