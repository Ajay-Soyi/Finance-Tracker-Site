# FinTrack Pro — Personal Finance Tracker

FinTrack Pro is a browser-based personal finance tracker built with **HTML, CSS, and vanilla JavaScript**. It helps users track income and expenses, monitor their financial activity, and manage transactions through a simple dashboard.

## Features

- **User Registration and Login** — Create an account and log in using browser storage.
- **Dashboard Overview** — View current balance, total income, total expenses, and transaction count.
- **Transaction Management** — Add, edit, and delete income or expense transactions.
- **Transaction Details** — Record the date, description, category, type, and amount.
- **Search and Filtering** — Find transactions using search text or transaction type.
- **Income vs. Expense Chart** — Visualize income and expenses using Chart.js.
- **Dark Mode** — Switch the interface theme.
- **Profile Settings** — Update the display name and preferred currency.
- **Reset Data** — Clear stored financial data.
- **Persistent Storage** — Save data in the browser using `localStorage`.

## Tech Stack

- **HTML5** — Page structure and content.
- **CSS3** — Styling, layout, and themes.
- **JavaScript (ES6+)** — Application logic and DOM manipulation.
- **Chart.js** — Income and expense visualization.
- **Font Awesome** — Interface icons.
- **Browser APIs** — `localStorage` and `sessionStorage`.

## Getting Started

No build tools or package installation are required.

### 1. Clone the Repository

```bash
git clone https://github.com/Ajay-Soyi/Finance-Tracker-Site.git
```

### 2. Open the Project

Navigate to the project folder:

```bash
cd YOUR-REPOSITORY
```

### 3. Run the Application

Open `index.html` in your web browser.

Alternatively, open the project in Visual Studio Code and use the **Live Server** extension to run it locally.

## Project Structure

```text
FinTrack-Pro/
├── index.html   # Application entry point and authentication screens
├── style.css    # Styling, layout, and theme definitions
├── script.js    # Application logic and DOM manipulation
└── README.md    # Project documentation
```

## How to Use

1. Open the application in your browser.
2. Create an account using the registration screen.
3. Log in with your registered credentials.
4. Add income or expense transactions with the relevant details.
5. View your balance, total income, total expenses, and transaction count on the dashboard.
6. Search, filter, edit, or delete transactions as needed.
7. Open **Settings** to update your display name, preferred currency, or theme.

## Data Storage and Limitations

- Account and transaction information is stored locally in the browser using `localStorage`.
- Login-related session information is managed using `sessionStorage`.
- Data does not automatically synchronize across different browsers or devices.
- Clearing the browser's site data may remove saved information.
- This is a **front-end learning project**, not a production-ready banking application.
- Authentication is handled on the client side without a secure backend or database. Browser-stored credentials are not secure enough for real-world authentication.
- Avoid entering real or sensitive financial information.
- Chart.js and Font Awesome are loaded from external CDNs and require an internet connection to load.

## Future Improvements

- Integrate a secure backend and database.
- Implement secure authentication and password hashing.
- Add monthly financial reports and budgeting tools.
- Provide spending insights and expense analytics.
- Enable transaction export to CSV.
- Improve accessibility and responsive design.

## Contributing

Suggestions and improvements are welcome!

1. Fork the repository.
2. Create a new branch for your changes.
3. Commit your changes.
4. Push the branch to your fork.
5. Open a pull request.

## License

No license has been specified yet. Add a `LICENSE` file to define how others may use, modify, and distribute this project.
