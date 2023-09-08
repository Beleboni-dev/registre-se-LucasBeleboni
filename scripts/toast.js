// Função para exibir a notificação
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");

  toastText.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


//toast aparece ao dar enter enviar form, o enter deve avançar para para proxima etapqa
//colocar toast dentro div form