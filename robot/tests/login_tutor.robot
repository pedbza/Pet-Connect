*** Settings ***
Documentation     SUÍTE DE TESTES para o fluxo de LOGIN de tutor.
Resource          ../resources/common.robot
Library           DateTime

Suite Setup       Abrir Navegador e Acessar o Site
Suite Teardown    Fechar Navegador

*** Variables ***
# Pré-requisito: Este usuário DEVE existir no banco de dados.
${VALID_EMAIL}       duplicado@teste.com
${VALID_PASSWORD}    senha123
${INVALID_PASSWORD}  senha-totalmente-errada

*** Test Cases ***
Teste de Sucesso - Deve Realizar Login com Sucesso
    [Documentation]    Testa o login com credenciais válidas e verifica o redirecionamento.
    [Tags]             Login    Sucesso

    # Act
    Go To    ${SERVER_URL}/assets/html/cadastro.html
    Wait Until Element Is Visible    xpath=//a[@data-testid="abrir-modal-tutor-btn"]
    Click Element    xpath=//a[@data-testid="abrir-modal-tutor-btn"]

    # Preenche o formulário de login
    Wait Until Element Is Visible    xpath=//input[@data-testid="login-email-input"]
    Input Text    xpath=//input[@data-testid="login-email-input"]    ${VALID_EMAIL}
    Input Text    xpath=//input[@data-testid="login-senha-input"]    ${VALID_PASSWORD}
    Click Element    xpath=//button[@data-testid="login-entrar-btn"]

    # Assert
    # A melhor forma de verificar o sucesso é checar se fomos para a página correta.
    Wait Until Location Is    ${SERVER_URL}/assets/html/homeTutor.html    timeout=10s
    Page Should Contain Element    xpath=//h1[contains(text(), "Pet Connect")]


Teste de Erro - Deve Exibir Erro Para Senha Incorreta
    [Documentation]    Testa se a aplicação exibe erro ao usar uma senha incorreta.
    [Tags]             Login    Erro    SenhaInvalida

    # Act
    Go To    ${SERVER_URL}/assets/html/cadastro.html
    Wait Until Element Is Visible    xpath=//a[@data-testid="abrir-modal-tutor-btn"]
    Click Element    xpath=//a[@data-testid="abrir-modal-tutor-btn"]

    Wait Until Element Is Visible    xpath=//input[@data-testid="login-email-input"]
    Input Text    xpath=//input[@data-testid="login-email-input"]    ${VALID_EMAIL}
    Input Text    xpath=//input[@data-testid="login-senha-input"]    ${INVALID_PASSWORD}
    Click Element    xpath=//button[@data-testid="login-entrar-btn"]

    # Assert
    Wait Until Element Is Visible    css:.swal2-popup.swal2-show    timeout=10s
    Element Should Contain         css:.swal2-popup.swal2-show    Senha inválida.


Teste de Erro - Deve Exibir Erro Para Email Inexistente
    [Documentation]    Testa se a aplicação exibe erro ao usar um email que não existe.
    [Tags]             Login    Erro    EmailInexistente

    # Arrange
    ${timestamp}=    Get Current Date    result_format=epoch
    ${NON_EXISTENT_EMAIL}=    Set Variable    naoexiste-${timestamp}@dominio.com

    # Act
    Go To    ${SERVER_URL}/assets/html/cadastro.html
    Wait Until Element Is Visible    xpath=//a[@data-testid="abrir-modal-tutor-btn"]
    Click Element    xpath=//a[@data-testid="abrir-modal-tutor-btn"]

    Wait Until Element Is Visible    xpath=//input[@data-testid="login-email-input"]
    Input Text    xpath=//input[@data-testid="login-email-input"]    ${NON_EXISTENT_EMAIL}
    Input Text    xpath=//input[@data-testid="login-senha-input"]    qualquer-senha
    Click Element    xpath=//button[@data-testid="login-entrar-btn"]

    # Assert
    Wait Until Element Is Visible    css:.swal2-popup.swal2-show    timeout=10s
    Element Should Contain         css:.swal2-popup.swal2-show    Email não cadastrado.