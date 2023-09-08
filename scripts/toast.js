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

