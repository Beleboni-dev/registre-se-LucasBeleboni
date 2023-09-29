let modalVisible = false;

function showModal() {
  document.getElementById("myModal").style.display = "flex";
  document.getElementById("backdrop").style.display = "block";
  modalVisible = true;
}

function hideModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("backdrop").style.display = "none";
  modalVisible = false;
  sessionStorage.setItem("firstStepForm", true);
}

document.addEventListener("mouseout", function (e) {
  if (e.clientY < 0 && !modalVisible) {
    const firstStep = sessionStorage.getItem("firstStepForm");
    if (!firstStep) {
      showModal();
    }
  }
});

document.addEventListener("click", function (e) {
  const modal = document.getElementById("myModal");
  if (modalVisible && e.target !== modal && !modal.contains(e.target)) {
    hideModal();
  }
});
