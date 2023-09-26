const nextStep1ButtonMiddle = document.getElementById("next-step-middle-1");
const finalizeRegistrationMiddle = document.getElementById(
  "finalize-registration-middle"
);

function formatName(name) {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

let whatsappMiddle = "";
let brandNameMiddle = "";
let formattedNameMiddle = "";
document.querySelectorAll(".step-middle input").forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextStep1ButtonMiddle.style.display === "none") {
        finalizeRegistrationMiddle.click();
      } else {
        nextStep1ButtonMiddle.click();
      }
    }
  });
});

nextStep1ButtonMiddle.addEventListener("click", (e) => {
  e.preventDefault();
  brandNameMiddle = document.getElementById(
    "form-input-brand-middle"
  ).value;
const nameInputMiddle = document.getElementById("form-input-name-middle");
const name = nameInputMiddle.value;

const formattedNameMiddle = formatName(name);


  whatsappMiddle = document.getElementById("form-input-whatsapp-middle").value;
  const stepTitle = document.getElementById("step-1-title-middle");
  const lineOfBusinessMiddle = document.getElementById(
    "form-input-line-of-business-middle"
  ).value;

  if (
    !brandNameMiddle ||
    !nameInputMiddle ||
    !whatsappMiddle ||
    !lineOfBusinessMiddle
  ) {
    showToast("Por favor, responda todos os campos do formulário.", "middle");
    return false;
  }

  const leadMiddle = {
    id: whatsappMiddle,
    title: brandNameMiddle,
    name: formattedNameMiddle,
    mobile_phone: whatsappMiddle,
    last_conversion: {
      source: "Google",
    },
    custom_fields: {
      "area-de-atuacao": lineOfBusinessMiddle,
      pipecanal: "Landing Page",
      value: "1980",
      Campanha: "LP 1",
      url_conversao: window.location.href,
    },
    tags: ["Cadastro Simples"],
  };
  const dataToSendMiddle = {
    rules: {
      update: true,
      equal_pipeline: true,
      filter_status_update: "open",
      status: "open",
    },
    leads: [leadMiddle],
  };

  const endpointMiddle =
    "https://app.pipe.run/webservice/integradorJson?hash=cc7c6b85-9e70-4b26-9d38-c7de57e8fb4e";

  fetch(endpointMiddle, {
    headers: {
      "Content-Type": "text/plain",
    },
    method: "POST",
    body: JSON.stringify(dataToSendMiddle),
  })
    .then((response) => {
      if (response.status === 200) {
        const step1Middle = document.getElementById("step-middle-1");
        const step2Middle = document.getElementById("step-middle-2");
           const circle1Middle = document.getElementById("circle-1-middle");
           const circle2Middle = document.getElementById("circle-2-middle");
           step1Middle.classList.add("slide-down");
           setTimeout(function () {
             step1Middle.classList.add("hide-display");
             step2Middle.classList.remove("hide-display");
             step2Middle.classList.add("slide-up");
             circle1Middle.classList.add("unselected-step");
             circle2Middle.classList.remove("unselected-step");
             circle2Middle.classList.add("step2-circle");
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


let stageMiddle = "";
const stageOptionsMiddle = document.querySelectorAll(
  ".custom-select:nth-child(1) .options li"
);
stageOptionsMiddle.forEach((option) => {
  option.addEventListener("click", () => {
    stageMiddle = option.textContent;
  });
});

let logoOptionMiddle = "";
const logoOptionsMiddle = document.querySelectorAll(
  ".custom-select:nth-child(2) .options li"
);
logoOptionsMiddle.forEach((option) => {
  option.addEventListener("click", () => {
    logoOptionMiddle = option.textContent;
  });
});

let cnpjMiddle = "";
const cnpjOptionsMiddle = document.querySelectorAll(
  ".custom-select:nth-child(3) .options li"
);
cnpjOptionsMiddle.forEach((option) => {
  option.addEventListener("click", () => {
    cnpjMiddle = option.textContent;
  });
});

let collaboratorsOptionMiddle = "";
const collaboratorsOptionsMiddle = document.querySelectorAll(
  ".custom-select:nth-child(4) .options li"
);
collaboratorsOptionsMiddle.forEach((option) => {
  option.addEventListener("click", () => {
    collaboratorsOptionMiddle = option.textContent;
  });
});


finalizeRegistrationMiddle.addEventListener("click", (e) => {
  e.preventDefault();
  const formWrapperMiddle = document.querySelector(
    ".fifth_section_form-wrapper"
  );
  if (!logoOptionMiddle || !collaboratorsOptionMiddle || !stageMiddle) {
    showToast("Por favor, responda todos os campos do formulário.", "error");
    return false;
  }


  const leadStep2Middle = {
    id: whatsappMiddle,
    title: brandNameMiddle,
    mobile_phone: whatsappMiddle,
    name: formattedNameMiddle,
    custom_fields: {
      "qual-o-estagio-do-seu-negocio": stageMiddle,
      "tem-logotipo": logoOptionMiddle,
      "quantos-colaboradores": collaboratorsOptionMiddle,
      "tem-cnpj": cnpjMiddle,
    },
    tags: ["Cadastro Completo"],
  };
  const dataToSendStep2Middle = {
    rules: {
      update: true,
      equal_pipeline: true,
      filter_status_update: "open",
      status: "open",
    },
    leads: [leadStep2Middle],
  };

  const endpointMiddle =
    "https://app.pipe.run/webservice/integradorJson?hash=cc7c6b85-9e70-4b26-9d38-c7de57e8fb4e";

  fetch(endpointMiddle, {
    headers: {
      "Content-Type": "text/plain",
    },
    method: "POST",
    body: JSON.stringify(dataToSendStep2Middle),
  })
    .then((response) => {
      if (response.status === 200) {
        showToast("Cadastro concluído com sucesso!","middle");
        formWrapperMiddle.innerHTML = `
        
        <h3 class="form-title">
          Obrigado por se cadastrar, em breve entraremos em contato!
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
