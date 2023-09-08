const nextStep1Button = document.getElementById("next-step-1");
const finalizeRegistration = document.getElementById("finalize-registration");

let whatsapp = "";

nextStep1Button.addEventListener("click", (e) => {
  e.preventDefault();
  const brandName = document.getElementById("form-input-brand").value;
  const name = document.getElementById("form-input-name").value;
  whatsapp = document.getElementById("form-input-whatsapp").value;
  const lineOfBusiness = document.getElementById(
    "form-input-line-of-business"
  ).value;
  const stepTitle = document.getElementById("step-1-title");

  if (!brandName || !name || !whatsapp || !lineOfBusiness) {
    showToast("Por favor preencha todos os campos do formulário", "error");
    return false;
  }

  stepTitle.textContent =
    "Preencha esses dados opcionais para agilizar o seu atendimento";

  const lead = {
    id: whatsapp,
    title: brandName,
    name: name,
    mobile_phone: whatsapp,
    last_conversion: {
      source: "Google",
    },
    custom_fields: {
      "area-de-atuacao": lineOfBusiness,
      Canal: "LP 1",
      value: "1980",
      Campanha: "teste",
    },
    tags: ["Cadastro Simples"],
  };
  const dataToSend = {
    rules: {
      update: true,
      equal_pipeline: true,
      filter_status_update: "open",
      status: "open",
    },
    leads: [lead],
  };
  const endpoint =
    "https://app.pipe.run/webservice/integradorJson?hash=f1e34340-bdad-49a4-a40a-9d3eb26e2328";

  fetch(endpoint, {
    headers: {
      "Content-Type": "text/plain",
    },
    method: "POST",
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      if (response.status === 200) {
        const step1 = document.getElementById("step-1");
        const step2 = document.getElementById("step-2");
        step1.classList.add("hide-display");
        step2.classList.remove("hide-display");
        showToast("Primeira etapa concluída!");
      } else {
        console.error("Erro na integração com o Piperun.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

const stageOptions = document.querySelectorAll(
  ".custom-select:nth-child(1) .options li"
);
const businessSizeOptions = document.querySelectorAll(
  ".custom-select:nth-child(2) .options li"
);

let stage = "";
let businessSize = "";

stageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    stage = option.textContent;
  });
});

businessSizeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    businessSize = option.textContent;
  });
});

finalizeRegistration.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("form-input-email").value;
  const socialMedias = document.getElementById(
    "form-input-social-media-site"
  ).value;
  const formWrapper = document.querySelector(".form-wrapper");
  if (!email || !socialMedias || !stage || !businessSize) {
    showToast("Por favor, preencha todos os campos da segunda etapa", "error");
    return false;
  }
  const leadStep2 = {
    id: whatsapp,
    title: brandName,
    email: email,
    custom_fields: {
      "qual-o-estagio-do-seu-negocio": stage,
      porte: businessSize,
      "site-ou-redes": socialMedias,
    },
    tags: ["Cadastro Completo"],
  };
  const dataToSendStep2 = {
    rules: {
      update: true,
      equal_pipeline: true,
      filter_status_update: "open",
      status: "open",
    },
    leads: [leadStep2],
  };

  const endpoint =
    "https://app.pipe.run/webservice/integradorJson?hash=f1e34340-bdad-49a4-a40a-9d3eb26e2328";

  fetch(endpoint, {
    headers: {
      "Content-Type": "text/plain",
    },
    method: "POST",
    body: JSON.stringify(dataToSendStep2),
  })
    .then((response) => {
      if (response.status === 200) {
        showToast("Cadastro concluído com sucesso!");
        formWrapper.innerHTML = `
        
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
