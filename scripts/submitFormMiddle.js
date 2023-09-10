const nextStep1ButtonMiddle = document.getElementById("next-step-middle-1");
const finalizeRegistrationMiddle = document.getElementById(
  "finalize-registration-middle"
);

let whatsappMiddle = "";

nextStep1ButtonMiddle.addEventListener("click", (e) => {
  e.preventDefault();
  const brandNameMiddle = document.getElementById(
    "form-input-brand-middle"
  ).value;
  const nameMiddle = document.getElementById("form-input-name-middle").value;
  whatsappMiddle = document.getElementById("form-input-whatsapp-middle").value;
  const lineOfBusinessMiddle = document.getElementById(
    "form-input-line-of-business-middle"
  ).value;

  if (
    !brandNameMiddle ||
    !nameMiddle ||
    !whatsappMiddle ||
    !lineOfBusinessMiddle
  ) {
    showToast("Por favor preencha todos os campos do formulário", "error");
    return false;
  }

  const leadMiddle = {
    id: whatsappMiddle,
    title: brandNameMiddle,
    name: nameMiddle,
    mobile_phone: whatsappMiddle,
    last_conversion: {
      source: "Google",
    },
    custom_fields: {
      "area-de-atuacao": lineOfBusinessMiddle,
      Canal: "LP 1",
      value: "1980",
      Campanha: "teste",
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
    "https://app.pipe.run/webservice/integradorJson?hash=f1e34340-bdad-49a4-a40a-9d3eb26e2328";

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
        step1Middle.classList.add("hide-display");
        step2Middle.classList.remove("hide-display");
        showToast("Primeira etapa concluída!");
      } else {
        console.error("Erro na integração com o Piperun.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

const stageOptionsMiddle = document.querySelectorAll(
  ".custom-select:nth-child(1) .options li"
);
const businessSizeOptionsMiddle = document.querySelectorAll(
  ".custom-select:nth-child(2) .options li"
);

let stageMiddle = "";
let businessSizeMiddle = "";

stageOptionsMiddle.forEach((option) => {
  option.addEventListener("click", () => {
    stageMiddle = option.textContent;
  });
});

businessSizeOptionsMiddle.forEach((option) => {
  option.addEventListener("click", () => {
    businessSizeMiddle = option.textContent;
  });
});

finalizeRegistrationMiddle.addEventListener("click", (e) => {
  e.preventDefault();
  const emailMiddle = document.getElementById("form-input-email-middle").value;
  const socialMediasMiddle = document.getElementById(
    "form-input-social-media-site-middle"
  ).value;
  const formWrapperMiddle = document.querySelector(
    ".fifth_section_form-wrapper"
  );
  if (
    !emailMiddle ||
    !socialMediasMiddle ||
    !stageMiddle ||
    !businessSizeMiddle
  ) {
    showToast("Por favor, preencha todos os campos da segunda etapa", "error");
    return false;
  }
  const leadStep2Middle = {
    id: whatsappMiddle,
    email: emailMiddle,
    custom_fields: {
      "qual-o-estagio-do-seu-negocio": stageMiddle,
      porte: businessSizeMiddle,
      "site-ou-redes": socialMediasMiddle,
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
  console.log(dataToSendStep2Middle);
  const endpointMiddle =
    "https://app.pipe.run/webservice/integradorJson?hash=f1e34340-bdad-49a4-a40a-9d3eb26e2328";

  fetch(endpointMiddle, {
    headers: {
      "Content-Type": "text/plain",
    },
    method: "POST",
    body: JSON.stringify(dataToSendStep2Middle),
  })
    .then((response) => {
      if (response.status === 200) {
        showToast("Cadastro concluído com sucesso!");
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