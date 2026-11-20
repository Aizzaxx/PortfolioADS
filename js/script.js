// Atualiza automaticamente o ano no rodapé
const anoAtualEl = document.getElementById("ano-atual");
if (anoAtualEl) {
  anoAtualEl.textContent = new Date().getFullYear();
}

// Barra de progresso de leitura no topo
const barraProgresso = document.getElementById("progresso-topo");
if (barraProgresso) {
  window.addEventListener("scroll", () => {
    const alturaTotal =
      document.documentElement.scrollHeight - window.innerHeight;
    const porcentagem = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
    barraProgresso.style.width = `${Math.min(100, Math.max(0, porcentagem))}%`;
  });
}

// Filtro de projetos por tecnologia
const botoesFiltro = document.querySelectorAll(".filtro-btn");
const cardsProjeto = document.querySelectorAll(".card-projeto");

if (botoesFiltro.length > 0 && cardsProjeto.length > 0) {
  botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
      const filtroSelecionado = botao.dataset.filtro;

      botoesFiltro.forEach((btn) => btn.classList.remove("ativo"));
      botao.classList.add("ativo");

      cardsProjeto.forEach((card) => {
        const tecnologias = (card.dataset.tecnologias || "").split(" ");
        const deveMostrar =
          filtroSelecionado === "todos" || tecnologias.includes(filtroSelecionado);
        card.classList.toggle("oculto", !deveMostrar);
      });
    });
  });
}

// Validação e feedback do formulário de contato
const formContato = document.getElementById("form-contato");

if (formContato) {
  formContato.addEventListener("submit", (event) => {
    event.preventDefault();

    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const mensagemInput = document.getElementById("mensagem");

    const erroNome = document.getElementById("erro-nome");
    const erroEmail = document.getElementById("erro-email");
    const erroMensagem = document.getElementById("erro-mensagem");
    const feedback = document.getElementById("feedback-formulario");

    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroMensagem.textContent = "";
    feedback.textContent = "";

    let valido = true;

    if (!nomeInput.value.trim() || nomeInput.value.trim().length < 2) {
      erroNome.textContent = "Informe seu nome (pelo menos 2 caracteres).";
      valido = false;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    if (!emailValido) {
      erroEmail.textContent = "Digite um endereço de e-mail válido.";
      valido = false;
    }

    if (!mensagemInput.value.trim() || mensagemInput.value.trim().length < 10) {
      erroMensagem.textContent = "Escreva uma mensagem com pelo menos 10 caracteres.";
      valido = false;
    }

    if (!valido) return;

    const assunto = encodeURIComponent(
      `Contato pelo Portfólio - ${nomeInput.value.trim()}`
    );
    const corpo = encodeURIComponent(
      `Nome: ${nomeInput.value.trim()}\nE-mail: ${emailInput.value.trim()}\n\nMensagem:\n${mensagemInput.value.trim()}`
    );

    feedback.textContent =
      "Mensagem validada! Abrindo seu aplicativo de e-mail...";
    window.location.href = `mailto:seu-email@exemplo.com?subject=${assunto}&body=${corpo}`;
    formContato.reset();
  });
}