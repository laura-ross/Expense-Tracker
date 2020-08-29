// Income variables
const incomeItem = document.querySelector(".income-item");
const incomeAmount = document.querySelector(".income-amount");
const incomeDate = document.querySelector(".income-date");
const incomeBtn = document.querySelector(".income-btn");

// Expense variables
const expenseItem = document.querySelector(".expense-item");
const expenseAmount = document.querySelector(".expense-amount");
const expenseDate = document.querySelector(".expense-date");
const expenseBtn = document.querySelector(".expense-btn");
const form = document.querySelector(".form");

// Balance
const balance = document.querySelector(".balance");
const dollarSign = document.querySelector(".dollar-sign");
const btnContainer = document.createElement("tr");
// Table tbody
const tBody = document.querySelector(".table tbody");


// Set current balance to 0
let currentBalance = 0;




// Increase (or decrease) current balance on click
// by adding amount.value to currentBalance
const increaseBalance = () => {
currentBalance += parseFloat(incomeAmount.value);

}

const decreaseBalance = () => {
  currentBalance -= parseFloat(expenseAmount.value);
}

// Change the innerText of current balance to new current balance
const displayCurrentBalance = () => {
  balance.innerText = currentBalance.toFixed(2);
  if(balance.innerText <= 0) {
    balance.style.color = "red";
    dollarSign.style.color = "red";
  }

  if(balance.innerText >= 1) {
    balance.style.color = "green";
    dollarSign.style.color = "green";
  }
}

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

const pattern = /\$?[\d]+(\.[\d]{0,2})?/

    //const invalidMsg = document.createElement("div");
    //invalidMsg.classList.add("invalid-feedback");
    //invalidMsg.innerText = "Please enter a valid number such as: 75.00 or $75.00";
    //form.appendChild(invalidMsg);
    //<div class="invalid-feedback">Sorry, that username's taken. Try another?</div>

const deleteItem = (e) => {
  e.target.parentElement.parentElement.remove();
  // if amountValue.parentElement.parentElement
}

const addIncome = () => {
    //validation
    if(!pattern.test(incomeAmount.value)) {
      alert("please enter a valid number");
    } else {
      // Create tr
      const incomeLineItem = document.createElement("tr");
      incomeLineItem.classList.add("table-success", "line-item");
      tBody.appendChild(incomeLineItem);
      // Create th
      const th = document.createElement("th");
      th.scope = "row";
      th.innerText = incomeItem.value;
      incomeLineItem.appendChild(th);
      // Create amountTd (container)
      const amountTd = document.createElement("td");
      incomeLineItem.appendChild(amountTd);
      // Create amount value
      const amountValue = document.createElement("span");
      amountValue.innerText = parseFloat(incomeAmount.value).toFixed(2);
      amountTd.appendChild(amountValue);
      // Create dollar sign span
      const itemDollarSign = document.createElement("span");
      itemDollarSign.innerText = "$";
      amountTd.insertBefore(itemDollarSign, amountValue);
      // Create dateTd
      const dateTd = document.createElement("td");
      dateTd.innerText = incomeDate.value;
      incomeLineItem.appendChild(dateTd);

      // Add delete & edit btns
      // Create container for delete & edit btn
      const btnContainer = document.createElement("td");
      btnContainer.classList.add("btn-container");
      incomeLineItem.appendChild(btnContainer);
      // Add deleteBtn
      const deleteBtn = document.createElement("span");
      deleteBtn.classList.add("badge", "badge-pill", "badge-danger", "cursor-pointer")
      deleteBtn.innerText = "X";
      btnContainer.appendChild(deleteBtn);
      // Add editBtn
      const editBtn = document.createElement("span");
      editBtn.classList.add("badge", "badge-pill", "badge-success", "cursor-pointer");
      editBtn.innerText = "Edit";
      btnContainer.appendChild(editBtn);

      // Add incomeAmount to balance
      increaseBalance();
      displayCurrentBalance();
      clearIncomeForm();


        deleteBtn.addEventListener("click", deleteItem)

    }

    // add event listener to delete button to delete the entire row.

}

const addExpense = () => {
  // Validation
  if(!pattern.test(expenseAmount.value)) {
    alert("please enter a valid number");
  } else {
    // Create tr
    const expenseLineItem = document.createElement("tr");
    expenseLineItem.classList.add("table-danger", "line-item");
    tBody.appendChild(expenseLineItem);
    // Create th
    const th = document.createElement("th");
    th.scope = "row";
    th.innerText = expenseItem.value;
    expenseLineItem.appendChild(th);
    const amountTd = document.createElement("td");
    expenseLineItem.appendChild(amountTd);
    // Create amount value
    const amountValue = document.createElement("span");
    amountValue.innerText = parseFloat(expenseAmount.value).toFixed(2);
    amountTd.appendChild(amountValue);
    // Create dollar sign span
    const itemDollarSign = document.createElement("span");
    itemDollarSign.innerText = "$";
    amountTd.insertBefore(itemDollarSign, amountValue);
    // Create dateTd
    const dateTd = document.createElement("td");
    dateTd.innerText = expenseDate.value;
    expenseLineItem.appendChild(dateTd);

    // Add delete & edit btns
    // Create container for delete & edit btn
    const btnContainer = document.createElement("td");
    btnContainer.classList.add("btn-container");
    expenseLineItem.appendChild(btnContainer);
    // Add deleteBtn
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("badge", "badge-pill", "badge-danger", "cursor-pointer")
    deleteBtn.innerText = "X";
    btnContainer.appendChild(deleteBtn);
    // Add editBtn
    const editBtn = document.createElement("span");
    editBtn.classList.add("badge", "badge-pill", "badge-success", "cursor-pointer");
    editBtn.innerText = "Edit";
    btnContainer.appendChild(editBtn);
    // Add expenseAmount to balance
    decreaseBalance();
    displayCurrentBalance();
    clearExpenseForm();

    deleteBtn.addEventListener("click", deleteItem)
  }
}


incomeBtn.addEventListener("click", addIncome);
expenseBtn.addEventListener("click", addExpense);
displayCurrentBalance();





// add a delete function
// add an edit function
// add localStorage
// add other pages
