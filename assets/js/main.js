// main.js
//inicialização do DOM e configuração do TomSelect.
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('loginModalTutor').style.display = 'none';
  document.getElementById('loginModalClinic').style.display = 'none';

  const servicos = document.getElementById('servicos');
  if (servicos) {
    new TomSelect(servicos, {
      plugins: ['remove_button'],
      persist: false,
      create: false,
      placeholder: 'Selecione os serviços...',
    });
  }

  apenasNumeros('tutorTelefone', 11);
  apenasNumeros('clinicaTelefone', 11);
  apenasNumeros('clinicaCnpj', 14);
});
