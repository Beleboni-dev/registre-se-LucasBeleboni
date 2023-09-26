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
      pipecanal: "Landing Page",
      value: "1980",
      Campanha: "LP 1",
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
    "https://app.pipe.run/webservice/integradorJson?hash=cc7c6b85-9e70-4b26-9d38-c7de57e8fb4e";

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
        const circle1 = document.getElementById("circle-1");
        const circle2 = document.getElementById("circle-2");
        step1.classList.add("slide-down");
        setTimeout(function () {
          step1.classList.add("hide-display");
          step2.classList.remove("hide-display"); 
          step2.classList.add("slide-up");
          circle1.classList.add("unselected-step");
          circle2.classList.remove("unselected-step");
          circle2.classList.add("step2-circle")
        }, 300);
        nextStep1Button.style.display = "none";
      } else {
        console.error("Erro na integração com o Piperun.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});

let stage = "";
const stageOptions = document.querySelectorAll(
  ".custom-select:nth-child(1) .options li"
);
stageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    stage = option.textContent;
  });
});


let logoOption = "";
const logoOptions = document.querySelectorAll(
  ".custom-select:nth-child(2) .options li"
);
logoOptions.forEach((option) => {
  option.addEventListener("click", () => {
   logoOption = option.textContent;
  });
});

let cnpj = "";
const cnpjOptions = document.querySelectorAll(
  ".custom-select:nth-child(3) .options li"
);
cnpjOptions.forEach((option) => {
  option.addEventListener("click", () => {
    cnpj= option.textContent;
  });
});


let collaboratorsOption = ""
const collaboratorsOptions = document.querySelectorAll(
  ".custom-select:nth-child(4) .options li"
);
collaboratorsOptions.forEach((option) => {
  option.addEventListener("click", () => {
    collaboratorsOption = option.textContent;
  });
});


finalizeRegistration.addEventListener("click", (e) => {
  e.preventDefault();
 
  const formWrapper = document.querySelector(".form-wrapper");

  if (!logoOption || !collaboratorsOption || !stage ) {
    showToast("Por favor, responda todos os campos do formulário.", "error");
    return false;
  }


  const leadStep2 = {
    id: whatsapp,
    title: brandName,
    custom_fields: {
      "qual-o-estagio-do-seu-negocio": stage,
      "tem-logotipo": logoOption,
      "quantos-colaboradores": collaboratorsOption,
      "tem-cnpj": cnpj,
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
    "https://app.pipe.run/webservice/integradorJson?hash=cc7c6b85-9e70-4b26-9d38-c7de57e8fb4e";

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
        console.error("Erro na integração com o Piperun.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
