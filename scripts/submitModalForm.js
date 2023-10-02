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
      pipecanal: "LP - Form Exit Pop Up",
      "Nome da marca": brandNameModal,
      "Nome Lead": formattedNameModal,
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
    let scoreModal = 0;

    switch (stageModal) {
      case "Já atuo no mercado há um certo tempo":
        scoreModal += 27;
        break;
      case "Comecei recentemente":
        scoreModal += 14;
        break;
      case "Estou me planejando para começar":
        scoreModal += 6;
        break;
    }

    switch (logoOptionModal) {
      case "Sim":
        scoreModal += 20;
        break;
      case "Ainda não. Está em fase de criação.":
        scoreModal += 6;
        break;
      case "Não. Pretendo registrar apenas um nome.":
        scoreModal += 7;
        break;
    }

    switch (cnpjModal) {
      case "Sim":
        scoreModal += 27;
        break;
      case "Não, mas já estamos providenciando":
        scoreModal += 6;
        break;
      case "Pessoa Física":
        scoreModal += 6;
        break;
    }

    switch (collaboratorsOptionModal) {
      case "1 a 2":
        scoreModal += 9;
        break;
      case "3 a 5":
        scoreModal += 22;
        break;
      case "11 a 50":
        scoreModal += 20;
        break;
      case "6 a 10":
        scoreModal += 41;
        break;
      case "Mais de 50":
        scoreModal += 37;
        break;
    }

    scoreModal += 36;

    let hashModal = "";

    if (scoreModal < 50) {
      hashModal = "da824ed6-15ea-4099-87a0-eafdd542e0cd";
    } else if (scoreModal <= 60) {
      hashModal = "68f9a9be-22b6-4be4-9ea8-e59542cb5993";
    } else if (scoreModal <= 70) {
      hashModal = "f668bca1-f0d8-40a7-8bf7-ecf91f34a91e";
    } else if (scoreModal <= 80) {
      hashModal = "29a1eca5-93fb-4d44-ad11-ef12293d9a97";
    } else if (scoreModal <= 110) {
      hashModal = "a8da92cd-1bb9-4196-8c7c-93af0e3809d9";
    } else {
      hashModal = "f9824a57-a0dd-4ef0-b1bc-4fa61737e9a8";
    }
  const leadStep2Modal = {
    id: whatsappModal,
    title: brandNameModal,
    custom_fields: {
      "qual-o-estagio-do-seu-negocio": stageModal,
      "tem-logotipo": logoOptionModal,
      "quantos-colaboradores": collaboratorsOptionModal,
      "tem-cnpj": cnpjModal,
      score: scoreModal.toString(),
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

  const endpointModal = `https://app.pipe.run/webservice/integradorJson?hash=${hashModal}`;

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
