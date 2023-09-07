const nextStep1Button = document.getElementById("next-step-1");

nextStep1Button.addEventListener("click", () => {
  const brandName = document.getElementById("form-input-brand").value;
  const name = document.getElementById("form-input-name").value;
  const whatsapp = document.getElementById("form-input-whatsapp").value;
  const lineOfBusiness = document.getElementById(
    "form-input-line-of-business"
  ).value;
const stepTitle = document.getElementById("step-1-title");

  if (!brandName || !name || !whatsapp || !lineOfBusiness) {
        alert("Preencha todos os campos")
return false;
  } 
        stepTitle.textContent = "Preencha esses dados opcionais para agilizar o seu atendimento";

  const lead = {
    id: whatsapp,
    title: brandName,
    name: name,
    mobile_phone: whatsapp,
    last_conversion: {
      source: "Site_CRMPipeRun",
    },
    custom_fields: {
      "area-de-atuacao": lineOfBusiness,
      Canal: "LP 1",
      value: "1980",
      Campanha: "teste",
      "Origem Campanha": "Google", 
    },
    tags: ["Cadastro Simples"],
  };

const stage = ""
const porte = ""

  const leadStep2 = {
    id: whatsapp,
    email: email,
    last_conversion: {
      source: "Site_CRMPipeRun",
    },
    custom_fields: {
    "qual-o-estagio-do-seu-negocio": stage,
    porte: porte,
    "site-ou-redes": socialMedias,
    },
    tags: ["Cadastro Completo"],
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
      } else {
        console.error("Erro na integração com o Piperun.");
      }
    })
    .catch((error) => {
      console.error(error);
    });
});


// Desativar submit com enter