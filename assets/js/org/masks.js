// masks.js
// aplica as restrições nos campos numéricos.
function apenasNumeros(inputId, maxLength) {
  const input = document.getElementById(inputId);
  input.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '').slice(0, maxLength);
  });
}
