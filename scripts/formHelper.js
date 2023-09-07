
export function showStep(stepId) {
  const step = document.getElementById(stepId);
  if (step) {
    step.style.display = "flex";
  }
}

export function hideStep(stepId) {
  const step = document.getElementById(stepId);
  if (step) {
    step.style.display = "none";
  }
}
