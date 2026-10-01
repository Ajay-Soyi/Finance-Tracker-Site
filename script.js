// Authentication logic
const registeredUsers =
  JSON.parse(localStorage.getItem("registeredUsers")) || [];

const registerForm = document.querySelector(".register-card form");
const loginForm = document.querySelector(".login-card form");
const loginCard = document.querySelector(".login-card");
const registerCard = document.querySelector(".register-card");
const registerLink = document.querySelector("#register-link");
const loginLink = document.querySelector("#login-link");
// const ctx = document.getElementById("cash-flow-chart"); // chart canvas
const dashboard = document.querySelector(".dashboard");
const auth = document.getElementById("auth");

const calculateTransactions = (transactionsArr) => {
  let currentBalance = 0;
  let totalIncome = 0;
  let totalExpense = 0;
  let totalTransactions = transactionsArr.length;
  transactionsArr.forEach((elem) => {
    if (elem.type === "Income") {
      totalIncome += Number(elem.amount);
    } else {
      totalExpense += Number(elem.amount);
    }
  });
  currentBalance = totalIncome - totalExpense;

  return {
    currentBalance,
    totalIncome,
    totalExpense,
    totalTransactions,
  };
};

const generateChartUI = (ctx) => {};

const renderDashboard = (transactionsArr, user) => {
  const transactionOBj = calculateTransactions(transactionsArr);
  dashboard.innerHTML = "";
  dashboard.innerHTML += `
            <!-- side navbar -->
        <nav class="side-navbar">
          <div class="logo">
            <i class="fa-solid fa-layer-group"></i>
            <div class="logo-details">
              <h2>FinTrack Pro</h2>
              <p>Enterprise Finance</p>
            </div>
          </div>
          <div class="menu">
            <button id="dashboard-btn">
              <i class="fa-solid fa-border-all"></i> Dashboard
            </button>
            <button id="dashboard-setting-btn">
              <i class="fa-solid fa-gear"></i> Settings
            </button>
          </div>
          <button id="add-transaction">
            <i class="fa-solid fa-plus"></i> Add Transaction
          </button>
        </nav>
        <!-- header -->
        <header class="header">
          <div class="user-info">
            <h3>${user.username}</h3>
            <button>
              <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </header>
        <!-- overview-heading  -->
        <div class="overview">
          <h1>Financial Overview</h1>
          <p>Real-time tracking application</p>
        </div>
        <!-- current-balance-container -->
        <div class="current-balance">
          <div class="icon">
            <i class="fa-solid fa-building-columns"></i>
          </div>
          <div class="container-detail">
            <p>Current Balance</p>
            <h2>$${transactionOBj.currentBalance}.00</h2>
          </div>
        </div>
        <!-- total-income-container -->
        <div class="total-income">
          <div class="icon">
            <i class="fa-solid fa-arrow-trend-up"></i>
          </div>
          <div class="container-detail">
            <p>Total Income</p>
            <h2>$${transactionOBj.totalIncome}.00</h2>
          </div>
        </div>
        <!-- total-expense-container -->
        <div class="total-expense">
          <div class="icon">
            <i class="fa-solid fa-arrow-trend-down"></i>
          </div>
          <div class="container-detail">
            <p>Total Expense</p>
            <h2>$${transactionOBj.totalExpense}.00</h2>
          </div>
        </div>
        <!-- total-transaction-container -->
        <div class="total-transaction">
          <div class="icon">
            <i class="fa-solid fa-piggy-bank"></i>
          </div>
          <div class="container-detail">
            <p>Total Transactions</p>
            <h2>${transactionOBj.totalTransactions}</h2>
          </div>
        </div>
        <!-- cash-flow-analysis-container -->
        <div class="cash-flow-analysis">
          <h2>Cash Flow Analysis</h2>
          <canvas id="cash-flow-chart"></canvas>
        </div>
        <!-- preferences-container -->
        <div class="preferences">
          <h2>Preferences</h2>
          <div class="preferences-button">
            <h3>Dark Mode</h3>
            <label class="theme-toggle">
              <input type="checkbox" id="theme-toggle" />
              <span class="slider"></span>
            </label>
          </div>
          <button><i class="fa-solid fa-trash"></i> Reset All Data</button>
        </div>
        <!-- all-transactions-container -->
        <div class="all-transactions">
          <h2>All Transactions</h2>
          <div class="search">
            <div class="search-input">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="search" placeholder="Search transactions..." />
            </div>
            <div class="select-type">
              <select name="types" id="type">
                <option value="All types">All types</option>
                <option value="Income only">Income only</option>
                <option value="Expense only">Expense Only</option>
              </select>
            </div>
          </div>
          <div class="finance-details">
            <div class="date">
              <h4>Date</h4>
            </div>
            <div class="description">
              <h4>Description</h4>
              <p></p>
            </div>
            <div class="category">
              <h4>Category</h4>
            </div>
            <div class="amount">
              <h4>Amount</h4>
            </div>
            <div class="actions">
              <h4>Actions</h4>
              <button><i class="fa-solid fa-pen"></i></button>
              <button><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
        <!-- settings container -->
        <div class="settings hide" id="settings-container">
          <div class="setting-heading">
            <h2>Settings</h2>
            <p>Manage your account profile and app formatting.</p>
          </div>
          <div class="profile-details">
            <h2>Profile Details</h2>
            <div class="details-user">
              <div class="full-name">
                <label for="full-name">Full Name</label>
                <input type="text" value="Name" id="full-name" />
              </div>
              <div class="currency">
                <label for="primary-currency">Primary Currency</label>
                <select id="primary-currency" required="">
                  <option value="$">USD ($)</option>
                  <option value="€">EUR (€)</option>
                  <option value="£">GBP (£)</option>
                  <option value="₹">INR (₹)</option>
                  <option value="¥">JPY (¥)</option>
                </select>
              </div>
            </div>
            <button>Save Changes</button>
          </div>
        </div>
  `;
  const ctx = document.getElementById("cash-flow-chart");
  generateChartUI(ctx);
};

const checkLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    sessionStorage.setItem("isLoginCard", "null");
    const transactionArr =
      JSON.parse(localStorage.getItem(`transactions_${user.username}`)) || [];

    registerCard.classList.add("hide");
    loginCard.classList.add("hide");
    auth.classList.add("hide");
    renderDashboard(transactionArr, user);
  }
};

const checkCard = () => {
  if (sessionStorage.getItem("isLoginCard") === "true") {
    loginCard.classList.remove("hide");
    registerCard.classList.add("hide");
  } else if (sessionStorage.getItem("isLoginCard") === "false") {
    loginCard.classList.add("hide");
    registerCard.classList.remove("hide");
  }
};
checkLoggedIn();
checkCard();

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = e.target[0].value;
  const password = e.target[1].value;

  if (
    registeredUsers.some(
      (elem) => elem.username === username && elem.password === password,
    )
  ) {
    loginCard.classList.add("hide");
    auth.classList.add("hide");
    const user = { username, currency: "$" };
    localStorage.setItem("user", JSON.stringify(user));
    const transactionsArr =
      JSON.parse(localStorage.getItem(`transactions_${username}`)) || [];
    if (!localStorage.getItem(`transactions_${username}`)) {
      localStorage.setItem(`transactions_${username}`, JSON.stringify([]));
    }
    renderDashboard(transactionsArr, user);
  } else {
    alert("Invalid username or password.");
  }
});

registerLink.addEventListener("click", () => {
  sessionStorage.setItem("isLoginCard", "false");
  registerCard.classList.remove("hide");
  loginCard.classList.add("hide");
  document.title = "Register - FinTrack Pro";
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = e.target[0].value;
  const password = e.target[1].value;

  if (registeredUsers.some((elem) => elem.username === username)) {
    alert("Username already exists! Please choose another.");
  } else {
    registeredUsers.push({
      username,
      password,
      currency: "$",
    });
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
    alert("Registration successful! You can now log in.");
    loginCard.classList.remove("hide");
    registerCard.classList.add("hide");
    document.title = "Login - FinTrack Pro";
    sessionStorage.setItem("isLoginCard", "true");
    e.target[0].value = "";
    e.target[1].value = "";
  }
});

loginLink.addEventListener("click", () => {
  sessionStorage.setItem("isLoginCard", "true");
  loginCard.classList.remove("hide");
  registerCard.classList.add("hide");
  document.title = "Login - FinTrack Pro";
});
