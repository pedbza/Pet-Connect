document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.wrap-login100-form-btn');

  buttons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const href = button.getAttribute('href');
      window.location.href = href;  // redireciona imediatamente
    });
  });
});
