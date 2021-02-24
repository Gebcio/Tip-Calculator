"use strict";

const btnCalculate = document.querySelector("#calculate");

function isValid(billAm, numOfPeople, tipVal) {
  let feedback = false;

  document.querySelector("#noBillAmount").style.display = "none";
  document.querySelector("#noPeople").style.display = "none";
  document.querySelector("#noTipValue").style.display = "none";

  if (billAm === Number() || billAm <= 0) {
    document.querySelector("#noBillAmount").style.display = "block";
    feedback = true;
  }
  if (numOfPeople === Number() || numOfPeople <= 0) {
    document.querySelector("#noPeople").style.display = "block";
    feedback = true;
  }
  if (tipVal === Number() || tipVal <= 0) {
    document.querySelector("#noTipValue").style.display = "block";
    feedback = true;
  }

  if (feedback === true)
    document.querySelector("#results").style.display = "none";

  return feedback;
}

function due(billAm, numOfPeople, tipVal) {
  const tipAmount = Math.round(billAm * tipVal);
  const totalAmount = billAm + tipAmount;
  const eachPersonAmount = totalAmount / numOfPeople;

  return [tipAmount, totalAmount, eachPersonAmount];
}

btnCalculate.addEventListener("click", function (e) {
  e.preventDefault();

  const billAmountInput = document.querySelector("#billAmount");
  const numberOfPeopleInput = document.querySelector("#numberOfPeople");
  const tipValueInput = document.querySelector("#tipValue");

  // Getting values from input fields
  const billAmount = +billAmountInput.value;
  const numberOfPeople = +numberOfPeopleInput.value;
  const tipValueRaw = tipValueInput.value;
  const tipValue = tipValueRaw.includes("%")
    ? +tipValueRaw.slice(0, tipValueRaw.length - 1) / 100
    : +tipValueRaw / 100;

  const feedback = isValid(billAmount, numberOfPeople, tipValue);

  if (!feedback) {
    const results = due(billAmount, numberOfPeople, tipValue);

    document.querySelector("#tipAmount").textContent = results[0].toFixed(2);
    document.querySelector("#totalAmount").textContent = results[1].toFixed(2);
    document.querySelector(
      "#eachPersonAmount"
    ).textContent = results[2].toFixed(2);

    document.querySelector("#results").style.display = "block";
  }
});
