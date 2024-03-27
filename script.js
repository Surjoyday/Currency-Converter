// -------> ELEMENTS

const baseURL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");

const getDataBtn = document.querySelector(".btn__exhange_rate");

const msgLabel = document.querySelector(".final-msg");

const resetBtn = document.querySelector(".reset_btn");

// -------> Extracting Currency Codes

const countryCodesList = countryList.map((currCode) => {
  return currCode.currency;
});

const uniqueCountryCodesList = [...new Set(countryCodesList)];

uniqueCountryCodesList.sort();

// -------> FUNCTIONS

const udpdateFlag = (element) => {
  // console.log(element);

  const currencyCode = element.value;

  const countryCode = countryList.find((ele) => ele.currency === currencyCode);

  const newSrc = `https://flagsapi.com/${countryCode.code}/shiny/64.png`;

  const img = element.parentElement.querySelector("img");

  img.src = newSrc;
};

// -------> Creating dropdowns

Array.from(dropdowns).forEach((select) => {
  uniqueCountryCodesList.forEach((currencyCode) => {
    const newOption = document.createElement("option");

    newOption.innerText = currencyCode;
    newOption.value = currencyCode;

    select.append(newOption);

    if (select.getAttribute("name") === "from" && currencyCode === "USD") {
      newOption.selected = true;
    } else if (select.getAttribute("name") === "to" && currencyCode === "INR") {
      newOption.selected = true;
    }
  });

  select.addEventListener("change", function (e) {
    udpdateFlag(e.target);
  });
});

// -------> EVENT LISTNER

getDataBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const amount = document.querySelector(".amount input");

  let amountValue = Number(amount.value);

  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = 1;
  }

  let fromCurrencyLower = fromCurrency.value.toLowerCase();
  let toCurrencyLower = toCurrency.value.toLowerCase();

  const URL = `${baseURL}/${fromCurrencyLower}/${toCurrencyLower}.json`;

  const response = await fetch(URL);

  const data = await response.json();

  const rate = Number(data[toCurrencyLower]);

  let finalAmount = (amountValue * rate).toFixed(2);

  msgLabel.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;

  msgLabel.classList.toggle("display-data");
});
