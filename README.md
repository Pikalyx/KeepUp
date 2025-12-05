# Introducing JN+JB Bookkeeping Solutions 👋

JN+JB Bookkeeping Solutions is simple, open source bookkeeping software that records and manages the accrued transactions of a business. Users can input their transactions, specify the date, add the amount, specify the account that in which this transaction occurred, and specify whether it is a credit or debit to the transaction. This data is stored in a locally ran server. Data is used to perform business calculations which can help determine the efficiency and profitabiltiy of a company.


## Team Info
Team Name: The Circular Squares
Team Members: Julie Amon, Noah Gillespie, Joe Morton, and Bryson Perryman


## Tools & Frameworks Used
### Backend
- Node.js: Using JavaScript for the server
- Express.js: Web server framwork
- SQLite: Our backend database storing user information


### Frontend
- HTML + CSS: Simple interface with form and table


## Project Set Up (User Guide)
1. Clone the Repository

   ```bash
   git clone https://github.com/julieamononce/PersonalFinanceGurus
   cd PersonalFinanceGurus
   ```

2. Install Dependencies

   ```bash 
   npm install express
   npm install cors
   npm install
   npm install sqlite3
   npm install bcrypt
   npm install express-session
   ```

3. Run the Server
   Start the backend
   ```bash
   node app.js
   ```

4. Click the Localhost Link
   Use the Localhost link the terminal gives you. Press Control simultaniously as you click on the link


## How to Use the APP
   Click through different pages using the button functions

   1. Home- The Home Page
   The homepage displays all possible html pages to the user

   2. General Ledger- The General Ledger/Journal Page
   Users can their post transactions to the webpage which will then be saved in their database on the backend. Users can also see a display of the balances of each of their accounts on the left side.

   3. Financial Statements- The Financial Statements Page
   This page displays a summary of their accounts in a more formal manner. It is modelled after the graphs commonly found within SEC Annual Filings. This page also will help users determine whether their business gaining or losing money by calculating the total assets, total liabilities, and total equity.

   4. Info- The Info Page
   This pages displays a plethora of business ratios which will help determine the degree of success the business is having. This data is taken from the sql backend and then run through a business formula. The output is displayed to the user upon clicking into the page

   5. Help/Database- The Knowledge Base
   This place serves to educate user on bassic account terms, tips, and strategies. This webpage also hosts a popular Q&A where the devlopers answer the most sought out questions about the software.

