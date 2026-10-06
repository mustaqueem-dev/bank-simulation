import {
    createAccount,
    listAccounts,
    getAccount,
    deposit,
    withdraw,
    transfer,
    getTransactions,
    deleteBankAccount,
    getBalance,
} from "../services/bank.service.js";
import { requireOptions } from "../utils/cli-validation.js";

export async function handleCreateAccount(options) {
    const name = requireOptions(options, "name")
    const account = await createAccount(name);

    console.log("Account created successfully.");
    console.log(account);
};

export async function handleListAccounts() {
    const accounts = await listAccounts();

    console.log(accounts)
};

export async function handleGetAccount(options) {
    const account = requireOptions(options, "account")
    const result = await getAccount(account);
    console.log("")
    console.log(result)
};

export async function handleDeposit(options) {

    const account = requireOptions(options, "account");
    const amount = requireOptions(options, "amount");

    const result = await deposit(
        account,
        Number(amount)
    );

    console.log("Deposit successful.")
    console.log(result)
};

export async function handleWithdraw(options) {
    const account = requireOptions(options, "account");
    const amount = requireOptions(options, "amount");

    const result = await withdraw(
       account,
        Number(amount)
    );

    console.log("Withdrawal successful.");
    console.log(result)
};

export async function handleTransfer(options) {
    const from = requireOptions(options, "from");
    const to = requireOptions(options, "to");
    const amount = requireOptions(options, "amount");

    const result = await transfer(
        from,
        to,
        Number(amount)
    );

    console.log("Transfer successful.");
    console.log(result);
};

export async function handleTransactions(options) {
    const account = requireOptions(options, "account")

    const transactions = await getTransactions(account);

    console.log(transactions);
};

export async function handleDeleteAccount(options) {
     const account = requireOptions(options, "account")

    const result = await deleteBankAccount(account);

    console.log("Account deleted successfully.");
    console.log(result);
};

export async function handleGetBalance(options) {
    const account = requireOptions(options, "account")
    const balance = await getBalance(account);

    console.log(`Balance: ₹${balance}`);
}