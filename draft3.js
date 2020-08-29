// 1. LineItem class: represents a line item. Everytime I create a lineItem it will instantiate a lineItem object
// 2. UI class: handles UI tasks - i.e dsiaplys lineItems, alerts, removes lineItems
// 3. Store class: handles Storage using localStorage
// 4. Events section
  // 4.1. Event: Display LineItems
  // 4.2. Event: Add a LineItem
  // 4.3. Event: Remove a LineItem

//const name = document.querySelector('.item-name').value;
//const amount = document.querySelector('.item-amount').value;
//const date = document.querySelector('.item-date').value;


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
      lineItems.forEach((lineItem) => UI.addLineItem(lineItem))
    }

    static addLineItem(lineItem) {
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

        // Display current balance
        balance.innerText = currentBalance.toFixed(2);

        // Change color of balance & $
        if(balance.innerText <= 0) {
          balance.style.color = "red";
          dollarSign.style.color = "red";
        } else {
          balance.style.color = "green";
          dollarSign.style.color = "green";
        }


      }

      static increaseBalance() {
        //const balance = document.querySelector('.balance');
        const amount = document.querySelector('.item-amount').value;
        currentBalance = currentBalance + Number(amount)
        //UI.displayCurrentBalance();
      }

      static decreaseBalance() {
        const balance = document.querySelector('.balance');
        const amount = document.querySelector('.item-amount').value;
        currentBalance = currentBalance - Number(amount)
        //UI.displayCurrentBalance();
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



    // addLineItem function
    const addLineItem = e => {
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

        // Add lineItem to UI
        UI.addLineItem(lineItem);

        // Add lineItem to localStorage
        Store.addLineItem(lineItem);

        // Clear fields
        UI.clearFields();

        // Show success message
        UI.showAlert('Item successfully added', 'success');

        currentBalance = currentBalance + Number(amount);
        balance.innerText = currentBalance.toFixed(2);
      }
    }

    const addIncome = () => {
      addLineItem();
      //UI.increaseBalance();
      const balance = document.querySelector('.balance');
      const amount = document.querySelector('.item-amount').value;


      //currentBalance = currentBalance + Number(amount);
      //currentBalance++;
      //balance.innerText = currentBalance.toFixed(2);
      //UI.displayCurrentBalance();
      //console.log(amount.value);

    }

    const addExpense = () => {
      addLineItem()
      //UI.decreaseBalance();
      const balance = document.querySelector('.balance');
      const amount = document.querySelector('.item-amount').value;
      //currentBalance = currentBalance + Number(amount)
      //currentBalance--;
      //balance.innerText = currentBalance.toFixed(2);
      //UI.displayCurrentBalance();
      //console.log(balance.innerText);
    }

    // 4.2. Event: Add a LineItem
    document.querySelector('.income-btn').addEventListener('click', addIncome);
    document.querySelector('.expense-btn').addEventListener('click', addExpense);


    // 4.3. Event: Remove a LineItem
    document.querySelector('.table').addEventListener('click', (e) => {
      // Remove book from UI
      UI.deleteLineItem(e.target);
      // Remove lineItem from Store
      Store.removeLineItem(e.target.parentElement.previousElementSibling.innerText)
      // Show success message
       UI.showAlert('Item removed', 'success');

    });
