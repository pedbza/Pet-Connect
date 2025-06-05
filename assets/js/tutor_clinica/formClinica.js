// formClinica.js
// Envio e validação do formulário de cadastro da clínica
document.querySelector('#loginModalClinic .back form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const servicosSelecionados = Array.from(document.getElementById('servicos').selectedOptions).map(opt => opt.value);

  const data = {
    nome_estabelecimento: document.getElementById('clinicaNome').value.trim(),
    email: document.getElementById('clinicaEmail').value.trim(),
    telefone: document.getElementById('clinicaTelefone').value.trim(),
    endereco: document.getElementById('clinicaEndereco').value.trim(),
    cep: document.getElementById('clinicaCep').value.trim(),
    cnpj: document.getElementById('clinicaCnpj').value.trim(),
    servicos: servicosSelecionados,
    tipo: document.getElementById('clinicaTipo').value,
    infraestrutura: document.getElementById('clinicaInfraestrutura').value,
    senha: document.getElementById('clinicaSenha').value,
    confirmarSenha: document.getElementById('clinicaConfirmarSenha').value
  };

  const erro = validarCamposClinica(data);
  if (erro) {
    Swal.fire({ icon: 'error', title: 'Erro de Validação', text: erro });
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/clinicas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (response.ok) {
      Swal.fire({ icon: 'success', title: 'Sucesso!', text: 'Cadastro da clínica realizado com sucesso!' });
      closeModal('loginModalClinic');
    } else {
      Swal.fire({ icon: 'error', title: 'Erro', text: result.message || 'Erro ao cadastrar clínica.' });
    }
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Erro de conexão com o servidor.' });
  }
});

// Login de Clínica
document.querySelector('#formLoginClinica').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('clinicaLoginEmail').value.trim();
  const senha = document.getElementById('clinicaLoginSenha').value;

  try {
    const response = await fetch('http://localhost:3000/clinicas/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const result = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Login efetuado com sucesso!',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        window.location.href = '/painel-clinica.html';
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro no login',
        text: result.message || 'Email ou senha inválidos.'
      });
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Erro de conexão',
      text: 'Não foi possível conectar ao servidor.'
    });
  }
});
