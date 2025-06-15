document.addEventListener('DOMContentLoaded', () => {
  carregarClinicas();
});

async function carregarClinicas() {
  try {
    const res = await fetch('http://localhost:3000/clinicas');
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const clinicas = await res.json();

    const carousel = document.querySelector('.team-carousel');
    carousel.innerHTML = ''; // limpa qualquer conteúdo

    clinicas.forEach(c => {
      const item = document.createElement('div');
      item.className = 'team-item';

      item.innerHTML = `
        <div class="position-relative overflow-hidden">
          <img
            class="img-fluid w-100"
            src="http://localhost:3000/uploads/${c.imagem || 'placeholder.png'}"
            alt="${c.nome_estabelecimento}"
          >
          <div class="team-overlay">
            <div class="d-flex align-items-center justify-content-center h-100">
              <a
                class="btn btn-light btn-square mx-1"
                href="/pages/perfil_clinica.html?id=${c.id}"
                aria-label="Ver perfil de ${c.nome_estabelecimento}"
              >
                <i class="bi bi-eye"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="bg-light text-center p-4">
          <h5 class="text-uppercase mb-2">${c.nome_estabelecimento}</h5>
          <p class="m-0 text-muted">${c.tipo}</p>
        </div>
      `;

      carousel.appendChild(item);
    });

    // inicializa o Owl (ou re-inicializa, se já estiver ativo)
    $(carousel).owlCarousel({
      loop: true,
      margin: 20,
      nav: true,
      dots: false,
      responsive: {
        0:   { items: 1 },
        600: { items: 2 },
        1000:{ items: 3 }
      }
    });

  } catch (err) {
    console.error('Erro ao carregar clínicas:', err);
  }
}
