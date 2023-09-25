const nextStep1Button = document.getElementById("next-step-1");
const finalizeRegistration = document.getElementById("finalize-registration");


function formatName(name) {
  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

let whatsapp = "";
let brandName =""

document.querySelectorAll(".step input").forEach((input) => {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextStep1Button.style.display === "none") {
        finalizeRegistration.click();
      } else {
        nextStep1Button.click();
      }
    }
  });
});


nextStep1Button.addEventListener("click", (e) => {
  e.preventDefault();
  brandName = document.getElementById("form-input-brand").value;
const nameInput = document.getElementById("form-input-name");
const name = nameInput.value;

const formattedName = formatName(name);


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
    "Preencha esses dados adicionais para agilizar o seu atendimento";

  const lead = {
    id: whatsapp,
    title: brandName,
    name: formattedName,
    mobile_phone: whatsapp,
    last_conversion: {
      source: "Google",
    },
    custom_fields: {
      "area-de-atuacao": lineOfBusiness,
      Canal: "LP 1",
      value: "1980",
      Campanha: "Landing Page",
      url_conversao: window.location.href,
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
    "https://app.pipe.run/webservice/integradorJson?hash=83211966-8869-455f-83ce-b022d45c7509";

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
        step1.classList.add("hide-display");

        const loading = document.getElementById("loading");
        loading.classList.remove("hide-display");

        setTimeout(() => {
          const step2 = document.getElementById("step-2");
          step2.classList.remove("hide-display");
          showToast("Primeira etapa concluída!");
          nextStep1Button.style.display = "none";
          loading.classList.add("hide-display");
        }, 1000); 
      } else {
        console.error("Erro na integração com o site. Por favor, preencha novamente.");
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
    showToast("Por favor, responda todos os campos do formulário.", "error");
    return false;
  }
  
 const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

 if (!emailRegex.test(email)) {
   showToast("Por favor, insira um endereço de email válido.", "error");
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
    "https://app.pipe.run/webservice/integradorJson?hash=da824ed6-15ea-4099-87a0-eafdd542e0cd";

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
          Obrigado pelo envio dos dados! Em breve entraremos em contato.
        </h3>

        `;
      } else {
        console.error("Erro na integração com o site. Por favor, preencha novamente.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
