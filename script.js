const passwordForm = document.getElementById("password-form");

const length = document.getElementById("length");
const lengthValue = document.getElementById("length-value");

const checkBoxes = document.querySelectorAll("input[type='checkbox']");

const includeLowercase = document.getElementById("lowercase");
const includeUppercase = document.getElementById("uppercase");
const includeNumbers = document.getElementById("numbers");
const includeSymbols = document.getElementById("symbols");

const passwordDisplay = document.getElementById("password-display");
const copyButton = document.getElementById("copy-button");

length.addEventListener("input", () => {
  lengthValue.textContent = length.value;
});

checkBoxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const isAnyChecked = Array.from(checkBoxes).some((cb) => cb.checked);
    if (!isAnyChecked) {
      checkbox.checked = true;
    }
  });
});

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const passwordLength = parseInt(length.value, 10);
  const options = {
    includeLowercase: includeLowercase.checked,
    includeUppercase: includeUppercase.checked,
    includeNumbers: includeNumbers.checked,
    includeSymbols: includeSymbols.checked,
  };

  const password = generatePassword(passwordLength, options);
  passwordDisplay.textContent = password;
});

copyButton.addEventListener("click", () => {
  const password = passwordDisplay.textContent;
  navigator.clipboard
    .writeText(password)
    .then(() => {
      copyButton.textContent = "Contraseña Copiada!";
      copyButton.classList.add("copied");
      setTimeout(() => {
        copyButton.textContent = "Copiar al Portapapeles";
        copyButton.classList.remove("copied");
      }, 2000);
    })
    .catch((error) => {
      console.error("Error al copiar la contraseña: ", error);
    });
});

// Character sets for password generation
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

function generatePassword(length, options) {
  let characterSet = "";
  if (options.includeLowercase) {
    characterSet += lowercaseChars;
  }
  if (options.includeUppercase) {
    characterSet += uppercaseChars;
  }
  if (options.includeNumbers) {
    characterSet += numberChars;
  }
  if (options.includeSymbols) {
    characterSet += symbolChars;
  }

  if (characterSet.length === 0) {
    return "Debe seleccionar al menos un tipo de carácter.";
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    password += characterSet[randomIndex];
  }

  return password;
}
