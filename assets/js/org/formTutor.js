// formTutor.js
// Envio e validação do formulário de cadastro do tutor
document.querySelector('#loginModalTutor .back form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const data = {
    nome: document.getElementById('tutorNome').value.trim(),
    email: document.getElementById('tutorEmail').value.trim(),
    telefone: document.getElementById('tutorTelefone').value.trim(),
    genero: document.getElementById('tutorGenero').value,
    senha: document.getElementById('tutorSenha').value,
    confirmarSenha: document.getElementById('tutorConfirmarSenha').value
  };

  const erro = validarCamposTutor(data);
  if (erro) {
    Swal.fire({ icon: 'error', title: 'Erro de Validação', text: erro });
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/tutores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (response.ok) {
      Swal.fire({ icon: 'success', title: 'Sucesso!', text: 'Cadastro de tutor realizado com sucesso!' });
      closeModal('loginModalTutor');
    } else {
      Swal.fire({ icon: 'error', title: 'Erro', text: result.message || 'Erro ao cadastrar tutor.' });
    }
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Erro de conexão com o servidor.' });
  }
});

// Login de Tutor
document.querySelector('#formLoginTutor').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('tutorLoginEmail').value.trim();
  const senha = document.getElementById('tutorLoginSenha').value;

  try {
    const response = await fetch('http://localhost:3000/tutores/login', {
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
        window.location.href = '/painel-tutor.html';
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
