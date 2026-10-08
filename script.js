// Authentication logic
const registeredUsers =
  JSON.parse(localStorage.getItem("registeredUsers")) || [];

const registerForm = document.querySelector(".register-card form");
const loginForm = document.querySelector(".login-card form");
const loginCard = document.querySelector(".login-card");
const registerCard = document.querySelector(".register-card");
const registerLink = document.querySelector("#register-link");
const loginLink = document.querySelector("#login-link");
const dashboard = document.querySelector(".dashboard");
const auth = document.getElementById("auth");
const transactionBox = document.querySelector(".transaction-box");
let financeChart;

const checkTheme = (e) => {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    localStorage.setItem("theme", "dark");
    dashboard.id = "dark-theme-dashboard";
    transactionBox.id = "dark-theme-transaction-box";
  }
};
checkTheme();

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

const generateChartUI = (ctx, transactionObj) => {
  const labels = ["Income vs Expenses"];
  const income = transactionObj.totalIncome;
  const expense = transactionObj.totalExpense;
  const maximum = Math.max(income, expense);

  if (financeChart) {
    financeChart.destroy();
  }

  financeChart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: labels,

      datasets: [
        {
          label: "Income",
          data: [income],
          borderRadius: 5,
          backgroundColor: "green",
        },
        {
          label: "Expense",
          data: [expense],
          borderRadius: 5,
          backgroundColor: "#991b1b",
        },
      ],
    },

    options: {
      responsive: true,

      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: maximum * 1.2,
        },
      },

      plugins: {
        legend: {
          position: "top",
          labels: {
            color: "black",
            boxWidth: 35,
            boxHeight: 12,
          },
        },
      },
    },
  });
};

const renderFinanceDetail = (
  transactionArr,
  financialDate,
  financialDesc,
  financialCategory,
  financialAmt,
  financialActions,
) => {
  if (transactionArr.length === 0) return;
  for (let i = 0; i < transactionArr.length; i++) {
    // date
    const len = transactionArr.length;
    const datePara = document.createElement("p");
    datePara.textContent = transactionArr[i].date;
    financialDate.appendChild(datePara);

    // description
    const descPara = document.createElement("p");
    descPara.textContent = transactionArr[i].description;
    financialDesc.appendChild(descPara);

    // category
    const categoryPara = document.createElement("p");
    categoryPara.textContent = transactionArr[i].category;
    financialCategory.appendChild(categoryPara);

    // amount
    const amtPara = document.createElement("p");
    amtPara.textContent = transactionArr[i].amount;
    financialAmt.appendChild(amtPara);

    // actions
    const actionDiv = document.createElement("div");
    actionDiv.classList.add("action-btns");
    actionDiv.innerHTML = `
      <button ><i class="fa-solid fa-pen"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
  `;
    financialActions.appendChild(actionDiv);
  }
};

transactionBox.addEventListener("click", (e) => {
  const form = transactionBox.querySelector(".transaction-box>div");

  if (form && !form.contains(e.target)) {
    closeTransactionBox();
  }
});

const closeTransactionBox = () => {
  transactionBox.innerHTML = "";
  transactionBox.classList.remove("transaction-box-style");
};

const saveTransaction = (e, transactionArr) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  console.log(username);
  const transactionTempArr = JSON.parse(
    localStorage.getItem(`transactions_${username}`),
  );
  const type = e.target[0].value;
  const description = e.target[1].value;
  const amount = e.target[2].value;
  const date = e.target[3].value;
  const category = e.target[4].value;

  transactionTempArr.push({
    id: Date.now(),
    type,
    description,
    amount,
    date,
    category,
  });

  localStorage.setItem(
    `transactions_${username}`,
    JSON.stringify(transactionTempArr),
  );
  closeTransactionBox();
  renderDashboard(transactionTempArr, user);
};

const renderTransactionUI = () => {
  transactionBox.innerHTML = `
        <div class="transaction-form">
          <div class="header">
            <h3>Add Transaction</h3>
            <p onclick="closeTransactionBox()">x</p>
          </div>
          <form onsubmit = "saveTransaction(event)">
            <label for="type">Type</label>
            <select name="types" id="type">
              <option value="Income">Income</option>
              <option value="Expense" selected>Expense</option>
            </select>
            <label for="description">Description</label>
            <input type="text" placeholder="e.g. Amazon, Salary, Coffee" />
            <div class="amt-date">
              <div class="amt">
                <label for="amount">Amount</label>
                <input type="number" />
              </div>
              <div class="date">
                <label for="date">Date</label>
                <input type="date" name="date" id="date" />
              </div>
            </div>
            <label for="category">Category</label>
            <select name="category" id="category">
              <option value="select a category" selected disabled>
                Select a category
              </option>
              <option value="food & dining">Food and Dining</option>
              <option value="shopping">Shopping</option>
              <option value="recharge and bills">Recharge & Bills</option>
              <option value="petrol and auto">Petrol & Auto</option>
              <option value="utilities">Utilities</option>
              <option value="salary">Salary</option>
              <option value="entertainment">Entertainment</option>
              <option value="other">Other</option>
            </select>
            <button type="submit">Save Transaction</button>
          </form>
        </div>
  
  `;
  transactionBox.classList.add("transaction-box-style");
};

const logout = () => {
  localStorage.removeItem("user");
  document.title = "Login - Fintrack Pro";
  checkLoggedIn();
};

const reset = () => {
  const isReset = confirm(
    "WARNING: This will delete all your transaction data permanently!",
  );
  if (isReset) {
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user.username;
    let transactionArr = JSON.parse(
      localStorage.getItem(`transactions_${username}`),
    );
    transactionArr = [];
    localStorage.setItem(
      `transactions_${username}`,
      JSON.stringify(transactionArr),
    );
    renderDashboard(transactionArr, user);
  }
};

const handleChange = (e) => {
  const value = e.target.value.toLowerCase();

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;

  const transactionArr =
    JSON.parse(localStorage.getItem(`transactions_${username}`)) || [];

  const tempArr = transactionArr.filter((elem) => {
    return (
      elem.description.toLowerCase().startsWith(value) ||
      elem.category.toLowerCase().startsWith(value)
    );
  });

  // Calculate values for filtered transactions
  const transactionObj = calculateTransactions(tempArr);

  // updating chart ui
  const ctx = document.getElementById("cash-flow-chart");
  generateChartUI(ctx, transactionObj);

  // Update cards
  document.querySelector(".current-balance h2").textContent =
    `$${transactionObj.currentBalance}.00`;

  document.querySelector(".total-income h2").textContent =
    `$${transactionObj.totalIncome}.00`;

  document.querySelector(".total-expense h2").textContent =
    `$${transactionObj.totalExpense}.00`;

  document.querySelector(".total-transaction h2").textContent =
    transactionObj.totalTransactions;

  // Update transaction rows
  const financialDate = document.querySelector(".finance-details .date");
  const financialDesc = document.querySelector(".finance-details .description");
  const financialCategory = document.querySelector(
    ".finance-details .category",
  );
  const financialAmt = document.querySelector(".finance-details .amount");
  const financialActions = document.querySelector(".finance-details .actions");

  financialDate.querySelectorAll("p").forEach((el) => el.remove());
  financialDesc.querySelectorAll("p").forEach((el) => el.remove());
  financialCategory.querySelectorAll("p").forEach((el) => el.remove());
  financialAmt.querySelectorAll("p").forEach((el) => el.remove());
  financialActions
    .querySelectorAll(".action-btns")
    .forEach((el) => el.remove());

  renderFinanceDetail(
    tempArr,
    financialDate,
    financialDesc,
    financialCategory,
    financialAmt,
    financialActions,
  );
};

const handleSettingSubmit = (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const transactionArr =
    JSON.parse(localStorage.getItem(`transactions_${username}`)) || [];
  const updatedName = e.target[0].value;
  const updatedCurrency = e.target[1].value;
  if (updatedName.trim() === "" || updatedCurrency.trim() === "") {
    return;
  } else {
    const registeredUsersTemp = registeredUsers.map((elem) => {
      if (elem.username == username) {
        elem.username = updatedName;
        elem.currency = updatedCurrency;
      }
      return elem;
    });
    localStorage.setItem(
      "registeredUsers",
      JSON.stringify(registeredUsersTemp),
    );
    user.username = updatedName;
    user.currency = updatedCurrency;
    localStorage.removeItem(`transactions_${username}`);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem(
      `transactions_${user.username}`,
      JSON.stringify(transactionArr),
    );
    const name = document.querySelector(".user-info h3");
    name.textContent = user.username;
  }
};

const handleDashboardChange = (e) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  const transactionTempArr = JSON.parse(
    localStorage.getItem(`transactions_${username}`),
  );
  renderDashboard(transactionTempArr, user);
};

const handleTypeSelectChange = (e) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.username;
  let transactionTempArr = JSON.parse(
    localStorage.getItem(`transactions_${username}`),
  );
  if (e.target.value === "All types") {
    e.target.value = "All types";
  } else if (e.target.value === "Income only") {
    transactionTempArr = transactionTempArr.filter(
      (elem) => elem.type === "Income",
    );
  } else {
    transactionTempArr = transactionTempArr.filter(
      (elem) => elem.type === "Expense",
    );
  }

  // Calculate values for filtered transactions
  const transactionObj = calculateTransactions(transactionTempArr);

  // updating chart ui
  const ctx = document.getElementById("cash-flow-chart");
  generateChartUI(ctx, transactionObj);

  // Update cards
  document.querySelector(".current-balance h2").textContent =
    `$${transactionObj.currentBalance}.00`;

  document.querySelector(".total-income h2").textContent =
    `$${transactionObj.totalIncome}.00`;

  document.querySelector(".total-expense h2").textContent =
    `$${transactionObj.totalExpense}.00`;

  document.querySelector(".total-transaction h2").textContent =
    transactionObj.totalTransactions;

  // Update transaction rows
  const financialDate = document.querySelector(".finance-details .date");
  const financialDesc = document.querySelector(".finance-details .description");
  const financialCategory = document.querySelector(
    ".finance-details .category",
  );
  const financialAmt = document.querySelector(".finance-details .amount");
  const financialActions = document.querySelector(".finance-details .actions");

  financialDate.querySelectorAll("p").forEach((el) => el.remove());
  financialDesc.querySelectorAll("p").forEach((el) => el.remove());
  financialCategory.querySelectorAll("p").forEach((el) => el.remove());
  financialAmt.querySelectorAll("p").forEach((el) => el.remove());
  financialActions
    .querySelectorAll(".action-btns")
    .forEach((el) => el.remove());

  renderFinanceDetail(
    transactionTempArr,
    financialDate,
    financialDesc,
    financialCategory,
    financialAmt,
    financialActions,
  );
};

const changeTheme = (e) => {
  if (e.target.checked) {
    localStorage.setItem("theme", "dark");
    dashboard.id = "dark-theme-dashboard";
    transactionBox.id = "dark-theme-transaction-box";
    e.target.checked = true;
  } else {
    localStorage.setItem("theme", "light");
    dashboard.removeAttribute("id");
    transactionBox.removeAttribute("id");
    e.target.checked = false;
  }
};

const renderDashboard = (transactionsArr, user) => {
  document.title = "FinTrack Pro - Functional";
  const transactionOBj = calculateTransactions(transactionsArr);
  dashboard.innerHTML = "";
  dashboard.innerHTML += `
        <!-- side navbar -->
        <nav class=" side-navbar">
          <div class="logo">
            <i class="fa-solid fa-layer-group"></i>
            <div class="logo-details">
              <h2>FinTrack Pro</h2>
              <p>Enterprise Finance</p>
            </div>
          </div>
          <div class="menu">
            <button onclick =" handleDashboardChange(event)" id="dashboard-btn">
              <i class="fa-solid fa-border-all"></i> Dashboard
            </button>
            <button id="dashboard-setting-btn">
              <i class="fa-solid fa-gear"></i> Settings
            </button>
          </div>
          <button id="add-transaction" onclick="renderTransactionUI()">
            <i class="fa-solid fa-plus"></i> Add Transaction
          </button>
        </nav>
        <!-- header -->
        <header class="header">
          <div class="user-info">
            <h3>${user.username}</h3>
            <button onclick="logout()">
              <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </header>
        <!-- overview-heading  -->
        <div class="setting-close overview">
          <h1>Financial Overview</h1>
          <p>Real-time tracking application</p>
        </div>
        <!-- current-balance-container -->
        <div class="setting-close current-balance">
          <div class="icon">
            <i class="fa-solid fa-building-columns"></i>
          </div>
          <div class="container-detail">
            <p>Current Balance</p>
            <h2>$${transactionOBj.currentBalance}.00</h2>
          </div>
        </div>
        <!-- total-income-container -->
        <div class="setting-close total-income">
          <div class="icon">
            <i class="fa-solid fa-arrow-trend-up"></i>
          </div>
          <div class="container-detail">
            <p>Total Income</p>
            <h2>$${transactionOBj.totalIncome}.00</h2>
          </div>
        </div>
        <!-- total-expense-container -->
        <div class="setting-close total-expense">
          <div class="icon">
            <i class="fa-solid fa-arrow-trend-down"></i>
          </div>
          <div class="container-detail">
            <p>Total Expense</p>
            <h2>$${transactionOBj.totalExpense}.00</h2>
          </div>
        </div>
        <!-- total-transaction-container -->
        <div class="setting-close total-transaction">
          <div class="icon">
            <i class="fa-solid fa-piggy-bank"></i>
          </div>
          <div class="container-detail">
            <p>Total Transactions</p>
            <h2>${transactionOBj.totalTransactions}</h2>
          </div>
        </div>
        <!-- cash-flow-analysis-container -->
        <div class="setting-close cash-flow-analysis">
          <h2>Cash Flow Analysis</h2>
          <canvas id="cash-flow-chart"></canvas>
        </div>
        <!-- preferences-container -->
        <div class="setting-close preferences">
          <h2>Preferences</h2>
          <div class="preferences-button">
            <h3>Dark Mode</h3>
            <label class="theme-toggle">
              <input type="checkbox" id="theme-toggle" onchange="changeTheme(event)" />
              <span class="slider"></span>
            </label>
          </div>
          <button onclick = reset()><i class="fa-solid fa-trash"></i> Reset All Data</button>
        </div>
        <!-- all-transactions-container -->
        <div class="setting-close all-transactions">
          <h2>All Transactions</h2>
          <div class="search">
            <div class="search-input">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input oninput="handleChange(event)" type="search" placeholder="Search transactions..." />
            </div>
            <div class="select-type">
              <select onchange="handleTypeSelectChange(event)" name="types" id="type">
                <option value="All types">All types</option>
                <option value="Income only">Income only</option>
                <option value="Expense only">Expense Only</option>
              </select>
            </div>
          </div>
          <div class="setting-close finance-details">
            <div class="date">
              <h4>Date</h4>
            </div>
            <div class="description">
              <h4>Description</h4>
            </div>
            <div class="category">
              <h4>Category</h4>
            </div>
            <div class="amount">
              <h4>Amount</h4>
            </div>
            <div class="actions">
              <h4>Actions</h4>
            </div>
          </div>
        </div>
        <!-- settings container -->
        <div class="settings hide" id="settings-container">
          <div class="setting-heading">
            <h2>Settings</h2>
            <p>Manage your account profile and app formatting.</p>
          </div>
          <form onsubmit="handleSettingSubmit(event)" class="profile-details">
            <h2>Profile Details</h2>
            <div class="details-user">
              <div class="full-name">
                <label for="full-name">Full Name</label>
                <input type="text" value=${user.username} id="full-name" />
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
            <button type="submit">Save Changes</button>
          </form>
        </div>
  `;

  // theme set
  const themeToggle = document.getElementById("theme-toggle");
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    themeToggle.checked = true;
  } else {
    themeToggle.checked = false;
  }

  // additional renders
  const ctx = document.getElementById("cash-flow-chart");
  const financialDate = document.querySelector(".finance-details .date");
  const financialDesc = document.querySelector(".finance-details .description");
  const financialCategory = document.querySelector(
    ".finance-details .category",
  );
  const financialAmt = document.querySelector(".finance-details .amount");
  const financialActions = document.querySelector(".finance-details .actions");
  generateChartUI(ctx, transactionOBj);
  renderFinanceDetail(
    transactionsArr,
    financialDate,
    financialDesc,
    financialCategory,
    financialAmt,
    financialActions,
  );
  // for settings
  const settingsBtn = document.querySelector("#dashboard-setting-btn");
  const dashboardBtn = document.getElementById("dashboard-btn");
  const settingContainer = document.querySelector("#settings-container");
  const forSettingsHideContainers = document.querySelectorAll(".setting-close");
  settingsBtn.addEventListener("click", (e) => {
    settingContainer.classList.remove("hide");
    settingsBtn.classList.add("dashboard-setting-color-active");
    dashboardBtn.classList.add("dashboard-color-inactive");
    forSettingsHideContainers.forEach((elem) => {
      elem.style.display = "none";
    });
  });
  dashboardBtn.addEventListener("click", (e) => {
    settingContainer.classList.add("hide");
    settingsBtn.classList.remove("dashboard-setting-color-active");
    dashboardBtn.classList.remove("dashboard-color-inactive");
    forSettingsHideContainers.forEach((elem) => {
      elem.style.display = "flex";
    });
  });
};

const checkLoggedIn = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    sessionStorage.setItem("isLoginCard", "null");
    let transactionArr =
      JSON.parse(localStorage.getItem(`transactions_${user.username}`)) || [];

    registerCard.classList.add("hide");
    loginCard.classList.add("hide");
    auth.classList.add("hide");
    renderDashboard(transactionArr, user);
  } else {
    sessionStorage.setItem("isLoginCard", "true");
    loginCard.classList.remove("hide");
    auth.classList.remove("hide");
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
  e.target[0].value = "";
  e.target[1].value = "";
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
