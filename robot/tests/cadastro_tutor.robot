*** Settings ***
Documentation     SUÍTE DE TESTES COMPLETA para o fluxo de cadastro de tutor.
Resource          ../resources/common.robot
Library           DateTime
Library           String

Suite Setup       Abrir Navegador e Acessar o Site
Suite Teardown    Fechar Navegador

*** Test Cases ***
Teste de Sucesso - Deve Cadastrar um Novo Tutor com Sucesso
    [Documentation]    Testa o fluxo completo de cadastro de um novo tutor com dados válidos.
    [Tags]             Sucesso

    # Arrange
    ${timestamp}=    Get Current Date    result_format=epoch
    ${random_letras}=    Generate Random String    8    [LOWER]
    ${nome_valido}=  Set Variable    Tutor Robot ${random_letras}
    ${email}=        Set Variable    tutor-sucesso-${timestamp}@teste.com
    ${senha_forte}=  Set Variable    Senha@Forte123

    # Act
    Go To    ${SERVER_URL}/assets/html/cadastro.html
    Wait Until Element Is Visible    xpath=//a[@data-testid="abrir-modal-tutor-btn"]
    Click Element    xpath=//a[@data-testid="abrir-modal-tutor-btn"]
    Wait Until Element Is Visible    xpath=//button[@data-testid="ir-para-cadastro-tutor-btn"]
    Click Element    xpath=//button[@data-testid="ir-para-cadastro-tutor-btn"]
    Wait Until Element Is Visible    xpath=//input[@data-testid="tutor-nome-input"]
    Input Text    xpath=//input[@data-testid="tutor-nome-input"]          ${nome_valido}
    Input Text    xpath=//input[@data-testid="tutor-email-input"]         ${email}
    Input Text    xpath=//input[@data-testid="tutor-telefone-input"]      119${timestamp}
    Select From List By Value    xpath=//select[@data-testid="tutor-genero-select"]    outro
    Input Text    xpath=//input[@data-testid="tutor-senha-input"]         ${senha_forte}
    Input Text    xpath=//input[@data-testid="tutor-confirmar-senha-input"]    ${senha_forte}
    Click Element    xpath=//button[@data-testid="tutor-cadastrar-btn"]

    # Assert
    Wait Until Element Is Visible    css:.swal2-html-container    timeout=10s
    Element Should Contain         css:.swal2-html-container    Cadastro de tutor realizado com sucesso!


Teste de Erro - Deve Exibir Erro de Validação Para Nome com Números
    [Documentation]    Testa se a aplicação exibe a mensagem de erro correta ao tentar cadastrar um nome com números.
    [Tags]             Erro    Validacao    NomeInvalido

    # Arrange
    ${timestamp}=    Get Current Date    result_format=epoch
    ${nome_invalido}=    Set Variable    Tutor Com Numeros ${timestamp}
    ${email}=        Set Variable    tutor-nome-erro-${timestamp}@teste.com
    ${senha_forte}=  Set Variable    Senha@Forte123

    # Act
    Go To    ${SERVER_URL}/assets/html/cadastro.html
    Wait Until Element Is Visible    xpath=//a[@data-testid="abrir-modal-tutor-btn"]
    Click Element    xpath=//a[@data-testid="abrir-modal-tutor-btn"]
    Wait Until Element Is Visible    xpath=//button[@data-testid="ir-para-cadastro-tutor-btn"]
    Click Element    xpath=//button[@data-testid="ir-para-cadastro-tutor-btn"]
    Wait Until Element Is Visible    xpath=//input[@data-testid="tutor-nome-input"]
    Input Text    xpath=//input[@data-testid="tutor-nome-input"]          ${nome_invalido}
    Input Text    xpath=//input[@data-testid="tutor-email-input"]         ${email}
    Input Text    xpath=//input[@data-testid="tutor-telefone-input"]      119${timestamp}
    Select From List By Value    xpath=//select[@data-testid="tutor-genero-select"]    outro
    Input Text    xpath=//input[@data-testid="tutor-senha-input"]         ${senha_forte}
    Input Text    xpath=//input[@data-testid="tutor-confirmar-senha-input"]    ${senha_forte}
    Click Element    xpath=//button[@data-testid="tutor-cadastrar-btn"]

    # Assert
    Wait Until Element Is Visible    css:.swal2-popup.swal2-show    timeout=10s
    Element Should Contain         css:.swal2-popup.swal2-show    Nome inválido. Apenas letras são permitidas.


Teste de Erro - Deve Exibir Erro de Validação Para Senha Fraca
    [Documentation]    Testa se a aplicação exibe a mensagem de erro correta ao tentar cadastrar com uma senha fraca.
    [Tags]             Erro    Validacao    SenhaFraca

    # Arrange
    ${timestamp}=    Get Current Date    result_format=epoch
    ${random_letras}=    Generate Random String    8    [LOWER]
    ${nome_valido}=  Set Variable    Tutor Robot ${random_letras}
    ${email}=        Set Variable    tutor-senha-erro-${timestamp}@teste.com
    ${senha_fraca}=  Set Variable    senhafraca

    # Act
    Go To    ${SERVER_URL}/assets/html/cadastro.html
    Wait Until Element Is Visible    xpath=//a[@data-testid="abrir-modal-tutor-btn"]
    Click Element    xpath=//a[@data-testid="abrir-modal-tutor-btn"]
    Wait Until Element Is Visible    xpath=//button[@data-testid="ir-para-cadastro-tutor-btn"]
    Click Element    xpath=//button[@data-testid="ir-para-cadastro-tutor-btn"]
    Wait Until Element Is Visible    xpath=//input[@data-testid="tutor-nome-input"]
    Input Text    xpath=//input[@data-testid="tutor-nome-input"]          ${nome_valido}
    Input Text    xpath=//input[@data-testid="tutor-email-input"]         ${email}
    Input Text    xpath=//input[@data-testid="tutor-telefone-input"]      118${timestamp}
    Select From List By Value    xpath=//select[@data-testid="tutor-genero-select"]    outro
    Input Text    xpath=//input[@data-testid="tutor-senha-input"]         ${senha_fraca}
    Input Text    xpath=//input[@data-testid="tutor-confirmar-senha-input"]    ${senha_fraca}
    Click Element    xpath=//button[@data-testid="tutor-cadastrar-btn"]

    # Assert
    Wait Until Element Is Visible    css:.swal2-popup.swal2-show    timeout=10s
    Element Should Contain         css:.swal2-popup.swal2-show    A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.