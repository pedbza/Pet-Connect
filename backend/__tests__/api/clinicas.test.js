const request = require('supertest');
const app = require('../../index');
const db = require('../../db');

describe('API de Clínicas', () => {
  /**
   * @id CLINICA-API-001
   * @description Deve listar todas as clínicas cadastradas.
   * @steps
   * 1. Enviar requisição GET para /clinicas.
   * 2. Verificar se a resposta tem status 200 e é um array.
   * @expectedResult A API deve retornar status 200 e um array no corpo da resposta.
   */
  test('Deve retornar uma lista de clínicas', async () => {
    // Arrange & Act
    const response = await request(app).get('/clinicas');

    // Assert
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  /**
   * @id CLINICA-API-002
   * @description Deve buscar uma clínica específica por ID.
   * @steps
   * 1. Fazer uma requisição GET para /clinicas para obter uma lista de clínicas.
   * 2. Pegar o ID da primeira clínica da lista.
   * 3. Fazer uma requisição GET para /clinicas/:id com o ID obtido.
   * 4. Verificar se a resposta tem status 200 e contém os dados da clínica correta.
   * @expectedResult A API deve retornar status 200 e os dados da clínica solicitada.
   */
  test('Deve retornar uma clínica específica por ID', async () => {
    // Arrange: Primeiro, obtemos a lista de todas as clínicas
    const listaResponse = await request(app).get('/clinicas');
    const clinicas = listaResponse.body;

    // Se não houver clínicas, pulamos o teste.
    if (clinicas.length === 0) {
      console.log('Nenhuma clínica encontrada para testar a busca por ID. Pulando teste.');
      return;
    }
    const primeiraClinicaId = clinicas[0].id;

    // Act: Agora buscamos pela primeira clínica
    const response = await request(app).get(`/clinicas/${primeiraClinicaId}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(primeiraClinicaId);
    expect(response.body).toHaveProperty('nome_estabelecimento');
  });

  /**
   * @id CLINICA-API-003
   * @description Deve retornar erro 404 ao buscar uma clínica com ID inexistente.
   * @steps
   * 1. Definir um ID numérico muito alto que provavelmente não existe.
   * 2. Enviar requisição GET para /clinicas/:id.
   * 3. Verificar se a resposta tem status 404.
   * @expectedResult A API deve retornar status 404.
   */
  test('Deve retornar 404 para um ID de clínica que não existe', async () => {
    // Arrange
    const idInexistente = 9999999;

    // Act
    const response = await request(app).get(`/clinicas/${idInexistente}`);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Clínica não encontrada');
  });
});

afterAll(async () => {
  await db.end();
});