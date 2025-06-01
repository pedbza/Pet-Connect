// validator.js
//validações de campos (nome, email, telefone, etc).
function validarCamposTutor(data) {
  const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(data.nome);
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const telefoneValido = /^\d{11}$/.test(data.telefone);
  const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(data.senha);

  if (!nomeValido) return "Nome inválido. Apenas letras são permitidas.";
  if (!emailValido) return "Email inválido.";
  if (!telefoneValido) return "Telefone deve conter exatamente 11 dígitos.";
  if (!senhaValida) return "A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.";
  if (data.senha !== data.confirmarSenha) return "As senhas não coincidem.";

  return null;
}

function validarCamposClinica(data) {
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  const cnpjValido = /^\d{14}$/.test(data.cnpj);
  const telefoneValido = /^\d{11}$/.test(data.telefone);
  const senhaValida = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(data.senha);

  if (!emailValido) return "Email inválido.";
  if (!cnpjValido) return "CNPJ inválido. Deve conter exatamente 14 números.";
  if (!telefoneValido) return "Telefone deve conter exatamente 11 dígitos.";
  if (!senhaValida) return "A senha deve conter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.";
  if (data.senha !== data.confirmarSenha) return "As senhas não coincidem.";

  return null;
}
