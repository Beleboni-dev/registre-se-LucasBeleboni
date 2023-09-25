let modalVisible = false;

// Função para mostrar o modal
function showModal() {
  document.getElementById("myModal").style.display = "block";
      document.getElementById("backdrop").style.display = "block";
  modalVisible = true;
}

// Função para ocultar o modal
function hideModal() {
  document.getElementById("myModal").style.display = "none";
      document.getElementById("backdrop").style.display = "none";
  modalVisible = false;
}

// Evento para abrir o modal quando o mouse sai da página
document.addEventListener("mouseout", function (e) {
  if (e.clientY < 0 && !modalVisible) {
    showModal();
  }
});

// Evento para fechar o modal quando o usuário clica fora dele
document.addEventListener("click", function (e) {
  const modal = document.getElementById("myModal");
  if (modalVisible && e.target !== modal && !modal.contains(e.target)) {
    hideModal();
  }
});
