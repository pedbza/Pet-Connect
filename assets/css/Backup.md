/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  overflow-y: auto;
  font-family: 'Poppins', sans-serif;
  background-color: #000;
}

/* Background */
.background-container {
  display: flex;
  height: 100vh;
  position: relative;
}
.bg-left, .bg-right {
  flex: 1;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  transition: background-position 0.6s ease;
}
.bg-left {
  background-image: url('/assets/img/capa3.jpg');
  background-position: 20% center;
}
.bg-left:hover {
  background-position: 30% center;
}
.bg-right {
  background-image: url('/assets/img/capa5.jpg');
  background-position: 80% center;
}
.bg-right:hover {
  background-position: 70% center;
}

/* Card principal atualizado */
.content-card {
  position: absolute;
  top: 40%; /* Posição ajustada */
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 700px;
  border-radius: 1.5rem; /* Bordas mais suaves */
  padding: 3rem 2.5rem;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.1), /* Sombra mais suave e maior */
    0 5px 15px rgba(0, 0, 0, 0.05); /* Segunda sombra para profundidade */
  z-index: 10;
  animation: slideDownFade 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  transition: box-shadow 0.4s ease, transform 0.4s ease; /* Suaviza a transição ao interagir */
  background: linear-gradient(135deg, #f8f8f8, #f3f6f6); /* Degradê em um ângulo diferente */
  color: #333; /* Cor de texto mais escura para boa legibilidade */
  overflow: hidden; /* Para garantir que o conteúdo não vaze fora da borda arredondada */
}

/* Efeito de hover na caixa de conteúdo */
.content-card:hover {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2); /* Efeito de sombra mais pronunciado ao passar o mouse */
  transform: scale(1.05); /* Dá um efeito de aumento suave ao passar o mouse */
}

@keyframes slideDownFade {
  0% {
    opacity: 0;
    transform: translate(-50%, -60%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}


.content-card:hover {
  box-shadow:
    0 12px 30px rgba(0, 0, 0, 0.25),
    0 6px 15px rgba(0, 0, 0, 0.15);
}

.content-card p.card-text {
  font-size: 1.2rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 2.5rem;
}

/* Botões */
.button-wrapper {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.button-wrapper a {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
}

.button-wrapper a:nth-child(1) {
  animation-delay: 0.4s;
}
.button-wrapper a:nth-child(2) {
  animation-delay: 0.8s;
}

.wrap-login100-form-btn {
  position: relative;
  width: 220px;
  height: 80px;
  border-radius: 35px;
  overflow: visible;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  color: white;
  cursor: pointer;
  box-shadow:
    0 5px 15px rgba(0,0,0,0.15);
  transition: 
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.3s ease,
    background 0.4s ease;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.12));
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

/* Texto dentro do botão */
.wrap-login100-form-btn .login100-form-btn {
  position: absolute;
  left: 50%;
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;
  pointer-events: none;
  text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}
/* Para o botão Tutor: texto sobe */
.wrap-login100-form-btn.btn-tutor .login100-form-btn {
  bottom: 20%;          /* começa dentro do botão */
  color: #43a047;
  transform: translateX(-50%) translateY(10px) scale(0.9);
}
/* Para o botão Clínica: texto desce */
.wrap-login100-form-btn.btn-clinic .login100-form-btn {
  top: 20%;             /* começa dentro do botão */
  color: #3867d3;
  transform: translateX(-50%) translateY(-10px) scale(0.9);
}


.wrap-login100-form-btn.btn-tutor:hover .login100-form-btn {
  opacity: 1;
  transform: translateX(-50%) translateY(-250%) scale(1);
}
.wrap-login100-form-btn.btn-clinic:hover .login100-form-btn {
  opacity: 1;
  transform: translateX(-50%) translateY(-190%) scale(1);
}

@keyframes fadePulse {
  0%, 100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  50% {
    opacity: 0.75;
    transform: translateX(-50%) translateY(-4px) scale(1.05);
  }
}

.wrap-login100-form-btn .login100-form-bgbtn {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  border-radius: 35px;
  z-index: 0;
  transition: background 0.3s ease;
  filter: drop-shadow(0 4px 4px rgba(0,0,0,0.1));
}

/* Tutor - verde vibrante */
.wrap-login100-form-btn.btn-tutor {
  background: linear-gradient(135deg, #43a047, #66bb6a);
  box-shadow: 0 6px 15px rgba(76, 175, 80, 0.5);
}
.wrap-login100-form-btn.btn-tutor .login100-form-bgbtn {
  background: linear-gradient(135deg, #4caf50, #81c784);
}
.wrap-login100-form-btn.btn-tutor:hover {
  transform: scale(1.15) rotateZ(1deg);
  box-shadow: 0 15px 30px rgba(8, 74, 10, 0.65);
  filter: drop-shadow(0 8px 10px rgba(9, 78, 11, 0.4));
}
.wrap-login100-form-btn.btn-tutor:hover .login100-form-bgbtn {
  background: linear-gradient(135deg, #388e3c, #4caf50);
}

/* Clínica / Petshop - laranja */
.wrap-login100-form-btn.btn-clinic {
  background: linear-gradient(135deg, #3867d3, #1c588c);
  box-shadow: 0 6px 15px rgba(0, 113, 251, 0.5);
}
.wrap-login100-form-btn.btn-clinic .login100-form-bgbtn {
  background: linear-gradient(135deg, #3867d3, #1c588c);
}
.wrap-login100-form-btn.btn-clinic:hover {
  transform: scale(1.15) rotateZ(1deg);
  box-shadow: 0 15px 30px rgba(2, 13, 77, 0.65);
  filter: drop-shadow(0 8px 10px rgba(3, 30, 72, 0.4));
}
.wrap-login100-form-btn.btn-clinic:hover .login100-form-bgbtn {
  background: linear-gradient(135deg, #3867d3, #1c588c);
}

/* Ícones */
.icon {
  font-size: 24px;
  margin-right: 10px;
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
  transition: transform 0.3s ease, color 0.3s ease;
  will-change: transform;
}

.wrap-login100-form-btn:hover .icon {
  animation: pulse 1.2s infinite;
  color: #fff9c4; /* cor suave para o efeito pulsante */
}

/* Animação pulsante para ícones */
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

/* Animação suave do card */
@keyframes slideDownFade {
  0% {
    opacity: 0;
    transform: translate(-50%, -55%) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

/* Aparecer com fade e subida */
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* MODAL */
.login-modal {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 1001;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(5px);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
}

.login-modal.flipped-mode {
  overflow-y: auto;
  padding: 60px 20px;
}

.flip-container {
  width: 100%;
  max-width: 500px;
  perspective: 1000px;
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.flipper {
  width: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s ease-in-out;
  height: auto;
}
.flipper.flipped {
  transform: rotateY(180deg);
}

.modal-content {
  width: 100%;
  background: #fff;
  backface-visibility: hidden;
  padding: 2rem;
  border-radius: 12px;
  box-sizing: border-box;
  overflow: visible;
  position: relative;
  margin: auto;
}

.modal-content.front,
.modal-content.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.front {
  z-index: 2;
  transform: rotateY(0deg);
}
.back {
  z-index: 1;
  transform: rotateY(180deg);
}

/* Borda colorida para cada modal */
.modal-content.tutor {
  border-left: 6px solid #4CAF50;
}
.modal-content.clinic {
  border-left: 6px solid #2196F3;
}

/* Botão fechar modal */
.close-modal {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 24px;
  cursor: pointer;
}

/* Formulários */
.input-group {
  margin: 0.1rem 0;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
}

.input-group input,
.input-group select,
.input-group textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
  font-family: 'Poppins', sans-serif;
}

.btn-login, .btn-register {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 15px;
  cursor: pointer;
}

.btn-login {
  background: linear-gradient(to right, #ff6600, #FCAD61);
  color: white;
  border: none;
}

.btn-register {
  background: transparent;
  color: #ff6600;
  border: none;
  text-decoration: underline;
}

/* Choices.js (plugin para selects múltiplos) */
.input-group .choices {
  display: block;
  margin-top: 6px;
}

.choices__inner {
  min-height: 48px;
  height: auto;
  overflow-y: visible;
  padding: 8px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.choices__list--multiple {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  width: 100%;
  overflow: visible;
}

.choices__list--multiple .choices__item {
  background-color: #ff6600;
  border-radius: 16px;
  padding: 5px 10px;
  margin: 4px 6px 4px 0;
  font-size: 13px;
  color: white;
  border: none;
  font-weight: 500;
}

.choices__list--dropdown,
.choices__list[aria-expanded] {
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  margin-top: 4px;
  font-size: 14px;
}

.choices__list--dropdown .choices__item {
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.choices__list--dropdown .choices__item:hover {
  background-color: #f5f5f5;
}

.choices__placeholder {
  opacity: 0.6;
}

.choices[data-type*=select-multiple] .choices__button {
  color: #fff;
  opacity: 0.8;
}

/* Título fixo */
.titulo-principal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;  /* Aumentei o padding para dar mais espaço */
  background: rgba(255, 140, 0, 0.8); /* Cor laranja com transparência */
  color: #fff;
  font-size: 2rem;  /* Aumentei o tamanho da fonte */
  font-family: 'Poppins', sans-serif;
  font-weight: 100;   /* Mais espessura na fonte */
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);  /* Sombra mais suave */
  z-index: 1000;
  animation: fadeInDown 1.2s ease-out forwards; /* Animação suavizada */
  text-transform: uppercase;  /* Deixa o texto em maiúsculas */
  letter-spacing: 1px;  /* Aumenta o espaçamento entre as letras */
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);  /* A animação começa mais alta */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


/* Rodapé fixo */
.rodape-fixo {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #111;
  color: #eee;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  padding: 12px 0;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
/* Estilo para a box de registro da clínica */
#loginModalClinic .back {
  max-height: 100vh;    /* Define a altura máxima para 100% da altura da janela de visualização */
  overflow-y: scroll;   /* Habilita a rolagem vertical, mas com a barra invisível */
  -ms-overflow-style: none;  /* Para IE e Edge */
  scrollbar-width: none;    /* Para Firefox */
  padding: 20px;        /* Adiciona um pequeno preenchimento interno */
}

/* Estilo para a box de registro do tutor */
#loginModalTutor .back {
  max-height: 100vh;    /* Define a altura máxima para 100% da altura da janela de visualização */
  overflow-y: scroll;   /* Habilita a rolagem vertical, mas com a barra invisível */
  -ms-overflow-style: none;  /* Para IE e Edge */
  scrollbar-width: none;    /* Para Firefox */
  padding: 20px;        /* Adiciona um pequeno preenchimento interno */
}

