const { validarCamposTutor } = require('../../../assets/js/tutor_clinica/validator');

// Descreve o conjunto de testes para a função validarCamposTutor
describe('Função de Validação de Tutor: validarCamposTutor', () => {

    // Teste 1:
    test('deve retornar null para dados de tutor completamente válidos', () => {
        // Arrange
        const dadosValidos = {
            nome: 'Usuario Valido',
            email: 'valido@teste.com',
            telefone: '11987654321',
            senha: 'Senha@Forte123',
            confirmarSenha: 'Senha@Forte123'
        };
        // Act & Assert
        expect(validarCamposTutor(dadosValidos)).toBeNull();
    });

    // Teste 2: Validando o nome
    test('deve retornar mensagem de erro para nome com números', () => {
        const dadosInvalidos = {
            nome: 'Usuario Com 123', // Inválido
            email: 'valido@teste.com',
            telefone: '11987654321',
            senha: 'Senha@Forte123',
            confirmarSenha: 'Senha@Forte123'
        };
        expect(validarCamposTutor(dadosInvalidos)).toBe('Nome inválido. Apenas letras são permitidas.');
    });

    // Teste 3: Validando a senha
    test('deve retornar mensagem de erro para senha fraca', () => {
        const dadosInvalidos = {
            nome: 'Usuario Valido',
            email: 'valido@teste.com',
            telefone: '11987654321',
            senha: 'fraca', // Inválido
            confirmarSenha: 'fraca'
        };
        const mensagemEsperada = "A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.";
        expect(validarCamposTutor(dadosInvalidos)).toBe(mensagemEsperada);
    });

    // Teste 4: Validando a confirmação de senha
    test('deve retornar mensagem de erro se as senhas não coincidirem', () => {
        const dadosInvalidos = {
            nome: 'Usuario Valido',
            email: 'valido@teste.com',
            telefone: '11987654321',
            senha: 'Senha@Forte123',
            confirmarSenha: 'Senha@Diferente456' // Inválido
        };
        expect(validarCamposTutor(dadosInvalidos)).toBe('As senhas não coincidem.');
    });
});