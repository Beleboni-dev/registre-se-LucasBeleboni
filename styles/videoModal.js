const iFrameUrl =
  "https://www.youtube.com/embed/4bGaE5Y4Buo?si=WAIijoXMEdZd_G92";
const openVideoModalBtn = document.getElementById("btn-step-by-step-video");
const iFrame = document.getElementById("embed-video-step-by-step");
const modal = document.getElementById("video-modal");
const backdrop = document.getElementById("backdrop");
const hideSection = document.querySelector(".seventh_section-wrapper");
const closeVideoModalBtn = document.querySelector(
  ".video-modal-close-modal-btn"
);

let modalOpen = false;

openVideoModalBtn.addEventListener("click", () => {
  modal.classList.remove("hide-display");
  iFrame.src = iFrameUrl;
  backdrop.classList.remove("hide-display");
  hideSection.classList.add("hide-display");
  modalOpen = true;
});

closeVideoModalBtn.addEventListener("click", () => {
  modal.classList.add("hide-display");
  iFrame.src = "";
  backdrop.classList.add("hide-display");
  hideSection.classList.remove("hide-display");
  modalOpen = false;
});
backdrop.addEventListener("click", () => {
  modal.classList.add("hide-display");
  iFrame.src = "";
  backdrop.classList.add("hide-display");
  hideSection.classList.remove("hide-display");
  modalOpen = false;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modalOpen) {
    modal.classList.add("hide-display");
    iFrame.src = "";
    backdrop.classList.add("hide-display");
    hideSection.classList.remove("hide-display");
  }
});
