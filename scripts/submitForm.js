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
let brandName = "";
let formattedName = "";
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

  formattedName = formatName(name);

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
      "Nome da marca": brandName,
      "Nome Lead": formattedName,
      pipecanal: "LP - Form Top",
      value: "1980",
      Campanha: "LP 1",
      url_conversao: window.location.href,
    },
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
          circle2.classList.add("step2-circle");
          sessionStorage.setItem("firstStepForm", true);
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
    cnpj = option.textContent;
  });
});

let collaboratorsOption = "";
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

  if (!logoOption || !collaboratorsOption || !stage) {
    showToast("Por favor, responda todos os campos do formulário.", "error");
    return false;
  }

  let score = 0;

  switch (stage) {
    case "Já atuo no mercado há um certo tempo":
      score += 60;
      break;
    case "Comecei recentemente":
      score += 40;
      break;
    case "Estou me planejando para começar":
      score += 3;
      break;
  }

  switch (logoOption) {
    case "Sim":
      score += 20;
      break;
    case "Ainda não. Está em fase de criação.":
      score += 5;
      break;
    case "Não. Pretendo registrar apenas o nome.":
      score += 8;
      break;
  }

  switch (cnpj) {
    case "Sim":
      score += 25;
      break;
    case "Não, mas já estamos providenciando":
      score += 4;
      break;
    case "Pessoa Física":
      score += 6;
      break;
  }

  switch (collaboratorsOption) {
    case "1 a 2":
      score += 10;
      break;
    case "3 a 5":
      score += 15;
      break;
    case "11 a 50":
      score += 35;
      break;
    case "6 a 10":
      score += 30;
      break;
    case "Mais de 50":
      score += 40;
      break;
  }

  score += 45;

let hash = "";

/*if (score >= 1 && score <= 100) {
  hash = "da824ed6-15ea-4099-87a0-eafdd542e0cd";
} else if (score <= 160) {
  hash = "68f9a9be-22b6-4be4-9ea8-e59542cb5993";
} else if (score <= 220) {
  hash = "f668bca1-f0d8-40a7-8bf7-ecf91f34a91e";
} else if (score <= 300) {
  hash = "29a1eca5-93fb-4d44-ad11-ef12293d9a97";
} else if (score <= 400) {
  hash = "e3059d23-6294-459b-915b-377b6cb4a5e3";
} else {
  hash = "f9824a57-a0dd-4ef0-b1bc-4fa61737e9a8";
}*/

  if (score <= 100) {
    hash = "da824ed6-15ea-4099-87a0-eafdd542e0cd";
  } else if (score <= 110) {
    hash = "68f9a9be-22b6-4be4-9ea8-e59542cb5993";
  } else if (score <= 120) {
    hash = "351704a7-da75-4872-b73f-f27e3fa4e412";
  } else if (score <= 130) {
    hash = "df73c8aa-8047-445c-8f79-abffc006ba4e";
  } else if (score <= 140) {
    hash = "f4eaa1e8-1761-4ba5-9921-f28dd6b13ebf";
  } else if (score <= 160) {
    hash = "f668bca1-f0d8-40a7-8bf7-ecf91f34a91e";
  } else if (score <= 180) {
    hash = "29a1eca5-93fb-4d44-ad11-ef12293d9a97";
  } else {
    hash = "e3059d23-6294-459b-915b-377b6cb4a5e3";
  }

  const leadStep2 = {
    id: whatsapp, // nome da marca
    title: brandName, //nome da marca
    custom_fields: {
      "qual-o-estagio-do-seu-negocio": stage,
      "tem-logotipo": logoOption,
      "quantos-colaboradores": collaboratorsOption,
      "tem-cnpj": cnpj,
      score: score.toString(),
    },
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

  const endpoint = `https://app.pipe.run/webservice/integradorJson?hash=${hash}`;

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
        console.log(score)
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
