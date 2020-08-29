const pattern = /\$?[\d]+(\.[\d]{0,2})?/




// 1. LineItem Class: everytime I add a new lineitem (either expense or income, I will instantiate a new lineItem Object)
class LineItem {
  constructor(name, amount, date, id) {
    this.name = name;
    this.amount = amount;
    this.date = date;
    this.id = id;
  }
}

// 2. UI Class: everytime something happens. Either a line item is added, removed, or edited.
class UI {
  static displayLineItems() {
    const lineItems = Store.getLineItems();

    lineItems.forEach((lineItem) => UI.addIncomeLineItem(lineItem))
  }

  // Add income line item
  static addIncomeLineItem(lineItems) {
      const tBody = document.querySelector(".table tbody");
      // Create tr
      const incomeLineItem = document.createElement("tr");
      incomeLineItem.classList.add("table-success", "line-item");
      incomeLineItem.innerHTML = `
        <th>${lineItems.name}</th>
        <td>$${lineItems.amount}</td>
        <td>${lineItems.date}</td>
        <td class="btn-container">
          <span class="badge badge-pill badge-danger cursor-pointer delete">X</span>
          <span class="badge badge-pill badge-success cursor-pointer">Edit</span>
        </td>
      `
      tBody.appendChild(incomeLineItem);
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
      const container = document.querySelector('.income-form');
      const form = document.querySelector('.form-group');
      container.insertBefore(div, form);
      // Disappear in 3 seconds
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
      document.querySelector('.income-item').value = '';
      document.querySelector('.income-amount').value = '';
      document.querySelector('.income-date').value = '';
    }
}


// Display lineItems
document.addEventListener('DOMContentLoaded', UI.displayLineItems);
// Event: Add lineItem
document.querySelector('.income-btn').addEventListener('click', () => {
  // Get form values
  const incomeItem = document.querySelector('.income-item').value;
  const incomeAmount = document.querySelector('.income-amount').value;
  const incomeDate = document.querySelector('.income-date').value;



  // Validate
  if(incomeItem === '' || incomeAmount === '' || incomeDate === '') {
    UI.showAlert('Please fill in all the fields', 'danger')
  } else {
    // Instantiate line item
    const lineItem = new LineItem(incomeItem, incomeAmount, incomeDate)

    // Add line item to UI
    UI.addIncomeLineItem(lineItem)

    // Add lineItem to Store
    Store.addLineItem(lineItem)

    // Clear fields
    UI.clearFields()

    // Show success message
    UI.showAlert('Item successfully added', 'success');
  }

});

// Event: Remove lineItem
document.querySelector('.table').addEventListener('click', (e) => {
  // Remove book from UI
  UI.deleteLineItem(e.target);

  // Remove book from Store
  Store.removeLineItem(id) // I need to get the id

  // Show success message
  UI.showAlert('Item removed', 'success');
});
// Display balance
// Increase balance
// Decrease balance


// Event: Edit lineItem




// Store Class - deals with localStorage
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
    const lineItems = Store.getLineItems();

    lineItems.forEach((lineItem, index) => {
      if(lineItem.id === id) {
        lineItems.splice(index, 1);
      }
    });
    localStorage.setItem('lineItems', JSON.stringify(lineItems));
  }
}
