// /assets/js/clinica/clinica.js

document.addEventListener('DOMContentLoaded', () => {
  const clinicaId = localStorage.getItem('clinicaId');
  if (!clinicaId) {
    console.error("ID da clínica não encontrado no localStorage. Redirecionando para login...");
    return window.location.href = '/assets/html/loginClinica.html';
  }
  obterClinica(clinicaId);
});

async function obterClinica(clinicaId) {
  try {
    const res = await fetch(`http://localhost:3000/clinicas/${clinicaId}`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const c = await res.json();

    // 1) Campos básicos
    setText('nomeClinica',    c.nome_estabelecimento);
    setText('telefoneClinica',c.telefone);
    setText('enderecoClinica',c.endereco);
    setText('cnpjClinica',    c.cnpj);
    setTextFlexible(['emailClinica','email'], c.email);

    // 2) Serviços → monta <li> em #servicosClinica
    const ul = document.getElementById('servicosClinica');
    if (ul) {
      ul.innerHTML = '';
      if (Array.isArray(c.servicos)) {
        c.servicos.forEach(serv => {
          const li = document.createElement('li');
          li.classList.add('list-group-item');
          li.textContent = serv;
          ul.appendChild(li);
        });
      } else {
        ul.textContent = c.servicos || 'Não informado';
      }
    } else {
      console.warn('#servicosClinica não encontrado');
    }

    // 3) Infraestrutura
    setText('infraestruturaClinica', c.infraestrutura);

    // 4) Imagem (placeholder ou real)
    const imgEl = document.getElementById('imagemClinica');
    if (imgEl) {
      if (c.imagem) {
        // exibe foto real
        imgEl.src = `http://localhost:3000/uploads/${c.imagem}`;
        imgEl.alt = `Foto da clínica ${c.nome_estabelecimento}`;
        imgEl.style.cursor = 'default';
        imgEl.onclick = null;
      } else {
        // exibe placeholder e redireciona ao clicar
        imgEl.src = '/assets/img/_b4e8fbb6-a31d-4f99-9c2a-a93090266b22.jpg';
        imgEl.alt = 'Clique para adicionar foto da clínica';
        imgEl.style.cursor = 'pointer';
        imgEl.onclick = () => {
          window.location.href = '/assets/html/configuracoes.html';
        };
      }
      imgEl.style.display = 'block';
    } else {
      console.warn('#imagemClinica não encontrado');
    }

  } catch (err) {
    console.error("Erro ao obter dados da clínica:", err);
    alert('Não foi possível carregar as informações da clínica.');
  }
}

/**
 * Preenche textContent de #id, se existir.
 */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = text || 'Não informado';
  } else {
    console.warn(`#${id} não encontrado`);
  }
}

/**
 * Tenta preencher o primeiro seletor de um array de IDs.
 * Por exemplo: setTextFlexible(['email','emailClinica'], valor)
 */
function setTextFlexible(ids, text) {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = text || 'Não informado';
      return;
    }
  }
  console.warn(
    `Nenhum dos elementos ${ids.map(i => `#${i}`).join(', ')} encontrado`
  );
}
