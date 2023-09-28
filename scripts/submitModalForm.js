const nextStep1ButtonModal = document.getElementById("next-step-1-modal");
const finalizeRegistrationModal = document.getElementById(
  "finalize-registration-modal"
);
  const stepTitleModal = document.getElementById("step-1-title-modal");
function formatName(name) {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

let whatsappModal = "";
let brandNameModal = "";
let formattedNameModal = "";

document.querySelectorAll(".step input").forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextStep1ButtonModal.style.display === "none") {
        finalizeRegistrationModal.click();
      } else {
        nextStep1ButtonModal.click();
      }
    }
  });
});

nextStep1ButtonModal.addEventListener("click", (e) => {
  e.preventDefault();
  brandNameModal = document.getElementById("form-input-brand-modal").value;
  const nameInputModal = document.getElementById("form-input-name-modal");
  const nameModal = nameInputModal.value;

  formattedNameModal = formatName(nameModal);

  whatsappModal = document.getElementById("form-input-whatsapp-modal").value;
  const lineOfBusinessModal = document.getElementById(
    "form-input-line-of-business-modal"
  ).value;


  if (!brandNameModal || !nameModal || !whatsappModal || !lineOfBusinessModal) {
    showToast("Por favor preencha todos os campos do formulário", "modal");
    return false;
  }

  stepTitleModal.textContent =
    "Preencha esses dados adicionais para agilizar o seu atendimento";

  const leadModal = {
    id: whatsappModal,
    title: brandNameModal,
    name: formattedNameModal,
    mobile_phone: whatsappModal,
    last_conversion: {
      source: "Google",
    },
    custom_fields: {
      "area-de-atuacao": lineOfBusinessModal,
      pipecanal: "Landing Page",
      value: "1980",
      Campanha: "LP 1",
      url_conversao: window.location.href,
    },
    tags: ["Cadastro Simples"],
  };
  const dataToSendModal = {
    rules: {
      update: true,
      equal_pipeline: true,
      filter_status_update: "open",
      status: "open",
    },
    leads: [leadModal],
  };

  const endpointModal =
    "https://app.pipe.run/webservice/integradorJson?hash=83211966-8869-455f-83ce-b022d45c7509";

  fetch(endpointModal, {
    headers: {
      "Content-Type": "text/plain",
    },
    method: "POST",
    body: JSON.stringify(dataToSendModal),
  })
    .then((response) => {
      if (response.status === 200) {
        const step1Modal = document.getElementById("step-1-modal");
        const step2Modal = document.getElementById("step-2-modal");
        const circle1Modal = document.getElementById("circle-1-modal");
        const circle2Modal = document.getElementById("circle-2-modal");
        step1Modal.classList.add("slide-down");
        setTimeout(function () {
          step1Modal.classList.add("hide-display");
          step2Modal.classList.remove("hide-display");
          step2Modal.classList.add("slide-up");
          circle1Modal.classList.add("unselected-step");
          circle2Modal.classList.remove("unselected-step");
          circle2Modal.classList.add("step2-circle");
          sessionStorage.setItem("firstStepForm", true);
        }, 300);
      } else {
        console.error("Erro na integração com o Piperun.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

// Modifique os IDs e variáveis para evitar conflitos com o arquivo submitForm.js
let stageModal = "";
const stageOptionsModal = document.querySelectorAll(
  ".custom-select:nth-child(1) .options li"
);
stageOptionsModal.forEach((option) => {
  option.addEventListener("click", () => {
    stageModal = option.textContent;
  });
});

let logoOptionModal = "";
const logoOptionsModal = document.querySelectorAll(
  ".custom-select:nth-child(2) .options li"
);
logoOptionsModal.forEach((option) => {
  option.addEventListener("click", () => {
    logoOptionModal = option.textContent;
  });
});

let cnpjModal = "";
const cnpjOptionsModal = document.querySelectorAll(
  ".custom-select:nth-child(3) .options li"
);
cnpjOptionsModal.forEach((option) => {
  option.addEventListener("click", () => {
    cnpjModal = option.textContent;
  });
});

let collaboratorsOptionModal = "";
const collaboratorsOptionsModal = document.querySelectorAll(
  ".custom-select:nth-child(4) .options li"
);
collaboratorsOptionsModal.forEach((option) => {
  option.addEventListener("click", () => {
    collaboratorsOptionModal = option.textContent;
  });
});

finalizeRegistrationModal.addEventListener("click", (e) => {
  e.preventDefault();

  const formWrapperModal = document.querySelector(".form-wrapper-modal");

  if (!logoOptionModal || !collaboratorsOptionModal || !stageModal) {
    showToast("Por favor, responda todos os campos do formulário.", "modal");
    return false;
  }

  const leadStep2Modal = {
    id: whatsappModal,
    title: brandNameModal,
    custom_fields: {
      "qual-o-estagio-do-seu-negocio": stageModal,
      "tem-logotipo": logoOptionModal,
      "quantos-colaboradores": collaboratorsOptionModal,
      "tem-cnpj": cnpjModal,
    },
    tags: ["Cadastro Completo"],
  };

  const dataToSendStep2Modal = {
    rules: {
      update: true,
      equal_pipeline: true,
      filter_status_update: "open",
      status: "open",
    },
    leads: [leadStep2Modal],
  };

  const endpointModal =
    "https://app.pipe.run/webservice/integradorJson?hash=da824ed6-15ea-4099-87a0-eafdd542e0cd";

  fetch(endpointModal, {
    headers: {
      "Content-Type": "text/plain",
    },
    method: "POST",
    body: JSON.stringify(dataToSendStep2Modal),
  })
    .then((response) => {
      if (response.status === 200) {
        showToast("Cadastro concluído com sucesso!", "modal");
        stepTitleModal.style.display= "none";
        formWrapperModal.innerHTML = `
        
        <h3 class="form-title">
          Obrigado pelo envio dos dados! Em breve entraremos em contato.
        </h3>
        `;
      } else {
        console.error("Erro na integração com o Piperun.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
