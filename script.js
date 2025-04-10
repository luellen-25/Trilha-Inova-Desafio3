function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearError(id) {
  document.getElementById(id).textContent = '';
}

document.getElementById("form-inscricao").addEventListener("submit", function (event) {
  event.preventDefault();

  let valid = true;
  const fname = document.getElementById("fname");
  const dtanasc = document.getElementById("dtanasc");
  const cpf = document.getElementById("cpf");
  const usuario = document.getElementById("usuario");
  const senha = document.getElementById("senha");

  // Validações
  if (fname.value.trim() === "") {
    showError("error-fname", "Nome é obrigatório.");
    valid = false;
  } else {
    clearError("error-fname");
  }

  if (dtanasc.value === "") {
    showError("error-dtanasc", "Data de nascimento é obrigatória.");
    valid = false;
  } else {
    clearError("error-dtanasc");
  }

  if (!/^\d{11}$/.test(cpf.value)) {
    showError("error-cpf", "CPF inválido. Use 11 dígitos.");
    valid = false;
  } else {
    clearError("error-cpf");
  }

  if (usuario.value.trim() === "") {
    showError("error-usuario", "E-mail é obrigatório.");
    valid = false;
  } else {
    clearError("error-usuario");
  }

  if (senha.value.trim() === "") {
    showError("error-senha", "Senha é obrigatória.");
    valid = false;
  } else {
    clearError("error-senha");
  }

  if (valid) {
    const inscricao = {
      nome: fname.value.trim(),
      dtanasc: dtanasc.value,
      cpf: cpf.value,
      usuario: usuario.value.trim(),
      senha: senha.value
    };

    localStorage.setItem("inscricao", JSON.stringify(inscricao));
    alert("Inscrição realizada com sucesso!");

    document.getElementById("inscricao").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
  }
});

document.getElementById("form-login").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-senha").value;
  const inscricao = JSON.parse(localStorage.getItem("inscricao"));

  if (!inscricao) {
    showError("login-error", "Nenhuma inscrição encontrada.");
    return;
  }

  if (email === inscricao.usuario && senha === inscricao.senha) {
    alert("Login bem-sucedido!");
    clearError("login-error");
  } else {
    showError("login-error", "E-mail ou senha incorretos.");
  }
});
