document.addEventListener("DOMContentLoaded", function () {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach(function (customSelect) {
    const selectedOption = customSelect.querySelector(".selected-option");
    const optionsList = customSelect.querySelector(".options");

    selectedOption.addEventListener("click", function () {
      optionsList.style.display =
        optionsList.style.display === "block" ? "none" : "block";
    });
    optionsList.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        selectedOption.textContent = event.target.textContent;
        optionsList.style.display = "none";
      }
    });
  });
});
