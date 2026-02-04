let transactions = [];

async function loadTransactions() {
  const data = [
    { id: 1, title: "Groceries", amount: -1200, category: "food", date: "2026-01-20" },
    { id: 2, title: "Salary", amount: 25000, category: "income", date: "2026-01-01" },
    { id: 3, title: "Electric Bill", amount: -3000, category: "utilities", date: "2026-01-18" },
    { id: 4, title: "Shopping", amount: -8000, category: "shopping", date: "2026-01-25" }
  ];

  return new Promise(resolve => {
    setTimeout(() => resolve(data), 500);
  });
}

function mapCategories(data) {
  return data.map(txn => ({
    ...txn,
    category: txn.category.toUpperCase()
  }));
}

function filterHighSpends(data) {
  return data.filter(txn => txn.amount < -5000);
}

function calculateBalance(data) {
  return data.reduce((total, txn) => total + txn.amount, 0);
}

function render(data) {
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  data.forEach(txn => {
    const row = document.createElement("tr");

    if (txn.amount < -5000) row.classList.add("high");

    row.innerHTML = `
      <td>${txn.date}</td>
      <td>${txn.title}</td>
      <td>${txn.category}</td>
      <td>₹${txn.amount}</td>
    `;
    list.appendChild(row);
  });

  document.getElementById("balance").textContent = calculateBalance(data);
}

function filterByDate() {
  const from = document.getElementById("fromDate").value;
  const to = document.getElementById("toDate").value;

  let filtered = transactions;

  if (from && to) {
    filtered = transactions.filter(txn =>
      txn.date >= from && txn.date <= to
    );
  }

  render(filtered);
  currentView = filtered;
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(currentView, null, 2)], {
    type: "application/json"
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "transactions.json";
  link.click();
}

let currentView = [];

document.getElementById("filterBtn").addEventListener("click", filterByDate);
document.getElementById("exportBtn").addEventListener("click", exportJSON);

(async function init() {
  const data = await loadTransactions();
  transactions = mapCategories(data);
  currentView = transactions;
  render(transactions);

  console.log("High spends:", filterHighSpends(transactions));
})();
