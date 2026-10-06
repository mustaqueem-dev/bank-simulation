# 🏦 Bank Account Simulation

A CLI-based bank account simulation built with **Node.js** to practice real-world backend architecture, business logic, validation, error handling, state management, and JSON-based persistence.

> **This is an educational simulation project, not a real banking or payment system.**

---

## 📌 Overview

Bank Account Simulation is a command-line application that simulates basic banking operations such as:

- Creating accounts
- Listing accounts
- Getting account details
- Checking balance
- Depositing money
- Withdrawing money
- Transferring money between accounts
- Viewing transaction history
- Deleting accounts

The main goal of this project is not simply to build a CLI application, but to understand how a backend system separates:

```text
CLI
 ↓
Controller
 ↓
Service
 ↓
Repository
 ↓
JSON Storage
```

The project focuses heavily on **business rules, state changes, transaction history, validation, and clean separation of responsibilities**.

---

## 🎯 Learning Goals

This project was built to practice:

- Layered architecture
- Separation of concerns
- Service-layer business logic
- Repository pattern
- CRUD operations
- State management
- Event/history modeling
- Input validation
- Business-rule validation
- Custom application errors
- Error handling
- JSON persistence
- CLI application design
- Debugging
- Data consistency
- Understanding atomicity limitations

---

## 🛠️ Tech Stack

- **Node.js**
- **JavaScript**
- **ES Modules**
- **Node.js File System API**
- **JSON**
- **CLI / Terminal**

No external database is used.

Data is persisted in:

```text
data/accounts.json
```

---

# 🏗️ Architecture

The application follows a layered architecture:

```text
                    User
                     │
                     ▼
                    CLI
                     │
                     ▼
                Controller
                     │
                     ▼
                  Service
              ┌──────┼──────┐
              │      │      │
        Validation Business Errors
                   Rules
                     │
                     ▼
                Repository
                     │
                     ▼
               JSON Storage
```

### Controller

Responsible for handling CLI requests and passing data to the service layer.

The controller should not contain banking business logic.

### Service

The service layer contains the application's business rules.

Examples:

- Balance must not become negative.
- Deposit amount must be greater than zero.
- Sender must have sufficient balance.
- Sender and receiver must be different accounts.

### Repository

Responsible only for data access.

It handles:

- Reading accounts
- Finding accounts
- Creating accounts
- Updating accounts
- Deleting accounts

### JSON Storage

The current data source is:

```text
data/accounts.json
```

---

# 📁 Project Structure

```text
bank-simulation/
│
├── src/
│   ├── app.js
│   │
│   ├── controller/
│   │   └── bank.controller.js
│   │
│   ├── services/
│   │   └── bank.service.js
│   │
│   ├── repositories/
│   │   └── bank.repository.js
│   │
│   ├── validation/
│   │   └── bank.validation.js
│   │
│   ├── utils/
│   │   ├── cli.js
│   │   ├── cli-validation.js
│   │   ├── help.js
│   │   └── id.js
│   │
│   └── errors/
│       ├── app-error.js
│       └── error-handler.js
│
├── data/
│   └── accounts.json
│
├── package.json
├── README.md
└── .gitignore
```

---

# 💳 Account Model

Each account follows this structure:

```js
{
  accountNumber: "ACC_001",
  holderName: "Rahul Kumar",
  balance: 0,
  transactions: [],
  createdAt: "2026-10-05T10:00:00.000Z",
  updatedAt: "2026-10-05T10:00:00.000Z"
}
```

### Fields

| Field | Description |
|---|---|
| `accountNumber` | Unique account identifier |
| `holderName` | Account holder's name |
| `balance` | Current account balance |
| `transactions` | Account transaction history |
| `createdAt` | Account creation timestamp |
| `updatedAt` | Last account modification timestamp |

---

# 💰 State vs Transaction History

One of the main concepts practiced in this project is the difference between **current state** and **historical events**.

### Current State

```js
balance: 4000
```

Answers:

> How much money is currently in the account?

### Transaction History

```js
transactions: [
  {
    type: "DEPOSIT",
    amount: 5000,
    balanceAfter: 5000
  },
  {
    type: "WITHDRAW",
    amount: 1000,
    balanceAfter: 4000
  }
]
```

Answers:

> How did the account reach its current state?

This distinction is important in real-world backend systems.

---

# ⚙️ Features

## 1. Create Account

Creates a new account with:

- Unique account number
- Holder name
- Initial balance of `0`
- Empty transaction history
- Creation timestamp
- Update timestamp

Example:

```bash
node src/app.js create --name "Rahul Kumar"
```

---

## 2. List Accounts

Displays all stored accounts.

```bash
node src/app.js list
```

---

## 3. Get Account

Retrieves a specific account.

```bash
node src/app.js get --account ACC_001
```

---

## 4. Check Balance

Returns the current account balance.

```bash
node src/app.js balance --account ACC_001
```

Example:

```text
Balance: ₹4000
```

---

## 5. Deposit

Adds money to an account.

```bash
node src/app.js deposit --account ACC_001 --amount 5000
```

Example:

```text
Before: ₹0
Deposit: ₹5000
After: ₹5000
```

A transaction is also created.

---

## 6. Withdraw

Withdraws money from an account.

```bash
node src/app.js withdraw --account ACC_001 --amount 2000
```

Example:

```text
Before: ₹5000
Withdraw: ₹2000
After: ₹3000
```

The application prevents withdrawals that exceed the available balance.

---

## 7. Transfer

Transfers money between two accounts.

```bash
node src/app.js transfer \
  --from ACC_001 \
  --to ACC_002 \
  --amount 1500
```

Example:

```text
ACC_001: ₹5000
ACC_002: ₹2000

Transfer: ₹1500

ACC_001: ₹3500
ACC_002: ₹3500
```

The transfer creates two transaction records:

### Sender

```js
{
  type: "TRANSFER_OUT",
  amount: 1500,
  to: "ACC_002",
  balanceAfter: 3500
}
```

### Receiver

```js
{
  type: "TRANSFER_IN",
  amount: 1500,
  from: "ACC_001",
  balanceAfter: 3500
}
```

---

## 8. Transaction History

Displays all transactions belonging to an account.

```bash
node src/app.js transactions --account ACC_001
```

Example:

```text
[
  {
    type: "DEPOSIT",
    amount: 5000,
    balanceAfter: 5000
  },
  {
    type: "WITHDRAW",
    amount: 1000,
    balanceAfter: 4000
  },
  {
    type: "TRANSFER_OUT",
    amount: 500,
    to: "ACC_002",
    balanceAfter: 3500
  }
]
```

---

## 9. Delete Account

Deletes an existing account.

```bash
node src/app.js delete --account ACC_002
```

Because transactions are stored inside the account object, deleting the account also removes its stored transaction history in this simulation.

> Real banking systems generally use record retention, archival, or account-closing workflows instead of permanently deleting financial records.

---

## 10. Help

The application includes a help command for available operations.

```bash
node src/app.js help
```

---

# 📜 Business Rules

## Account Rules

- Account holder name is required.
- Account number must be unique.
- Initial balance is `0`.
- Account creation does not create a transaction.
- Creation and update timestamps are maintained.

## Deposit Rules

- Account must exist.
- Amount must be greater than `0`.
- Balance increases by the deposited amount.
- A `DEPOSIT` transaction is created.

## Withdrawal Rules

- Account must exist.
- Amount must be greater than `0`.
- Account must have sufficient balance.
- Balance must never become negative.
- A `WITHDRAW` transaction is created.

## Transfer Rules

- Sender account must exist.
- Receiver account must exist.
- Sender and receiver must be different.
- Transfer amount must be greater than `0`.
- Sender must have sufficient balance.
- Sender balance decreases.
- Receiver balance increases.
- Both accounts receive transaction records.

---

# 🚨 Error Handling

The project uses a custom `AppError` class.

Example:

```js
throw new AppError(
  "INSUFFICIENT_BALANCE",
  "Insufficient account balance."
);
```

Errors contain:

```text
Error Code
+
Human-readable Message
```

Example:

```text
[ACCOUNT_NOT_FOUND] Account was not found.
```

Some important error codes include:

```text
ACCOUNT_NOT_FOUND
SENDER_ACCOUNT_NOT_FOUND
RECEIVER_ACCOUNT_NOT_FOUND
INVALID_AMOUNT
INSUFFICIENT_BALANCE
SAME_ACCOUNT_TRANSFER
MISSING_OPTION
```

This makes errors predictable for both the application and the user.

---

# 🔐 Validation

Validation happens at different levels.

### CLI Validation

Checks whether required command options were supplied.

Example:

```bash
node src/app.js deposit
```

can be rejected because:

```text
--account
--amount
```

are missing.

### Business Validation

The service layer checks business rules.

Examples:

```text
amount > 0
balance >= withdrawal amount
sender != receiver
account exists
```

This separation prevents business rules from being mixed into CLI/controller code.

---

# 🧠 Debugging Lessons

Several realistic debugging situations were encountered during development.

### Data mismatch

The requested account was:

```text
ACC_001
```

while the stored account was:

```text
AC_001
```

The `.find()` operation was working correctly; the data simply did not match.

This demonstrated an important debugging process:

```text
Input
 ↓
Stored Data
 ↓
Comparison
 ↓
Result
```

---

### Missing return

A repository function successfully found an account and logged it, but did not return it.

Without:

```js
return account;
```

JavaScript returned:

```js
undefined
```

This reinforced the difference between:

```text
console.log()
```

and:

```text
return
```

---

### State update debugging

When verifying deposits, the application was checked at multiple stages:

```text
Existing balance
 ↓
Deposit amount
 ↓
Calculated balance
 ↓
Updated account
 ↓
Persisted JSON
```

This helped isolate whether the problem was in:

- Reading data
- Business calculation
- Updating the object
- Writing data

---

# 🧩 Repository Contract

The repository acts as the application's data-access boundary.

Main operations:

```js
findAllAccounts()
```

Returns:

```text
Account[]
```

---

```js
findAccountByNumber(accountNumber)
```

Returns:

```text
Account | undefined
```

---

```js
createAccount(account)
```

Returns:

```text
Account
```

---

```js
updateAccount(updatedAccount)
```

Returns:

```text
Account | undefined
```

---

```js
deleteAccount(accountNumber)
```

Returns:

```text
Account | undefined
```

The service layer does not directly interact with the JSON file.

---

# 🔄 Example Application Flow

For a deposit:

```text
User
 ↓
CLI
 ↓
Controller
 ↓
deposit()
 ↓
findAccountByNumber()
 ↓
Repository
 ↓
accounts.json
 ↓
Calculate new balance
 ↓
Create transaction
 ↓
updateAccount()
 ↓
Repository
 ↓
accounts.json
```

For a transfer:

```text
User
 ↓
CLI
 ↓
Controller
 ↓
transfer()
 ↓
Find sender
 ↓
Find receiver
 ↓
Validate business rules
 ↓
Calculate both balances
 ↓
Create two transactions
 ↓
Update sender
 ↓
Update receiver
```

---

# ⚠️ Known Limitations

This project intentionally uses a simple JSON file for persistence.

It is **not production-ready banking software**.

Limitations include:

- JSON file instead of a database
- No concurrent-write protection
- No authentication
- No authorization
- No encryption
- No real payment integration
- No audit-log infrastructure
- No database transactions
- No atomic transfer operation
- Account numbers are generated locally
- Deleted account numbers can potentially be reused
- No multi-user access control
- No financial regulatory compliance

These limitations are intentional because the purpose of the project is learning backend architecture and business logic.

---

# ⚠️ Atomicity Limitation

A transfer modifies two accounts:

```text
Sender
+
Receiver
```

The current implementation updates them separately.

Conceptually:

```js
await updateAccount(sender);
await updateAccount(receiver);
```

If the first operation succeeds but the second fails, the system could become inconsistent.

Real financial systems solve this with mechanisms such as:

- Database transactions
- Atomic operations
- ACID guarantees
- Proper consistency controls

This project uses JSON storage, so full transactional guarantees are outside its scope.

---

# ▶️ Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Enter the project:

```bash
cd bank-simulation
```

Install dependencies:

```bash
npm install
```

There are currently no major external dependencies required for the core application.

---

# 🚀 Usage

Start using the application through Node.js:

```bash
node src/app.js <command>
```

Examples:

```bash
node src/app.js create --name "Rahul Kumar"

node src/app.js list

node src/app.js get --account ACC_001

node src/app.js balance --account ACC_001

node src/app.js deposit --account ACC_001 --amount 5000

node src/app.js withdraw --account ACC_001 --amount 2000

node src/app.js transfer --from ACC_001 --to ACC_002 --amount 1500

node src/app.js transactions --account ACC_001

node src/app.js delete --account ACC_002

node src/app.js help
```

---

# 🧪 Manual Verification

The application can be verified through a complete banking flow.

### 1. Create accounts

```bash
node src/app.js create --name "Rahul Kumar"
node src/app.js create --name "Aman Kumar"
```

### 2. Check accounts

```bash
node src/app.js list
```

### 3. Deposit

```bash
node src/app.js deposit --account ACC_001 --amount 5000
```

### 4. Withdraw

```bash
node src/app.js withdraw --account ACC_001 --amount 1000
```

### 5. Transfer

```bash
node src/app.js transfer \
  --from ACC_001 \
  --to ACC_002 \
  --amount 1500
```

### 6. Check balances

```bash
node src/app.js balance --account ACC_001
node src/app.js balance --account ACC_002
```

### 7. Check transaction history

```bash
node src/app.js transactions --account ACC_001
node src/app.js transactions --account ACC_002
```

### 8. Test invalid operations

Try:

```bash
node src/app.js withdraw --account ACC_001 --amount 999999
```

and:

```bash
node src/app.js transfer \
  --from ACC_001 \
  --to ACC_001 \
  --amount 100
```

The application should reject invalid operations according to the business rules.

---

# 📚 Key Concepts Practiced

This project helped reinforce:

### JavaScript

- ES Modules
- `async/await`
- Objects
- Arrays
- Spread syntax
- Functions
- Error handling
- Type conversion
- Array methods such as `find()` and `findIndex()`

### Node.js

- `fs/promises`
- CLI arguments
- `process.argv`
- `process.exitCode`
- JSON file persistence
- File-based data access

### Software Engineering

- Layered architecture
- Separation of concerns
- Repository pattern
- Service layer
- Controller layer
- Business rules
- Validation
- Custom errors
- State management
- Event/history modeling
- Debugging
- Data consistency
- Atomicity concepts

---

# 🏆 Project Outcome

After completing this project, the application supports a complete simulated banking workflow:

```text
Create Account
      ↓
Deposit
      ↓
Withdraw
      ↓
Transfer
      ↓
Transaction History
      ↓
Balance Tracking
      ↓
Account Management
```

More importantly, the project demonstrates how to move from:

```text
"Make the CLI work"
```

to:

```text
"Design a system with clear responsibilities and business rules."
```

---

# 🎓 What I Learned

The most important lesson from this project was that backend development is not just about writing code that works.

A good system needs clear boundaries:

```text
Controller
→ Handles requests

Service
→ Owns business logic

Repository
→ Owns data access

Validation
→ Protects input and rules

Error Handling
→ Communicates failures clearly
```

The project also introduced the important distinction between:

```text
State
+
Events / History
```

where the current balance represents the system's current state while transactions explain how that state changed.

---

# 🔮 Future Improvements

Possible future improvements include:

- Replace JSON with PostgreSQL/MongoDB
- Database transactions for transfers
- Authentication
- Authorization
- Account closing instead of deletion
- Persistent audit logs
- Better CLI formatting
- Automated tests
- Interactive CLI
- Transaction filtering
- Pagination
- Unique non-reusable account identifiers
- API layer
- REST API
- Authentication tokens
- Multi-user support
- Production-grade concurrency handling

These are intentionally outside the current project's scope.

---

# 📄 License

This project is created for educational and learning purposes.

You may modify and extend it for your own learning and experimentation.