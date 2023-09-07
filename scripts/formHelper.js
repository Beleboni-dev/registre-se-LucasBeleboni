const telInputs = document.querySelectorAll(".form-input-whatsapp");

telInputs.forEach((input) => {
  input.addEventListener("input", formatNumber);
});

function formatNumber(e) {
  const input = e.target;
  const value = input.value.replace(/\D/g, "");
  const formattedValue = formatPhoneNumber(value);

  if (value === "") {
    input.value = "";
  } else {
    input.value = formattedValue;
  }
}

function formatPhoneNumber(value) {
  if (value.length <= 2) {
    return `(${value}`;
  } else if (value.length <= 7) {
    return `(${value.slice(0, 2)}) ${value.slice(2)}`;
  } else if (value.length <= 11) {
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  } else {
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
  }
}
