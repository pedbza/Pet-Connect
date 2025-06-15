// configuracao.js

document.addEventListener('DOMContentLoaded', init);

async function init() {
  const clinicaId = localStorage.getItem('clinicaId');
  if (!clinicaId) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'ID da clínica não encontrado.' });
    return;
  }

  try {
    // 1) Busca dados da clínica
    const res = await fetch(`http://localhost:3000/clinicas/${clinicaId}`);
    const clinica = await res.json();
    if (!res.ok) throw new Error(clinica.message || 'Erro ao carregar dados.');

    // 2) Popula o form
    populateForm(clinica);

    // 3) Inicializa o multi-select (Choices.js)
    initMultiSelect();

    // 4) Registra outros listeners
    bindToggleSenha();
    bindFormSubmit(clinicaId);
    bindDeleteButton(clinicaId);

  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Erro de conexão', text: err.message });
  }
}

function populateForm(clinica) {
  document.getElementById('nomeEstabelecimento').value    = clinica.nome_estabelecimento  || '';
  document.getElementById('telefone').value               = clinica.telefone             || '';
  document.getElementById('endereco').value               = clinica.endereco             || '';
  document.getElementById('email').value                  = clinica.email                || '';
  document.getElementById('clinicaCep').value             = clinica.cep                  || '';
  document.getElementById('cnpj').value                   = clinica.cnpj                 || '';
  document.getElementById('clinicaTipo').value            = clinica.tipo                 || '';
  document.getElementById('clinicaInfraestrutura').value  = clinica.infraestrutura       || '';

  // pré-seleciona serviços (array ou string JSON/CSV)
  const select = document.getElementById('servicos');
  let arr = [];
  if (clinica.servicos) {
    if (Array.isArray(clinica.servicos)) arr = clinica.servicos;
    else {
      try { arr = JSON.parse(clinica.servicos); }
      catch { arr = String(clinica.servicos).split(','); }
    }
  }
  Array.from(select.options).forEach(opt => {
    opt.selected = arr.includes(opt.value);
  });
}

function initMultiSelect() {
  new Choices('#servicos', {
    removeItemButton: true,
    placeholder: true,
    placeholderValue: 'Selecione os serviços...',
    shouldSort: false,
    itemSelectText: ''
  });
}

function bindToggleSenha() {
  document.getElementById('toggleSenha').addEventListener('change', () => {
    const type = document.getElementById('toggleSenha').checked ? 'text' : 'password';
    document.getElementById('senha').type          = type;
    document.getElementById('confirmarSenha').type = type;
  });
}

function bindFormSubmit(clinicaId) {
  document.getElementById('configuracaoForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // validação de senha
    const senha = document.getElementById('senha').value.trim();
    const confirma = document.getElementById('confirmarSenha').value.trim();
    if (senha !== confirma) {
      return Swal.fire({ icon: 'error', title: 'Erro', text: 'As senhas não coincidem.' });
    }

    // monta FormData
    const fd = new FormData();
    fd.append('nome_estabelecimento', document.getElementById('nomeEstabelecimento').value.trim());
    fd.append('email',               document.getElementById('email').value.trim());
    fd.append('telefone',            document.getElementById('telefone').value.trim());
    fd.append('endereco',            document.getElementById('endereco').value.trim());
    fd.append('cep',                 document.getElementById('clinicaCep').value.trim());
    fd.append('cnpj',                document.getElementById('cnpj').value.trim());
    fd.append('tipo',                document.getElementById('clinicaTipo').value);
    fd.append('infraestrutura',      document.getElementById('clinicaInfraestrutura').value.trim());
    fd.append('senha',               senha);

    // serviços: cada valor selecionado vira um campo 'servicos'
    const servicosSelect = document.getElementById('servicos');
    Array.from(servicosSelect.selectedOptions)
      .map(o => o.value)
      .forEach(s => fd.append('servicos', s));

    // imagem, se houver
    const img = document.getElementById('fotoClinica').files[0];
    if (img) fd.append('imagem', img);

    // envia PUT
    try {
      const res = await fetch(`http://localhost:3000/clinicas/${clinicaId}`, {
        method: 'PUT',
        body: fd
      });
      const result = await res.json();
      if (res.ok) {
        Swal.fire({ icon: 'success', title: 'Sucesso', text: 'Dados atualizados!' });
      } else {
        Swal.fire({ icon: 'error', title: 'Erro', text: result.message || 'Erro ao atualizar.' });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Problema de conexão.' });
    }
  });
}

function bindDeleteButton(clinicaId) {
  document.getElementById('deleteButton').addEventListener('click', async () => {
    const confirm = await Swal.fire({
      icon: 'warning',
      title: 'Tem certeza?',
      text: 'Esta ação é irreversível.',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    });
    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/clinicas/${clinicaId}`, { method: 'DELETE' });
      if (res.ok) {
        localStorage.removeItem('clinicaId');
        await Swal.fire({ icon: 'success', title: 'Excluída', text: 'Conta removida.' });
        window.location.href = '/index.html';
      } else {
        const err = await res.json();
        Swal.fire({ icon: 'error', title: 'Erro', text: err.message || 'Não foi possível excluir.' });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Problema de conexão.' });
    }
  });
}
