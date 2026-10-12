FinTrack Pro — Personal Finance Tracker
FinTrack Pro is a browser-based personal finance tracker built with HTML, CSS, and vanilla JavaScript. It helps users record income and expenses, review their overall cash flow, and manage transactions through a simple dashboard.
Features

- User registration and login using browser storage
- Dashboard overview of current balance, total income, total expenses, and transaction count
- Transaction management — add, edit, and delete income or expense entries
- Transaction details including date, description, category, type, and amount
- Search and filtering to find transactions by search text or transaction type
- Income vs. expense chart powered by Chart.js
- Dark mode preference
- Profile settings for the display name and preferred currency
- Reset data option for clearing finance data
- Persistent browser storage using localStorage
  Tech Stack
- HTML5 — page structure
- CSS3 — styling and layout
- JavaScript (ES6+) — application logic and DOM manipulation
- Chart.js — income and expense visualization
- Font Awesome — interface icons
- Browser APIs — localStorage and sessionStorage
  Getting Started
  No build tools or package installation are required.

1. Clone or download this repository:git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
2. Open the project folder.
3. Open index.html in your browser.
   For a smoother development workflow, you can open the folder in VS Code and run index.html with the Live Server extension.
   Project Structure
   FinTrack-Pro/
   ├── index.html # Login/register page and app entry point
   ├── style.css # Layout, styling, and theme styles
   ├── script.js # Authentication, transactions, dashboard, and chart logic
   └── README.md # Project documentation
   How to Use
4. Open the app and create an account from the registration screen.
5. Log in with the account you created in the same browser.
6. Add income or expense transactions with their date, description, category, and amount.
7. Review the dashboard totals and the income-versus-expense chart.
8. Use the transaction list to search, filter, edit, or delete entries.
9. Open Settings to change the display name, currency, or theme.
   Data Storage and Limitations

- Account and transaction information is stored in the browser using localStorage; login-screen state uses sessionStorage.
- Data is tied to the browser and device where it was entered. It does not automatically sync between devices or browsers.
- Clearing the browser's site data can remove saved information.
- This is a front-end learning project, not a production banking application. It does not use a server or database for authentication, and browser-stored credentials are not secure for real-world use. Do not use real or sensitive financial information.
- Chart.js and Font Awesome are loaded from external CDNs, so those assets require an internet connection.
  Future Improvements
- Add a secure backend and database
- Implement password hashing and proper authentication
- Add monthly reports, budgets, and spending insights
- Export transactions to CSV
- Improve accessibility and responsive behavior
  Contributing
  Suggestions and improvements are welcome. Feel free to fork the repository and submit a pull request.
  License
  No license has been specified yet. Add a license file if you want to define how others may use, modify, and distribute this project.
