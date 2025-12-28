const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const type = document.getElementById('type');

function addTransaction(e) {
    e.preventDefault();

    let amt = +amount.value;

    // Convert expense to negative automatically
    if (type.value === 'expense') {
        amt = -amt;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: amt
    };

    transactions.push(transaction);
    updateLocalStorage();
    updateUI();

    text.value = '';
    amount.value = '';
}


function updateUI() {
    list.innerHTML = '';

    let total = 0, inc = 0, exp = 0;

    transactions.forEach(t => {
        total += t.amount;
        if (t.amount > 0) inc += t.amount;
        else exp += t.amount;

        const li = document.createElement('li');
        li.classList.add(t.amount > 0 ? 'plus' : 'minus');
        li.innerHTML = `
            ${t.text} <span>₹${t.amount}</span>
            <button onclick="removeTransaction(${t.id})">x</button>
        `;
        list.appendChild(li);
    });

    balance.innerText = `₹${total}`;
    income.innerText = `₹${inc}`;
    expense.innerText = `₹${Math.abs(exp)}`;
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    updateUI();
}

function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

form.addEventListener('submit', addTransaction);
updateUI();
