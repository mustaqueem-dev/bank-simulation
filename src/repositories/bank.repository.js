import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = process.env.BANK_DATA_FILE ?? path.resolve(__dirname, "../../data/accounts.json");

async function readAccounts() {
    const data = await readFile(DATA_FILE, "utf-8");

    return JSON.parse(data);
};

async function writeAccounts(accounts) {
    const data = JSON.stringify(accounts, null, 2);

    await writeFile(DATA_FILE, data, "utf-8");
};


export async function findAllAccounts() {
    return readAccounts();
};

export async function findAccountByNumber(accountNumber) {
    const accounts = await readAccounts();

    const account = accounts.find(
        (account) =>
            String(account.accountNumber) === String(accountNumber)
    );

    return account;
}

export async function createAccount(account) {
    const accounts = await readAccounts();

    accounts.push(account);

    await writeAccounts(accounts);

    return account;
};

export async function updateAccount(updatedAccount) {
    const accounts = await readAccounts();

    const index = accounts.findIndex(
        (account) =>
            account.accountNumber === updatedAccount.accountNumber
    );

    if (index === -1) {
        return undefined;
    }

    accounts[index] = updatedAccount;

    await writeAccounts(accounts);

    return updatedAccount;
}

export async function deleteAccount(accountNumber) {
    const accounts = await readAccounts();

    const index = accounts.findIndex((account) => account.accountNumber === accountNumber);

    if (index === -1) {
        return undefined;
    }

    const [deletedAccount] = accounts.splice(index, 1);

    await writeAccounts(accounts);

    return deletedAccount;
}