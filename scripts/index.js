import { showStep, hideStep } from "./formHelper.js";

document.addEventListener("DOMContentLoaded", function () {
    const circle1 = document.getElementById("circle-1")
        const circle2 = document.getElementById("circle-2");
            const circle1Sec = document.getElementById("circle-1-sec");
            const circle2Sec = document.getElementById("circle-2-sec");
  const nextStep1Button = document.getElementById("next-step-1");
  nextStep1Button.addEventListener("click", function () {
    hideStep("step-1");
    showStep("step-2");
    circle1.classList.add("unselected-step");
    circle2.classList.remove("unselected-step");
  });
  const nextStepButtonSecForm = document.getElementById("next-step-1-sec-form");
  nextStepButtonSecForm.addEventListener("click", function () {
    hideStep("step-1-sec-form");
    showStep("step-2-sec-form");
        circle1Sec.classList.add("unselected-step");
        circle2Sec.classList.remove("unselected-step");
  });
});
