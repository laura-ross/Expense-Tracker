// When I remove a lineItem, add or subtract the amount from the Balance & update in localStorage - I GOT STUCK DOING THIS AND DONT HAVE THE PATIENCE TO FIGURE OUT HOW TO DO IT - I THINK I"LL HAVE TO CREATE AN INCOME LINE ITEM AND EXPENSE LINE ITEM IN BOTH THE UI AND LOCAL STORAGE BUT I DON"T KNOW HOW TO DISPLAY THEM PROPERLY



// 1. LineItem class: represents a line item.

// 2. UI class: handles UI tasks - i.e dsiaplys lineItems, alerts, removes lineItems
// 3. Store class: handles Storage using localStorage
// 4. Events section
  // 4.1. Event: Display LineItems
  // 4.2. Event: Add a LineItem
  // 4.3. Event: Remove a LineItem


var currentBalance = 0;

// 1. LineItem class
  class LineItem {
    constructor(name, amount, date, id) {
      this.name = name;
      this.amount = amount;
      this.date = date;
      this.id = id;
    }
  }


  // 2. UI class
  class UI {

    // Display LineItems
    static displayLineItems() {
      const lineItems = Store.getLineItems();
      lineItems.forEach((lineItem) =>
        UI.addIncomeLineItem(lineItem));

      lineItems.forEach((lineItem) =>
        UI.addExpenseLineItem(lineItem));
    }

    static addIncomeLineItem(lineItem) {
        const lineItemsList = document.querySelector(".table tbody");
        // Create tr
        const lineItemRow = document.createElement("tr");
        lineItemRow.classList.add("table-success", "line-item");
        lineItemRow.innerHTML = `
          <th>${lineItem.name}</th>
          <td>$${lineItem.amount}</td>
          <td>${lineItem.date}</td>
          <td>${lineItem.id}</td>
          <td class="btn-container">
            <span class="badge badge-pill badge-danger cursor-pointer delete">X</span>
          </td>
        `
        lineItemsList.appendChild(lineItemRow);
      }

      static addExpenseLineItem(lineItem) {
          const lineItemsList = document.querySelector(".table tbody");
          // Create tr
          const lineItemRow = document.createElement("tr");
          lineItemRow.classList.add("table-danger", "line-item");
          lineItemRow.innerHTML = `
            <th>${lineItem.name}</th>
            <td>$${-Number(lineItem.amount)}</td>
            <td>${lineItem.date}</td>
            <td>${lineItem.id}</td>
            <td class="btn-container">
              <span class="badge badge-pill badge-danger cursor-pointer delete">X</span>
            </td>
          `
          lineItemsList.appendChild(lineItemRow);
        }

      static deleteLineItem(el) {
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
        }

      }

      static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.form-group-container');
        const formGroup = document.querySelector('.form-group');
        container.insertBefore(div, formGroup);
        // Disappear in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
      }

      static clearFields() {
        document.querySelector('.item-name').value = '';
        document.querySelector('.item-amount').value = '';
        document.querySelector('.item-date').value = '';
      }



      // Balance methods

      static displayCurrentBalance() {
        const balance = document.querySelector('.balance');
        const dollarSign = document.querySelector(".dollar-sign");

        // Change color of balance & $
        if(balance.innerText <= 0) {
          balance.style.color = "red";
          dollarSign.style.color = "red";
        } else {
          balance.style.color = "green";
          dollarSign.style.color = "green";
        }
        // get currentBalance from localStorage
        // Convert it from string to number?
         const storedCurrentBalance = Number(localStorage.getItem('currentBalance'));
         //const storedCurrentBalanceToNum = parseInt(storedCurrentBalance);
         //console.log(storedCurrentBalanceToNum);

         // Display current balance
         //balance.innerText = currentBalance.toFixed(2);
         //balance.innerText = storedCurrentBalance.toFixed(2);
         balance.innerText = storedCurrentBalance.toFixed(2);
      }

  }


  // 3. Store class
  class Store {
    static getLineItems() {
      let lineItems;
      if(localStorage.getItem('lineItems') === null) {
        lineItems = [];
      } else {
        lineItems = JSON.parse(localStorage.getItem('lineItems'));
      }
        return lineItems;
    }

    static addLineItem(lineItem) {
      const lineItems = Store.getLineItems();
      lineItems.push(lineItem);
      localStorage.setItem('lineItems', JSON.stringify(lineItems));

    }

    static removeLineItem(id) {
      let lineItems = Store.getLineItems();
      lineItems.forEach((lineItem, index) => {
        if(lineItem.id == id) {
          lineItems.splice(index, 1);
        }
      });

      localStorage.setItem('lineItems', JSON.stringify(lineItems));

    }
  }


  // 4. Events section

    // 4.1. Event: Display LineItems
    document.addEventListener('DOMContentLoaded', () => {
      UI.displayLineItems()
      UI.displayCurrentBalance()
    });


    // 4.2. Event: Add a LineItem

    // Add an incomeLineItem upon clicking add income button
    document.querySelector('.income-btn').addEventListener('click', (e) => {
      const balance = document.querySelector('.balance');
      const name = document.querySelector('.item-name').value;
      const amount = document.querySelector('.item-amount').value;
      const date = document.querySelector('.item-date').value;
      const id = Math.floor(Math.random() * 1000)


      if(name === '' || amount === '' || date === '') {
        UI.showAlert('Please fill in all the fields', 'danger')
      } else {
        // Instantiate lineItem
        const lineItem = new LineItem(name, amount, date, id);
        //const lineItemRow = document.createElement("tr");
        //lineItemRow.classList.add("table-success");
        // Add lineItem to UI
        UI.addIncomeLineItem(lineItem);
        // Add lineItem to localStorage
        Store.addLineItem(lineItem);
        // Clear fields
        UI.clearFields();
        // Show success message
        UI.showAlert('Item successfully added', 'success');

        currentBalance = currentBalance + Number(amount);
        balance.innerText = currentBalance.toFixed(2);
        // Set currentBalance to localStorage
        localStorage.setItem('currentBalance', currentBalance);
      }
    });

    // Add an expenseLineItem upon clicking add expense button
    document.querySelector('.expense-btn').addEventListener('click', (e) => {
      const balance = document.querySelector('.balance');
      const name = document.querySelector('.item-name').value;
      const amount = document.querySelector('.item-amount').value;
      const date = document.querySelector('.item-date').value;
      const id = Math.floor(Math.random() * 1000)

      if(name === '' || amount === '' || date === '') {
        UI.showAlert('Please fill in all the fields', 'danger')
      } else {
        // Instantiate lineItem
        const lineItem = new LineItem(name, amount, date, id);
        //const lineItemRow = document.createElement("tr");
        //lineItemRow.classList.add("table-danger");
        // Add lineItem to UI
        UI.addExpenseLineItem(lineItem);
        // Add lineItem to localStorage
        Store.addLineItem(lineItem);
        // Clear fields
        UI.clearFields();
        // Show success message
        UI.showAlert('Item successfully added', 'success');

        currentBalance = currentBalance - Number(amount);
        balance.innerText = currentBalance.toFixed(2);
        // Set currentBalance to localStorage
        localStorage.setItem('currentBalance', currentBalance);
      }
    });


    // 4.3. Event: Remove a LineItem
    document.querySelector('.table').addEventListener('click', (e) => {
      const amount = document.querySelector('.item-amount').value;
      // Remove book from UI
      UI.deleteLineItem(e.target);
      // Remove lineItem from Store
      Store.removeLineItem(e.target.parentElement.previousElementSibling.innerText)
      // Show success message
       UI.showAlert('Item removed', 'success');
       // set currentBalance to localStorage
      // How do I differentiate between increasing or decreasing balance?
      // If classList.includes red background / green background do something?

    });

    //// TO DO ////
    // X - Save currentBalance in localStorage
    // When I remove a lineItem, add or subtract the amount from the Balance & update in localStorage
    // Turn the expense lineItems red
    // Implement my regex pattern in the amount input
    // Try to make this code more DRY
    // Make sure my table of contents matches up to the code itself
