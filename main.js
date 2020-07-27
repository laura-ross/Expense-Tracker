// grab income-Item
// grab income-Amount
// grab income-Date
// grab income-button
const incomeItem = document.querySelector(".income-item");
const incomeAmount = document.querySelector(".income-amount");
const incomeDate = document.querySelector(".income-date");
const incomeBtn = document.querySelector(".income-btn");


// grab expense-Item
// grab expense-Amount
// grab expense-Date
// grab expense-button
const expenseItem = document.querySelector(".expense-item");
const expenseAmount = document.querySelector(".expense-amount");
const expenseDate = document.querySelector(".expense-date");
const expenseBtn = document.querySelector(".expense-btn");

// grab Balance
const balance = document.querySelector(".balance");

// grab table tbody
const tBody = document.querySelector(".table tbody");

// define item category
// define amount category
// define date category

// TRY MAKING EXPENSE AND INCOME INTO A CLASS

// add each of the inputs to the table

const clearIncomeForm = () => {
  incomeItem.value = "";
  incomeAmount.value = "";
  incomeDate.value = "";
}

const clearExpenseForm = () => {
  expenseItem.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
}

const addIncome = () => {
    // Create tr
    const incomeLineItem = document.createElement("tr");
    incomeLineItem.classList.add("table-success");
    tBody.appendChild(incomeLineItem);
    // Create th
    const th = document.createElement("th");
    th.scope = "row";
    th.innerText = incomeItem.value;
    incomeLineItem.appendChild(th);
    // Create amountTd
    const amountTd = document.createElement("td");
    amountTd.innerText = incomeAmount.value;
    incomeLineItem.appendChild(amountTd);
    // Create dateTd
    const dateTd = document.createElement("td");
    dateTd.innerText = incomeDate.value;
    incomeLineItem.appendChild(dateTd);

    clearIncomeForm();
}

const addExpense = () => {
  // Create tr
  const expenseLineItem = document.createElement("tr");
  expenseLineItem.classList.add("table-danger");
  tBody.appendChild(expenseLineItem);
  // Create th
  const th = document.createElement("th");
  th.scope = "row";
  th.innerText = expenseItem.value;
  expenseLineItem.appendChild(th);
  // Create amountTd
  const amountTd = document.createElement("td");
  amountTd.innerText = expenseAmount.value;
  expenseLineItem.appendChild(amountTd);
  // Create dateTd
  const dateTd = document.createElement("td");
  dateTd.innerText = expenseDate.value;
  expenseLineItem.appendChild(dateTd);

  clearExpenseForm();
}


incomeBtn.addEventListener("click", addIncome);
expenseBtn.addEventListener("click", addExpense);
// for the expense amount, subtract it from balance
// for the income amount, add it to balance

// For the balance, if the total is negative, make it red, if its positive, make it green

// add a delete function
// add an edit function
