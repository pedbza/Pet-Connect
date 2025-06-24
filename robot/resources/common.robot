*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${SERVER_URL}    http://localhost:3000
${BROWSER}       Chrome

*** Keywords ***
Abrir Navegador e Acessar o Site
    Open Browser    ${SERVER_URL}    ${BROWSER}
    Maximize Browser Window

Fechar Navegador
    Close Browser