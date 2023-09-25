// Função para exibir a notificação
function showToast(message, section) {

  

  if(section === "middle"){
  const toast = document.getElementById("toast-middle");
  const toastText = document.getElementById("toast-text-middle");

  toastText.innerText = message;


  toastText.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
  }else if(section === "modal"){
  const toast = document.getElementById("toast-modal");
  const toastText = document.getElementById("toast-text-modal");

  toastText.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
  }else{
  const toast = document.getElementById("toast");
  const toastText = document.getElementById("toast-text");

  toastText.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
  }

}
