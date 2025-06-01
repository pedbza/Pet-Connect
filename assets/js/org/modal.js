// modal.js
//funções para abrir, fechar e alternar o modal.
function openModal(id, isCadastro = false) {
  const modal = document.getElementById(id);
  const flipper = modal.querySelector('.flipper');
  modal.style.display = "flex";
  flipper.classList.toggle('flipped', isCadastro);

  const content = modal.querySelector('.modal-content.front');
  if (content) {
    content.classList.remove('animate-in');
    void content.offsetWidth;
    content.classList.add('animate-in');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "none";
  const flip = modal.querySelector('.flipper');
  if (flip) flip.classList.remove('flipped');
}

function flipCard(containerId, toFront = false) {
  const container = document.getElementById(containerId);
  const flipper = container.querySelector('.flipper');
  flipper.classList.toggle('flipped', !toFront);
}

window.onclick = function (event) {
  if (event.target.classList.contains("login-modal")) {
    event.target.style.display = "none";
    const flipper = event.target.querySelector('.flipper');
    if (flipper) flipper.classList.remove('flipped');
  }
};
