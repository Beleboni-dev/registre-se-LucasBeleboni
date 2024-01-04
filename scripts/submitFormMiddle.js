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

formattedNameMiddle = formatName(name);


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
      pipecanal: "LP - Form Middle",
      "Nome Lead": formattedNameMiddle,
      "Nome da marca": brandNameMiddle,
      value: "1980",
      Campanha: "LP 1",
      url_conversao: window.location.href,
    },
      
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
    "https://app.pipe.run/webservice/integradorJson?hash=83211966-8869-455f-83ce-b022d45c7509";

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
    let scoreMiddle = 0;

    switch (stageMiddle) {
      case "Já atuo no mercado há um certo tempo":
        scoreMiddle += 60;
        break;
      case "Comecei recentemente":
        scoreMiddle += 40;
        break;
      case "Estou me planejando para começar":
        scoreMiddle += 3;
        break;
    }

    switch (logoOptionMiddle) {
      case "Sim":
        scoreMiddle += 20;
        break;
      case "Ainda não. Está em fase de criação.":
        scoreMiddle += 5;
        break;
      case "Não. Pretendo registrar apenas o nome.":
        scoreMiddle += 8;
        break;
    }

    switch (cnpjMiddle) {
      case "Sim":
        scoreMiddle += 25;
        break;
      case "Não, mas já estamos providenciando":
        scoreMiddle += 4;
        break;
      case "Pessoa Física":
        scoreMiddle += 6;
        break;
    }

    switch (collaboratorsOptionMiddle) {
      case "1 a 2":
        scoreMiddle += 10;
        break;
      case "3 a 5":
        scoreMiddle += 15;
        break;
      case "11 a 50":
        scoreMiddle += 35;
        break;
      case "6 a 10":
        scoreMiddle += 30;
        break;
      case "Mais de 50":
        scoreMiddle += 40;
        break;
    }

    scoreMiddle += 45;
    
let hashMiddle = "";

if (scoreMiddle >= 1 && scoreMiddle <= 80) {
  hashMiddle = "da824ed6-15ea-4099-87a0-eafdd542e0cd";
} else if (scoreMiddle <= 160) {
  hashMiddle = "68f9a9be-22b6-4be4-9ea8-e59542cb5993";
} else if (scoreMiddle <= 220) {
  hashMiddle = "f668bca1-f0d8-40a7-8bf7-ecf91f34a91e";
} else if (scoreMiddle <= 300) {
  hashMiddle = "29a1eca5-93fb-4d44-ad11-ef12293d9a97";
} else if (scoreMiddle <= 400) {
  hashMiddle = "e3059d23-6294-459b-915b-377b6cb4a5e3";
} else if (scoreMiddle <= 500) {
  hashMiddle = "95a90be8-a855-4328-9323-1e3166863903";
} else if (scoreMiddle <= 600) {
  hashMiddle = "546b229e-2627-4e47-8502-552d14e8f42d";
} else {
  hashMiddle = "f9824a57-a0dd-4ef0-b1bc-4fa61737e9a8";
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
      score: scoreMiddle.toString(),
    },
     
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

  const endpointMiddle = `https://app.pipe.run/webservice/integradorJson?hash=${hashMiddle}`;

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
