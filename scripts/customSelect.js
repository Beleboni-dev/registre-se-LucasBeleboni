document.addEventListener("DOMContentLoaded", function () {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach(function (customSelect) {
    const selectedOption = customSelect.querySelector(".selected-option");
    const optionsList = customSelect.querySelector(".options");

    // Abrir/fechar a lista de opções ao clicar no elemento selecionado
    selectedOption.addEventListener("click", function () {
      optionsList.style.display =
        optionsList.style.display === "block" ? "none" : "block";
    });

    // Selecionar uma opção ao clicar nela
    optionsList.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        selectedOption.textContent = event.target.textContent;
        optionsList.style.display = "none";
        // Você pode acessar o valor selecionado usando event.target.getAttribute('data-value')
      }
    });
  });
});
