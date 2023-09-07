const secondaryButtons = document.querySelectorAll(".secondary-button");
const targetSection = document.getElementById("target-form-section");
secondaryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    targetSection.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});
