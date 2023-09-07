const nextStep1Button = document.getElementById("next-step-1");

nextStep1Button.addEventListener("click", () => {
  const brandName = document.getElementById("form-input-brand").value;
  const name = document.getElementById("form-input-name").value;
  const whatsapp = document.getElementById("form-input-whatsapp").value;
  const lineOfBusiness = document.getElementById(
    "form-input-line-of-business"
  ).value;

  if (!brandName || !name || !whatsapp || !lineOfBusiness) {
alert("preencha todos os campos")
return false;
  } 

  const lead = {
    title: "CRM PipeRun - Landing Page",
    user: "email@registre-se.com",
    brandName: brandName,
    name: name,
    email: name, 
    mobile_phone: whatsapp,
    last_conversion: {
      source: "Site_CRMPipeRun",
    },
    custom_fields: {
      segmento: lineOfBusiness ? lineOfBusiness : "Não Informado",
    },
    tags: ["Contato"],
    notes: [
      "Contato enviado através do formulário da nova Landing Page.",
    ],
  };

  const dataToSend = {
    rules: {
      update: true,
      equal_pipeline: true,
      filter_status_update: "open",
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
