import {
  findAllAccounts,
  findAccountByNumber,
  createAccount as saveAccount,
  updateAccount,
  deleteAccount as removeAccount,
} from "../repositories/bank.repository.js";

import { AppError } from "../errors/app-error.js";

import { generateAccountNumber } from "../utils/id.js";

export async function createAccount(holderName) {
  const accounts = await findAllAccounts();

  const accountNumber = generateAccountNumber(accounts);

  const now = new Date().toISOString();

  const account = {
    accountNumber,
    holderName,
    balance: 0,
    transactions: [],
    createdAt: now,
    updatedAt: now,
  };

  return saveAccount(account);
}

export async function getAccount(accountNumber) {
  return findAccountByNumber(accountNumber);
}

export async function listAccounts() {
  return findAllAccounts();
}

export async function deposit(accountNumber, amount) {
  const account = await findAccountByNumber(accountNumber);

  if (!account) {
    throw new AppError("ACCOUNT_NOT_FOUND", "Account was not found.");
  }

  if (amount <= 0) {
    throw new AppError("INVALID_AMOUNT", "Amount must be greater than 0.");
  }

  const newBalance = account.balance + amount;

  const transaction = {
    type: "DEPOSIT",
    amount,
    balanceAfter: newBalance,
    createdAt: new Date().toISOString(),
  };

  const updatedAccount = {
    ...account,
    balance: newBalance,
    transactions: [...account.transactions, transaction],
    updatedAt: new Date().toISOString(),
  };

  return updateAccount(updatedAccount);
}

export async function withdraw(accountNumber, amount) {
  const account = await findAccountByNumber(accountNumber);

  if (!account) {
    throw new AppError("ACCOUNT_NOT_FOUND", "Account was not found.");
  }

  if (amount <= 0) {
    throw new AppError("INVALID_AMOUNT", "Amount must be greater than 0.");
  }

  if (account.balance < amount) {
    throw new AppError("INSUFFICIENT_BALANCE","Insufficient account balance." );
  }

  const newBalance = account.balance - amount;

  const transaction = {
    type: "WITHDRAW",
    amount,
    balanceAfter: newBalance,
    createdAt: new Date().toISOString(),
  };

  const updatedAccount = {
    ...account,
    balance: newBalance,
    transactions: [...account.transactions, transaction],
    updatedAt: new Date().toISOString(),
  };

  return updateAccount(updatedAccount);
}

export async function transfer(fromAccountNumber, toAccountNumber, amount) {
  const sender = await findAccountByNumber(fromAccountNumber);
  const receiver = await findAccountByNumber(toAccountNumber);

  if (!sender) {
    throw new AppError("SENDER_ACCOUNT_NOT_FOUND",  "Sender account was not found.");
  }

  if (!receiver) {
    throw new AppError("RECEIVER_ACCOUNT_NOT_FOUND",  "Receiver account was not found.");
  }

  if (sender.accountNumber === receiver.accountNumber) {
    throw new AppError("CANNOT_TRANSFER_TO_SAME_ACCOUNT", "Sender and receiver accounts must be different.");
  }

  if (amount <= 0) {
    throw new AppError("INVALID_AMOUNT",  "Amount must be greater than 0.");
  }

  if (sender.balance < amount) {
    throw new AppError("INSUFFICIENT_BALANCE", "Insufficient account balance.");
  }

  const senderNewBalance = sender.balance - amount;
  const receiverNewBalance = receiver.balance + amount;

  const now = new Date().toISOString();

  const senderTransaction = {
    type: "TRANSFER_OUT",
    amount,
    to: receiver.accountNumber,
    balanceAfter: senderNewBalance,
    createdAt: now,
  };

  const receiverTransaction = {
    type: "TRANSFER_IN",
    amount,
    from: sender.accountNumber,
    balanceAfter: receiverNewBalance,
    createdAt: now,
  };

  const updatedSender = {
    ...sender,
    balance: senderNewBalance,
    transactions: [...sender.transactions, senderTransaction],
    updatedAt: now,
  };

  const updatedReceiver = {
    ...receiver,
    balance: receiverNewBalance,
    transactions: [...receiver.transactions, receiverTransaction],
    updatedAt: now,
  };

  await updateAccount(updatedSender);
  await updateAccount(updatedReceiver);

  return {
    sender: updatedSender,
    receiver: updatedReceiver,
  };
}

export async function getTransactions(accountNumber) {
  const account = await findAccountByNumber(accountNumber);

  if (!account) {
    throw new AppError("ACCOUNT_NOT_FOUND",  "Account was not found.");
  }

  return account.transactions;
}

export async function deleteBankAccount(accountNumber) {
  const account = await findAccountByNumber(accountNumber);

  if (!account) {
    throw new AppError("ACCOUNT_NOT_FOUND",   "Account was not found.");
  }

  return removeAccount(accountNumber);
}

export async function getBalance(accountNumber) {
  const account = await findAccountByNumber(accountNumber);

  if (!account) {
    throw new AppError("ACCOUNT_NOT_FOUND",   "Account was not found.");
  }

  return account.balance;
}
