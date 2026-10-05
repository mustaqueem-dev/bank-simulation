import {
    findAllAccounts,
    findAccountByNumber,
    createAccount as saveAccount,
    updateAccount,
} from "../repositories/bank.repository.js";

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
};

export async function getAccount(accountNumber) {
    return findAccountByNumber(accountNumber);
};

export async function listAccounts() {
    return findAllAccounts();
};

export async function deposit(accountNumber, amount) {
    const account = await findAccountByNumber(accountNumber);

    if (!account) {
        throw new Error("ACCOUNT_NOT_FOUND");
    }

    if (amount <= 0) {
        throw new Error("INVALID_AMOUNT");
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
        transactions: [
            ...account.transactions,
            transaction,
        ],
        updatedAt: new Date().toISOString(),
    };

    return updateAccount(updatedAccount);
}